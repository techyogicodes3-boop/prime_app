export const options = {
  type: ['Properties Available', 'Properties Required'],
  propertyType: ['Open Properties', 'School Building', 'Existing School Campus', 'Commercial/Educational Property'],
  transaction: ['For Sale', 'For Lease', 'Sale / Lease', 'Any Suitable Option'],
  dealStatus: ['Open', 'Sold', 'Rented', 'Leased', 'Requirement Fulfilled', 'Closed'],
  adminStatus: ['Active', 'Inactive', 'Archived'],
  approvalStatus: ['Pending', 'Approved', 'Rejected'],
  publicationStatus: ['Draft', 'Published', 'Unpublished'],
  areaUnit: ['sq. ft.', 'sq. m.', 'Acres', 'Hectares'],
};
export const textFields = ['title','propertyType','transaction','location','city','district','state','pinCode','areaUnit','terms','summary','description','suitability','connectivity','landmarks','facilities','ownerName','contactName','phone','whatsapp','email','listingDate','expiryDate','internalNotes','video'];
export const privateFields = ['ownerName','contactName','phone','whatsapp','email','internalNotes','consent','authorization','submissionKey','notification'];
export const publicFields = ['id','slug','reference','type','title','propertyType','transaction','dealStatus','urgent','location','city','district','state','pinCode','area','areaUnit','terms','summary','description','suitability','connectivity','landmarks','facilities','listingDate','expiryDate','images','video','updatedAt'];
export const defaults = { type:'Properties Available', propertyType:'Open Properties', transaction:'For Sale', dealStatus:'Open', adminStatus:'Inactive', approvalStatus:'Pending', publicationStatus:'Draft', urgent:false, featured:false, keepCompletedVisible:false, displayOrder:0, area:0, areaUnit:'sq. ft.', images:[], listingDate:'' };
export function isVisible(record, activeOnly = false) {
  return record.approvalStatus === 'Approved' && record.adminStatus === 'Active' && record.publicationStatus === 'Published' && (!record.expiryDate || record.expiryDate >= new Date().toISOString().slice(0,10)) && (record.dealStatus === 'Open' || (!activeOnly && record.keepCompletedVisible));
}
export function publicRecord(record) { return Object.fromEntries(publicFields.filter(key => record[key] !== undefined).map(key => [key, record[key]])); }
export const phoneValid = value => /^\+?[\d ()-]{7,20}$/.test(value || '') && (value.match(/\d/g)||[]).length >= 7;
export const emailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
export function validate(input, {publicSubmission = false} = {}) {
  const errors = {};
  if (input.area !== '' && input.area !== undefined && (!Number.isFinite(Number(input.area)) || Number(input.area) < 0)) errors.area = 'Enter a valid non-negative area.';
  for (const [key, values] of Object.entries(options)) if (!values.includes(input[key])) errors[key] = 'Select a valid option.';
  for (const key of textFields) if (String(input[key] || '').length > (['description','internalNotes'].includes(key) ? 10000 : 2000)) errors[key] = 'This value is too long.';
  if (input.email && !emailValid(input.email)) errors.email = 'Enter a valid email address.';
  for (const key of ['phone','whatsapp']) if (input[key] && !phoneValid(input[key])) errors[key] = 'Enter a valid phone number.';
  if (input.pinCode && !/^\d{6}$/.test(input.pinCode)) errors.pinCode = 'Enter a six-digit PIN code.';
  for (const key of ['listingDate','expiryDate']) if (input[key] && (!/^\d{4}-\d{2}-\d{2}$/.test(input[key]) || !Number.isFinite(Date.parse(input[key])) || new Date(input[key]).toISOString().slice(0,10)!==input[key])) errors[key] = 'Enter a valid date.';
  if (input.expiryDate && input.listingDate && input.expiryDate < input.listingDate) errors.expiryDate = 'Expiry must follow the listing date.';
  if (!Number.isInteger(Number(input.displayOrder)) || Math.abs(Number(input.displayOrder)) > 100000) errors.displayOrder = 'Enter a whole number between -100000 and 100000.';
  if (input.video) { try { if (new URL(input.video).protocol !== 'https:') throw Error(); } catch { errors.video = 'Use a valid HTTPS video URL.'; } }
  return errors;
}
