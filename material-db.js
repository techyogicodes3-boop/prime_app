import {readFileSync} from 'node:fs';
import {materialDefaults} from './contracts/material-schema.js';

const cleanDocument=document=>{
  if(!document)return null;
  const item={...document},_id=item._id;
  delete item._id;
  delete item.creationKey;
  return {...item,id:item.id||String(_id)};
};

export async function readMaterials(db){
  return (await db.collection('materials').find({}).toArray()).map(cleanDocument);
}

export async function findMaterial(db,id){
  return cleanDocument(await db.collection('materials').findOne({_id:id}));
}

export async function findMaterialByCreationKey(db,creationKey){
  return cleanDocument(await db.collection('materials').findOne({creationKey}));
}

export async function saveMaterial(db,item,creationKey){
  const update={$set:{...item,id:item.id}};
  if(creationKey)update.$setOnInsert={creationKey};
  await db.collection('materials').updateOne({_id:item.id},update,{upsert:true});
  return item;
}

export async function deleteMaterial(db,id){
  const result=await db.collection('materials').deleteOne({_id:id});
  if(result.deletedCount)await db.collection('materialMedia').deleteMany({listingId:id});
  return Boolean(result.deletedCount);
}

export async function migrateMaterials(db){
  const name='003-school-materials';
  if(await db.collection('migrations').findOne({name}))return;
  const old=JSON.parse(readFileSync(new URL('./legacy-materials.json',import.meta.url),'utf8'));
  const operations=old.map((record,index)=>{
    const split=record.quantity.indexOf(' '),now=new Date().toISOString();
    const item={...materialDefaults,id:record.id,title:record.title,summary:record.description,description:record.description,nature:record.type==='required'?'Required':'Available',transaction:record.transaction==='Second-Hand Required'?'Required':record.transaction,category:record.category,quantity:split<0?record.quantity:record.quantity.slice(0,split),unit:split<0?'Units':record.quantity.slice(split+1),condition:record.condition,location:record.location,status:record.active?'Active':'Inactive',tags:record.badges.filter(tag=>['NEW','URGENT','BULK'].includes(tag)).map(tag=>tag[0]+tag.slice(1).toLowerCase()),createdAt:now,updatedAt:now,displayOrder:index};
    return {updateOne:{filter:{_id:item.id},update:{$setOnInsert:{_id:item.id,...item}},upsert:true}};
  });
  if(operations.length)await db.collection('materials').bulkWrite(operations,{ordered:false});
  await db.collection('migrations').updateOne({name},{$setOnInsert:{name,appliedAt:new Date()}},{upsert:true});
}
