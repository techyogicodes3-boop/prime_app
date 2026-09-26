import {randomUUID} from 'node:crypto';
import {materialDefaults,validateMaterial,materialVisible,canOrder,filterMaterialRecords,categoryName} from './contracts/material-schema.js';
import {readMaterials,findMaterial,findMaterialByCreationKey,saveMaterial,deleteMaterial} from './material-db.js';
import {sessionFor} from './auth.js';
import {whatsappNumber} from './notifications.js';

const fail=(message,status=422)=>Object.assign(Error(message),{status});
const publicItem=item=>{const {contactName:_name,email:_email,phone:_phone,...publicRecord}=item;return publicRecord;};

export function registerMaterials(app,db,{adminAuth,upload,parseData,prepareImages}){
  const listing=async req=>{
    const item=await findMaterial(db,req.params.id);
    if(!item)throw fail('Material listing not found.',404);
    return item;
  };

  app.get('/api/materials',async(req,res)=>{
    const all=(await readMaterials(db)).filter(materialVisible);
    let items=filterMaterialRecords(all,req.query);
    if(req.query.home==='true')items=items.filter(item=>item.status==='Active');
    items.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||(a.displayOrder??0)-(b.displayOrder??0)||a.id.localeCompare(b.id));
    const total=items.length,limit=Math.min(60,Math.max(1,Number(req.query.limit)||12)),page=Math.max(1,Number(req.query.page)||1);
    res.json({items:items.slice((page-1)*limit,page*limit).map(publicItem),total,page,limit,categories:[...new Set(all.map(categoryName))].sort(),locations:[...new Set(all.map(item=>item.location))].sort()});
  });

  app.get('/api/materials/quotation',async(req,res)=>{
    const entries=String(req.query.items||'').split(',').filter(Boolean);
    if(!entries.length||entries.length>50)throw fail('Choose between 1 and 50 materials.');
    const selected=await Promise.all(entries.map(async entry=>{
      const [id,quantity]=entry.split(':'),item=await findMaterial(db,id),count=Number(quantity);
      if(!canOrder(item)||!Number.isSafeInteger(count)||count<1||count>10000)throw fail('Your cart contains an unavailable item or invalid quantity. Review it before requesting a quotation.',409);
      return {...publicItem(item),cartQty:count};
    }));
    const number=whatsappNumber();
    if(!number)throw fail('Quotation contact is not configured. Please contact Prism.',503);
    res.json({items:selected,whatsappUrl:'https://wa.me/'+number+'?text='+encodeURIComponent('Hello Prism Edu, please quote for:\n'+selected.map(item=>`${item.title} (${item.id}) — ${item.cartQty} requested pack(s); listing quantity: ${item.quantity} ${item.unit}`).join('\n'))});
  });

  app.get('/api/materials/:id/enquiry',async(req,res)=>{
    const item=await listing(req);
    if(!materialVisible(item))throw fail('Material listing not found.',404);
    if(item.status!=='Active')throw fail('This material is no longer available.',409);
    const number=whatsappNumber();
    res.json({whatsappUrl:number?'https://wa.me/'+number+'?text='+encodeURIComponent(`Hello Prism Edu, I am enquiring about ${item.title} (${item.id}), ${item.nature}, ${item.transaction}.`):null,email:process.env.PRISM_NOTIFICATION_EMAIL||''});
  });

  app.get('/api/materials/:id',async(req,res)=>{
    const item=await listing(req);
    if(!materialVisible(item))throw fail('Material listing not found.',404);
    res.json(publicItem(item));
  });

  app.get('/api/material-images/:id',async(req,res)=>{
    const media=await db.collection('materialMedia').findOne({_id:req.params.id});
    const item=media&&await findMaterial(db,media.listingId);
    if(!media||(!materialVisible(item)&&!await sessionFor(db,req)))return res.sendStatus(404);
    res.type(media.mime).send(Buffer.from(media.bytes?.buffer||media.bytes));
  });

  app.get('/api/admin/materials',adminAuth,async(req,res)=>{
    let items=filterMaterialRecords(await readMaterials(db),req.query);
    items.sort((a,b)=>req.query.sort==='title'?a.title.localeCompare(b.title):(req.query.sort==='oldest'?1:-1)*a.createdAt.localeCompare(b.createdAt));
    res.json({items,total:items.length});
  });

  app.get('/api/admin/materials/:id',adminAuth,async(req,res)=>res.json(await listing(req)));

  const save=async(req,res)=>{
    const previous=req.method==='PUT'?await listing(req):null,data=parseData(req),key=req.headers['idempotency-key'];
    if(!previous){
      if(typeof key!=='string'||!/^[a-f\d-]{36}$/i.test(key))throw fail('A valid creation key is required.',400);
      const existing=await findMaterialByCreationKey(db,key);
      if(existing)return res.json(existing);
    }
    if(previous&&data.updatedAt!==previous.updatedAt)throw fail('This listing changed. Reload it before saving.',409);
    const now=new Date().toISOString(),item={...materialDefaults,...previous,id:previous?.id||randomUUID(),createdAt:previous?.createdAt||now,updatedAt:now};
    for(const field of Object.keys(materialDefaults))if(data[field]!==undefined){
      if(['tags','images'].includes(field))item[field]=Array.isArray(data[field])?[...new Set(data[field])]:[];
      else if(field==='priceOnRequest')item[field]=data[field]===true;
      else item[field]=String(data[field]).trim();
    }
    item.images=item.images.filter(id=>previous?.images.includes(id));
    const fields=validateMaterial(item);
    if(Object.keys(fields).length)throw Object.assign(fail('Please correct the highlighted fields.'),{fields});
    const images=await prepareImages(req.files);
    if(item.images.length+images.length>10)throw fail('Use up to 10 images.');
    if(previous&&(await findMaterial(db,previous.id))?.updatedAt!==previous.updatedAt)throw fail('This listing changed. Reload it before saving.',409);
    if(!previous){const existing=await findMaterialByCreationKey(db,key);if(existing)return res.json(existing);}
    item.images.push(...images.map(image=>image.id));
    item.updatedAt=new Date(Math.max(Date.now(),Date.parse(previous?.updatedAt||0)+1)).toISOString();
    try{await saveMaterial(db,item,previous?undefined:key);}catch(error){
      if(error.code===11000&&!previous){const existing=await findMaterialByCreationKey(db,key);if(existing)return res.json(existing);}
      throw error;
    }
    if(images.length)await db.collection('materialMedia').insertMany(images.map(image=>({_id:image.id,listingId:item.id,bytes:image.bytes,mime:image.mime})));
    await db.collection('materialMedia').deleteMany({listingId:item.id,_id:{$nin:item.images}});
    res.status(previous?200:201).json(item);
  };

  app.post('/api/admin/materials',adminAuth,upload,save);
  app.put('/api/admin/materials/:id',adminAuth,upload,save);
  app.delete('/api/admin/materials/:id',adminAuth,async(req,res)=>{await listing(req);await deleteMaterial(db,req.params.id);res.json({ok:true});});
}
