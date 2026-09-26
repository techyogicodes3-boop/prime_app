import {randomBytes,scrypt as scryptCallback,timingSafeEqual,createHmac} from 'node:crypto';
import {promisify} from 'node:util';

const scrypt=promisify(scryptCallback);
const COOKIE_NAME='prism_session';
const tokenSecret=()=>process.env.SESSION_SECRET||'local-development-only-change-this-secret';

export async function hashPassword(password){
  const salt=randomBytes(24).toString('hex');
  return `${salt}:${(await scrypt(password,salt,64,{N:32768,r:8,p:3,maxmem:64*1024*1024})).toString('hex')}`;
}

export async function checkPassword(password,stored=''){
  const [salt,hash]=stored.split(':');
  if(!salt||!/^[a-f\d]{128}$/i.test(hash||''))return false;
  const actual=await scrypt(password,salt,64,{N:32768,r:8,p:3,maxmem:64*1024*1024});
  return timingSafeEqual(actual,Buffer.from(hash,'hex'));
}

export const tokenHash=token=>createHmac('sha256',process.env.SESSION_SECRET||'local-development-only').update(token).digest('hex');

export function createAdminToken(admin){
  const now=Math.floor(Date.now()/1000),payload={sub:String(admin._id),kind:'admin',role:'admin',username:admin.username,iat:now,exp:now+8*60*60};
  const body=Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature=createHmac('sha256',tokenSecret()).update(body).digest('base64url');
  return `${body}.${signature}`;
}

export async function adminFromToken(db,req){
  const header=req.headers.authorization||'';
  const match=/^Bearer ([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/.exec(header);
  if(!match)return null;
  const [body,signature]=match.slice(1),expected=createHmac('sha256',tokenSecret()).update(body).digest();
  let actual,payload;
  try{actual=Buffer.from(signature,'base64url');payload=JSON.parse(Buffer.from(body,'base64url').toString('utf8'));}catch{return null;}
  if(actual.length!==expected.length||!timingSafeEqual(actual,expected)||payload.kind!=='admin'||payload.role!=='admin'||!payload.sub||payload.exp<=Math.floor(Date.now()/1000))return null;
  const admin=await db.collection('admins').findOne({_id:payload.sub,active:true,role:'admin'});
  return admin?{username:admin.username||admin.email,role:'admin',kind:'admin'}:null;
}

function requestToken(req){
  return (req.headers.cookie||'').split(';').map(value=>value.trim()).find(value=>value.startsWith(COOKIE_NAME+'='))?.slice(COOKIE_NAME.length+1);
}

export async function sessionFor(db,req){
  const token=requestToken(req);
  if(!token)return null;
  const session=await db.collection('sessions').findOne({tokenHash:tokenHash(token),expiresAt:{$gt:new Date()}});
  if(!session)return null;
  const collection=session.kind==='admin'?'admins':'users';
  const principal=await db.collection(collection).findOne({_id:session.principalId,active:{$ne:false}});
  if(!principal)return null;
  return {...session,username:principal.username||principal.email,name:principal.name||principal.username||principal.email,role:principal.role||'user'};
}

export async function createSession(db,principalId,kind){
  const token=randomBytes(32).toString('hex');
  const csrf=randomBytes(32).toString('hex');
  const expiresAt=new Date(Date.now()+8*60*60*1000);
  await db.collection('sessions').deleteMany({principalId,kind});
  await db.collection('sessions').insertOne({tokenHash:tokenHash(token),principalId,kind,csrf,expiresAt,createdAt:new Date()});
  return {token,csrf,expiresAt};
}

export async function destroySession(db,req){
  const token=requestToken(req);
  if(token)await db.collection('sessions').deleteOne({tokenHash:tokenHash(token)});
}

export function cookie(value,maxAge){
  const production=process.env.NODE_ENV==='production';
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=${production?'None':'Strict'}; Max-Age=${maxAge}${production?'; Secure':''}`;
}
