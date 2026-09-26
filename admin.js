import {randomUUID} from 'node:crypto';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {openDatabase} from './db.js';
import {hashPassword} from './auth.js';
const apiEnv=fileURLToPath(new URL('./.env',import.meta.url));
if(existsSync(apiEnv))process.loadEnvFile(apiEnv);
const username=(process.env.ADMIN_USERNAME || process.argv[2])?.trim().toLowerCase();
if(!username || !/^[\w@.+-]{3,150}$/.test(username)) throw Error('Set ADMIN_USERNAME in .env (3–150 letters, digits, _, @, ., + or -), then run npm run admin:setup.');
let password=process.env.ADMIN_PASSWORD||'';
if(!password){
  if(process.stdin.isTTY) throw Error('Set ADMIN_PASSWORD in the environment or supply the password through stdin.');
  for await(const chunk of process.stdin) password+=chunk;
}
password=password.replace(/[\r\n]+$/,'');
if(password.length<14 || password.length>256) throw Error('Use a password of 14–256 characters.');
const db=await openDatabase();
try {
 const hash=await hashPassword(password);password='';
 const existing=await db.collection('admins').findOne({username}),id=existing?._id||randomUUID();
 await db.collection('admins').updateOne({_id:id},{$set:{username,passwordHash:hash,role:'admin',active:true,updatedAt:new Date()},$setOnInsert:{createdAt:new Date()}},{upsert:true});
 await db.collection('sessions').deleteMany({principalId:id});
}finally{password='';await db.close();}
console.log('Admin account saved. Existing sessions revoked.');
