import {existsSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {fileURLToPath} from 'node:url';

const sourcePath=fileURLToPath(new URL('./data/prism.sqlite',import.meta.url));
const marker='004-import-sqlite-backup';

export async function migrateSqliteBackup(db){
  if(!existsSync(sourcePath)||await db.collection('migrations').findOne({name:marker}))return;
  const source=new DatabaseSync(sourcePath,{readOnly:true});
  try{
    const listings=source.prepare('SELECT id, data, submission_key FROM listings').all();
    for(const row of listings){
      const item=JSON.parse(row.data);
      if(item.transaction==='For Rent'||item.transaction==='For ')item.transaction='For Lease';
      await db.collection('properties').updateOne({_id:row.id},{$setOnInsert:{_id:row.id,...item,id:row.id,...(row.submission_key?{submissionKey:row.submission_key}:{})}},{upsert:true});
    }
    const materials=source.prepare('SELECT id, data, creation_key FROM materials').all();
    for(const row of materials){
      const item=JSON.parse(row.data);
      if(item.transaction==='For Rent'||item.transaction==='For ')item.transaction='For Lease';
      if(item.status==='ed')item.status='Rented';
      await db.collection('materials').updateOne({_id:row.id},{$setOnInsert:{_id:row.id,...item,id:row.id,...(row.creation_key?{creationKey:row.creation_key}:{})}},{upsert:true});
    }
    for(const row of source.prepare('SELECT id, username, password_hash, role, active FROM admins').all()){
      await db.collection('admins').updateOne({_id:row.id},{$setOnInsert:{_id:row.id,username:row.username,passwordHash:row.password_hash,role:row.role,active:Boolean(row.active),createdAt:new Date()}},{upsert:true});
    }
    for(const row of source.prepare('SELECT id, listing_id, bytes, mime FROM media').all())await db.collection('propertyMedia').updateOne({_id:row.id},{$setOnInsert:{_id:row.id,listingId:row.listing_id,bytes:Buffer.from(row.bytes),mime:row.mime}},{upsert:true});
    for(const row of source.prepare('SELECT id, listing_id, bytes, mime FROM material_media').all())await db.collection('materialMedia').updateOne({_id:row.id},{$setOnInsert:{_id:row.id,listingId:row.listing_id,bytes:Buffer.from(row.bytes),mime:row.mime}},{upsert:true});
    for(const row of source.prepare('SELECT id, listing_id, status, attempts, next_attempt, updated_at, error FROM notifications').all())await db.collection('notifications').updateOne({_id:row.id},{$setOnInsert:{_id:row.id,listingId:row.listing_id,status:row.status,attempts:row.attempts,nextAttempt:row.next_attempt,updatedAt:row.updated_at,error:row.error}},{upsert:true});
    await db.collection('migrations').insertOne({name:marker,appliedAt:new Date(),counts:{properties:listings.length,materials:materials.length}});
    console.log(`SQLite backup imported: ${listings.length} properties and ${materials.length} materials.`);
  }finally{source.close();}
}
