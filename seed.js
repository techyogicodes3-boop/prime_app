import {migrateMaterials} from './material-db.js';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {openDatabase,saveListing} from './db.js';
import {defaults} from './contracts/properties-schema.js';
import {migrateSqliteBackup} from './sqlite-migration.js';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const apiEnv=fileURLToPath(new URL('./.env',import.meta.url));
if(existsSync(apiEnv))process.loadEnvFile(apiEnv);

const db=await openDatabase(),name='002-import-existing-properties';
try{
  await migrateSqliteBackup(db);
  await migrateMaterials(db);
  if(await db.collection('migrations').findOne({name}))console.log('Existing properties migration already applied.');
  else{
    const records=JSON.parse(readFileSync(new URL('./legacy-properties.json',import.meta.url),'utf8'));
    for(const [index,record] of records.entries()){
      const city=record.location.split(',')[0],area=Number(record.area.replaceAll(',','').match(/[\d.]+/)[0]);
      const transaction=({'Sale':'For Sale','Lease':'For Lease','Sale / ':'Sale / Lease','Sale / Lease':'Sale / Lease','':'For Lease'})[record.transaction]||'For Sale';
      const item={...defaults,id:randomUUID(),slug:record.id,reference:'PP-LEGACY-'+String(index+1).padStart(4,'0'),title:record.title,type:record.type==='required'?'Properties Required':'Properties Available',location:record.location,city,district:record.location.includes('Pune')?'Pune':city,state:'Maharashtra',area,areaUnit:record.area.includes('Acres')?'Acres':'sq. ft.',transaction,suitability:record.suitability,description:record.description,summary:record.description,connectivity:record.roadConnectivity,terms:record.price||'',urgent:!!record.urgent,featured:record.featured,displayOrder:index,propertyType:record.title.includes('Campus')?'Existing School Campus':'Open Properties',listingDate:new Date().toISOString().slice(0,10),internalNotes:'Imported from the previous website. Verify availability and content, then approve, activate and publish.',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
      await saveListing(db,item);
    }
    await db.collection('migrations').insertOne({name,appliedAt:new Date()});
    console.log('Existing property listings imported as pending drafts.');
  }
}finally{await db.close();}
