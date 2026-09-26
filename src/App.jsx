import PrismSectionHeading,{SectionSubtitle} from './components/SectionHeading';
import IndustryAssociates from './components/IndustryAssociates';
import {MaterialShop,MaterialDetails,MaterialCart} from './components/SchoolMaterialSystem';
import {HomeProperties,PropertiesResults,PropertiesDetailsPage,PropertiesSubmission,PropertiesAdmin} from './components/SchoolPropertiesSystem';
import{useEffect,useMemo,useState}from'react';import{Routes,Route,Link,NavLink,useLocation,useParams}from'react-router-dom';import{Menu,X,ArrowRight,MapPin,Building2,BadgeCheck,TrendingUp,Handshake,Search,CheckCircle2,Phone,Mail,ShieldCheck,Target,FileText,LandPlot,AlertCircle,BookOpen,Users,Settings,Lightbulb,MonitorCog,School,ChartNoAxesCombined,Monitor,Library,Bus,Camera,PackageOpen,Boxes}from'lucide-react';
import{HeroRedesign,AboutPrismPreview,TrainingWorkshops,WorkProcess,EduHelpline,PremiumMeetingPage}from'./components/HomeRedesign';
import{Ecosystem,PracticalStart,ServicesShowcase,FinalVisionCTA}from'./components/HomepageFocused';
import AboutRedesign from'./components/AboutRedesign';
import ClientsSection from'./components/ClientsSection';
import{ServicesFocusedV2 as ServicesRedesign,ServicesClosing}from'./components/ServicesFocusedV2';
import EventsAwardsPage from'./components/EventsAwardsPage';
import LeadershipAwardPopup from'./components/LeadershipAwardPopup';
import GlobalFooter from'./components/GlobalFooter';
import AccountPage from'./components/AccountPage';
import MotionController from'./components/MotionController';
import './components/page-brand.css';
const nav=[['Home','/'],['About Us','/about'],['Our Services','/services'],['School Properties','/school-properties'],['School Mart','/school-materials'],['Our Clients','/our-clients'],['Events/Awards','/events-awards'],['Helpline','/resources'],['Contact','/contact']];
const PRISM_LOGO_URL='/images/prism-official/prism-logo.jpg';
const PRISM_CALENDLY_URL=''; // Add the official Prism Edu Calendly appointment URL when available.
const PRISM_PHONE='+91 95189 63309';
const PRISM_EMAIL='info@prismedu.in';
const PRISM_ADDRESS='Pimpri Nilakh,Pune, Maharashtra-411027';
const PRISM_OFFICE_HOURS='Visits by appointment';
const PRISM_MAP_URL='https://www.google.com/maps/search/?api=1&query=Pimpri%20Nilakh%2C%20Pune%2C%20Maharashtra%20411027';
const PRISM_MAP_EMBED_URL=''; // Add the verified Google Maps embed URL.
const announcementItems=['New Principals and School Leadership Award Registration Open'];
const lic=['CBSE Affiliation','State Board Recognition','ICSE / ISC Guidance','NOC & Recognition','Fire & Safety Compliance','Building Compliance','Government Approvals & Certifications','Trust / Society Guidance','School Licensing','Renewal / Upgradation'];
const grow=[['Admission Growth','Parent outreach, lead generation, counselling, CRM follow-up and conversion tracking.'],['School Branding','Positioning, identity and communication parents recognise and trust.'],['School Marketing','Digital campaigns, local marketing, events and promotions.'],['School Management Support','Operating frameworks, people systems and performance reviews.'],['School Takeover & Revamp','Assessment and repositioning for schools needing a new direction.'],['School Digitization Support','Digital workflows, enquiry systems and technology enablement.']];
function Logo({light=false}){return <Link to="/" className="flex shrink-0 items-center" aria-label="Prism Edu home">{PRISM_LOGO_URL?<img src={PRISM_LOGO_URL} alt="Prism Edu" className="h-14 w-auto max-w-[210px] object-contain md:h-16"/>:<span><strong className={'block font-display text-xl leading-none tracking-tight '+(light?'text-white':'text-ink')}>PRISM <span className="text-gold">EDU</span></strong><small className="mt-1 block text-[8px] uppercase tracking-[.16em] text-slate-400">Educational Consultancy</small></span>}</Link>}
function ConsultationLink({className='btn'}){return PRISM_CALENDLY_URL?<a className={className} href={PRISM_CALENDLY_URL} target="_blank" rel="noopener noreferrer">Request Consultation <ArrowRight size={16}/></a>:<Link className={className} to="/contact">Request Consultation <ArrowRight size={16}/></Link>}
function AnnouncementBar(){const content=announcementItems.map(item=><span key={item} className="flex shrink-0 items-center gap-6"><span>{item}</span><span className="text-gold" aria-hidden="true">•</span></span>);return <div className="announcement-bar bg-ink py-2 text-[10px] font-semibold tracking-[.12em] text-white/85 sm:text-[11px]"><div className="announcement-track"><div className="announcement-group">{content}</div><div className="announcement-group" aria-hidden="true">{content}</div></div></div>}
function UtilityLink({to,label,children,badge}){return <Link to={to} title={label} aria-label={label} className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink transition duration-200 hover:bg-amber-50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">{children}{badge>0&&<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-extrabold text-ink">{badge}</span>}</Link>}
function Layout({children}){const[o,setO]=useState(false),{pathname}=useLocation();useEffect(()=>{setO(false);scrollTo(0,0);document.title='Prism Edu | '+(pathname==='/'?'School Business & Growth':pathname.slice(1).replaceAll('-',' '))},[pathname]);return <><MotionController/><LeadershipAwardPopup/><AnnouncementBar/><header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur"><div className="wrap flex h-[82px] items-center md:h-[90px] justify-between gap-2 xl:gap-3"><Logo/><nav className="hidden items-center xl:flex">{nav.map(([l,t])=><NavLink key={l} end={t==='/'} to={t} className={({isActive})=>'nav-link relative whitespace-nowrap px-2 py-3 text-[11px] font-semibold tracking-[.01em] transition-colors duration-200 '+(isActive?'is-active text-gold':'text-ink hover:text-gold')}>{l}</NavLink>)}</nav><div className="ml-auto flex items-center gap-1"><div className="hidden items-center gap-0.5 xl:flex"><UtilityLink to="/admin" label="Admin Panel"><ShieldCheck size={18}/></UtilityLink><UtilityLink to="/account" label="Login / Register"><Users size={18}/></UtilityLink></div><div className="hidden xl:block"><Link className="btn ml-2 !px-3 !py-2.5 text-xs" to="/business-meeting">Meeting <ArrowRight size={15}/></Link></div><UtilityLink to="/account" label="Login / Register"><span className="xl:hidden"><Users size={18}/></span><span className="hidden xl:block"/></UtilityLink><button type="button" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-ink xl:hidden" onClick={()=>setO(!o)} aria-expanded={o} aria-controls="mobile-navigation" aria-label={o?'Close navigation':'Open navigation'}>{o?<X size={21}/>:<Menu size={21}/>}</button></div></div><div className="bus-road" aria-hidden="true"><Bus className="school-bus" size={20}/></div>{o&&<nav id="mobile-navigation" className="border-t bg-white px-5 pb-5 xl:hidden">{nav.map(([l,t])=><NavLink key={l} end={t==='/'} className={({isActive})=>'block border-b py-3 text-sm font-bold transition '+(isActive?'text-gold':'text-ink hover:text-gold')} to={t}>{l}</NavLink>)}<Link className="flex items-center gap-3 border-b py-3 text-sm font-bold text-ink" to="/admin"><ShieldCheck size={18}/>Admin Panel</Link><Link className="flex items-center gap-3 border-b py-3 text-sm font-bold text-ink" to="/account"><Users size={18}/>Login / Register</Link><Link className="btn mt-4 w-full" to="/business-meeting">Meeting <ArrowRight size={16}/></Link></nav>}</header><main>{children}{!['/','/about','/services','/events-awards'].includes(pathname)&&<div className="page-brand-accent"><img src={PRISM_LOGO_URL} alt="Prism Edu Consultancy" width="112" height="112" loading="lazy"/><p>Prism Edu Consultancy</p></div>}</main><GlobalFooter/></>}
function Hero({label,title,text}){return <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28"><div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/10"/><div className="wrap relative"><span className="eyebrow">{label}</span><PrismSectionHeading as="h1" className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">{title}</PrismSectionHeading><SectionSubtitle className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{text}</SectionSubtitle></div></section>}

function Head({label,title,text,center=false}){return <div className={'mb-10 max-w-3xl '+(center?'mx-auto text-center':'')}><span className="eyebrow">{label}</span><PrismSectionHeading as="h2" className="title">{title}</PrismSectionHeading>{text&&<SectionSubtitle className="mt-4 text-lg leading-8">{text}</SectionSubtitle>}</div>}
async function sendEnquiry(form,topic){
  const entries=[...new FormData(form).entries()].filter(([,value])=>String(value).trim());
  const values=Object.fromEntries(entries),find=(...keys)=>keys.map(key=>values[key]).find(Boolean)||'';
  const message=find('message','Message','Brief requirement')||entries.filter(([key])=>!['name','Name','email','Email address','phone','Phone number'].includes(key)).map(([key,value])=>`${key}: ${value}`).join('\n');
  const response=await fetch('/api/enquiries',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:find('name','Name','Contact Person'),email:find('email','Email','Email address'),phone:find('phone','Phone','Phone number','Mobile Number'),topic,message})});
  const result=await response.json().catch(()=>({}));
  if(!response.ok)throw Error(result.error||'Unable to send your enquiry. Please try again.');
  return result;
}
function Form({title='Tell us about your requirement',fields=[]}){const[status,setStatus]=useState('idle'),[error,setError]=useState('');const submit=async e=>{e.preventDefault();if(status==='submitting')return;setStatus('submitting');setError('');try{await sendEnquiry(e.currentTarget,title);setStatus('success')}catch(requestError){setError(requestError.message);setStatus('idle')}};if(status==='success')return <div className="card text-center"><CheckCircle2 className="mx-auto mb-3 text-green-600" size={42}/><h3>Thank you for your enquiry</h3><p className="mt-2 text-sm">Your request has been securely received by Prism Edu.</p></div>;return <form className="card" onSubmit={submit}><h3 className="mb-6 text-xl">{title}</h3><div className="grid gap-4 md:grid-cols-2">{['Name','Phone number','Email address','City / Location',...fields].map((x,i)=>x.includes('Message')||x.includes('Challenges')?<textarea key={x} name={x} required className="field md:col-span-2" rows="4" placeholder={x}/>:<input key={x} name={x} required className="field" type={i===1?'tel':i===2?'email':'text'} placeholder={x}/>)}</div><label className="mt-4 flex gap-2 text-xs"><input type="checkbox" required/>I agree to be contacted about this enquiry.</label>{error&&<p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}<button disabled={status==='submitting'} className="btn mt-5 w-full">{status==='submitting'?'Submitting…':'Submit enquiry'}</button></form>}
function Cards({items,icons=false}){return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(x=>{let[t,d]=Array.isArray(x)?x:[x,'Structured guidance aligned with your project requirements.'];let I=icons?ShieldCheck:Target;return <div className="card" key={t}><I className="mb-4 text-gold"/><h3 className="text-xl">{t}</h3><p className="mt-3 leading-7">{d}</p></div>})}</div>}

const PRISM_WHATSAPP_URL='https://wa.me/919518963309';
const locationFactors=[
  [MapPin,'Student Accessibility','Safe and convenient access for nearby students.'],
  [Users,'Teacher & Staff Access','A well-connected location helps attract and retain staff.'],
  [Bus,'Public Transport','Easy access to roads and public transportation.'],
  [ShieldCheck,'Safe Surroundings','A secure and suitable learning environment.'],
  [TrendingUp,'Growth Potential','Adequate space for facilities and future expansion.'],
  [School,'Practical Suitability','Properties aligned with budget and institutional requirements.'],
];
const PropertiesConnections=[
  [Search,'Challenges Faced by Schools',['Finding an accessible and safe location','Matching the site with budget and space requirements','Checking transport and surrounding infrastructure','Evaluating suitability for present and future needs']],
  [LandPlot,'Challenges Faced by property owners',['Reaching genuine school promoters','Presenting the property to suitable institutions','Communicating property details and availability clearly','Coordinating discussions with interested clients']],
  [Handshake,'Support Provided by Prism Education',['Connect schools with suitable property owners','Understand and match both parties’ requirements','Coordinate property discussions and site evaluation','Support the process through documentation']],
];
const PropertiesProcess=[
  ['01','Requirement Discussion','Understand the preferred location, education model, approximate area, and budget.'],
  ['02','Property Discovery','Review relevant listings and suitable property opportunities.'],
  ['03','Site Evaluation','Assess accessibility, surroundings, connectivity, and institutional suitability.'],
  ['04','Documentation Coordination','Coordinate discussions and documentation with relevant professional review.'],
];

function SchoolPropertiesPage(){return <>
  <section className="school-properties-page-hero relative isolate overflow-hidden text-white" aria-labelledby="school-properties-page-title"><img src="/images/prism-official/school-properties-location-background.png" alt="Modern school campus beside open green properties with road access and a location marker" className="absolute inset-0 -z-20 h-full w-full object-cover"/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#072c20]/95 via-[#0d5c48]/82 to-[#126b73]/35"/><div className="wrap flex min-h-[520px] items-center py-16 md:min-h-[590px] md:py-24"><div className="max-w-3xl"><span className="eyebrow !text-amber-300">School Properties MARKETPLACE</span><PrismSectionHeading as="h1" id="school-properties-page-title" className="text-4xl font-extrabold leading-[1.08] text-white md:text-6xl">Find the Right Location for Your Education Vision</PrismSectionHeading><SectionSubtitle className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">Explore suitable properties and opportunities for schools and educational institutions, or list your property with Prism Edu Consultancy.</SectionSubtitle><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a className="btn" href="#school-properties-listings">Explore Available Properties <ArrowRight size={16}/></a><Link className="btn2 border-white/50 bg-white/10 text-white backdrop-blur" to="/school-properties/requirement">Submit Properties Requirement</Link><Link className="btn2 border-white/50 bg-white/10 text-white backdrop-blur" to="/school-properties/list">List Your Property</Link><Link className="px-4 py-3 text-center text-sm font-bold text-white underline decoration-amber-300 decoration-2 underline-offset-4" to="/contact">Talk to Our Consultant</Link></div></div></div></section>
  <section className="school-location-matters py-12 md:py-16"><div className="wrap"><Head center label="LOCATION PLANNING" title="Why the Right School Location Matters" text="A well-planned school location improves accessibility, safety, daily operations, and long-term growth. Prism Edu helps institutions identify suitable properties based on their practical and educational needs."/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{locationFactors.map(([Icon,title,text],index)=><article className="school-properties-info-card Properties-reveal" style={{'--reveal-delay':index*70+'ms'}} key={title}><span><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="Properties-connection-section py-14 md:py-20"><div className="wrap"><div className="mx-auto max-w-3xl text-center"><span className="eyebrow">OUR PROCESS</span><PrismSectionHeading as="h2" className="title">Connecting Schools, property owners and Prism Education</PrismSectionHeading><SectionSubtitle className="mt-4 leading-7 text-slate-600">A coordinated approach to understanding requirements, presenting suitable opportunities and supporting informed discussions.</SectionSubtitle></div><div className="mt-9 grid gap-5 lg:grid-cols-3">{PropertiesConnections.map(([Icon,title,points],index)=><article className={'Properties-connection-card Properties-connection-card-'+(index+1)+' Properties-reveal'} style={{'--reveal-delay':index*90+'ms'}} key={title}><span className="Properties-connection-icon"><Icon size={27}/></span><h3>{title}</h3><ul>{points.map(point=><li key={point}><CheckCircle2 size={16}/><span>{point}</span></li>)}</ul></article>)}</div><div className="mx-auto mt-14 max-w-3xl text-center"><span className="eyebrow">STEP-BY-STEP SUPPORT</span><PrismSectionHeading as="h2" className="title">Support from Evaluation to Documentation</PrismSectionHeading></div><ol className="Properties-process-grid mt-9">{PropertiesProcess.map(([number,title,text],index)=><li className="Properties-reveal" style={{'--reveal-delay':index*70+'ms'}} key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
  <PropertiesResults/>
</>}


function WebsiteQuotationPage(){const[status,setStatus]=useState('idle'),[error,setError]=useState('');if(status==='success')return <section className="wrap py-20"><div className="card mx-auto max-w-2xl text-center"><CheckCircle2 className="mx-auto text-emerald-600" size={44}/><h1 className="mt-4 text-3xl">Quotation request received</h1><p className="mt-3">Our team will review your requirement and contact you.</p></div></section>;return <section className="bg-gradient-to-br from-blue-50 to-cream py-16 md:py-24"><div className="wrap"><Head label="DIGITAL SERVICES" title="Get Website Quotation" text="Tell us what your school or organization needs. No pricing or delivery commitment is generated automatically."/><form className="card mx-auto max-w-4xl" onSubmit={async e=>{e.preventDefault();setStatus('submitting');setError('');try{await sendEnquiry(e.currentTarget,'Website quotation');setStatus('success')}catch(requestError){setError(requestError.message);setStatus('idle')}}}><div className="grid gap-4 md:grid-cols-2"><input required className="field" name="Organization" placeholder="School / Organization Name"/><input required className="field" name="Contact Person" placeholder="Contact Person"/><input required className="field" name="Phone" type="tel" placeholder="Phone"/><input required className="field" name="Email" type="email" placeholder="Email"/><input className="field" name="Existing Website" type="url" placeholder="Existing Website URL (optional)"/><select required name="Required Service" className="field" defaultValue=""><option value="" disabled>Required Service</option>{['New Website','Website Redesign','Website Management','Mobile App','Digital Marketing','School Automation','Complete Digital Package'].map(x=><option key={x}>{x}</option>)}</select><input required className="field md:col-span-2" name="Features" placeholder="Number of pages / features required"/><textarea required className="field md:col-span-2" name="Brief requirement" rows="5" placeholder="Brief requirement"/><select required name="Preferred contact method" className="field" defaultValue=""><option value="" disabled>Preferred contact method</option><option>Phone</option><option>Email</option><option>WhatsApp</option></select></div><label className="mt-4 flex gap-2 text-xs"><input type="checkbox" required/>I agree to be contacted about this quotation request.</label>{error&&<p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}<button disabled={status==='submitting'} className="btn mt-6">{status==='submitting'?'Submitting…':'Submit Quotation Request'}</button></form></div></section>}

const enquiryTypes=['Start a School','School Properties Required','List School Properties','Licensing & Affiliation','Academic Consultancy','School Branding','Admission Growth','School Restructuring','Partner With Prism Edu','School Material Marketplace','Website Design','Website Redesign','Mobile Application','Digital Marketing','School Automation','General Enquiry'];
const contactHelp=[['Start a School','Start a School',Building2],['School Properties','School Properties Required',LandPlot],['Licensing','Licensing & Affiliation',BadgeCheck],['School Growth','Admission Growth',TrendingUp],['School Restructuring','School Restructuring',ChartNoAxesCombined],['School Materials','School Material Marketplace',Boxes],['Digital Services','Website Design',MonitorCog]];
function ContactPage(){const query=new URLSearchParams(useLocation().search),requested=query.get('service')||query.get('enquiry')||'',initialType=({'school-services':'Start a School',digital:'Digital Marketing',licensing:'Licensing & Affiliation',documentation:'Licensing & Affiliation','industry-associates-registration':'School Material Marketplace',consultation:'General Enquiry','events-awards':'General Enquiry'})[requested]||'';const[type,setType]=useState(initialType),[status,setStatus]=useState('idle');const submit=async e=>{e.preventDefault();if(status==='submitting')return;setStatus('submitting');try{await sendEnquiry(e.currentTarget,type||'General enquiry');setStatus('success')}catch{setStatus('error')}};const choose=value=>{setType(value);setTimeout(()=>document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth',block:'start'}),0)};const whatsappHref=PRISM_WHATSAPP_URL?(PRISM_WHATSAPP_URL+(PRISM_WHATSAPP_URL.includes('?')?'&':'?')+'text='+encodeURIComponent('Hello Prism Edu, I would like to know more about your school consultancy services.')):'';const cards=[[Phone,'Phone',PRISM_PHONE||'Contact number to be updated',PRISM_PHONE?'tel:'+PRISM_PHONE:''],[Mail,'Email',PRISM_EMAIL||'Email address to be updated',PRISM_EMAIL?'mailto:'+PRISM_EMAIL:''],[MapPin,'Office Address',PRISM_ADDRESS||'Office address to be updated',PRISM_MAP_URL],[Settings,'Office Hours',PRISM_OFFICE_HOURS||'Office timings to be updated','']];return <>
  <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#eaf3fb] via-white to-[#faf4e8] py-16 md:py-24"><div className="absolute -right-24 -top-20 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"/><div className="wrap"><span className="eyebrow">CONTACT PRISM EDU</span><PrismSectionHeading as="h1" className="max-w-4xl text-4xl font-extrabold leading-tight text-ink md:text-6xl">Let’s Build Better Schools Together</PrismSectionHeading><SectionSubtitle className="mt-5 max-w-3xl text-lg leading-8">Connect with Prism Edu Consultancy for school setup, licensing, academic development, branding, admissions, restructuring, digital solutions and complete school growth support.</SectionSubtitle><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ConsultationLink/><button className="btn2" onClick={()=>document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'})}>Send an Enquiry <ArrowRight size={16}/></button></div></div></section>
  <section className="border-y bg-white py-6"><div className="wrap grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><a className={'btn2 '+(!PRISM_PHONE?'pointer-events-none opacity-60':'')} href={PRISM_PHONE?'tel:'+PRISM_PHONE:undefined}><Phone size={17}/>Call Now</a><a className={'btn2 '+(!whatsappHref?'pointer-events-none opacity-60':'')} href={whatsappHref||undefined} target={whatsappHref?'_blank':undefined} rel="noopener noreferrer"><Handshake size={17}/>WhatsApp</a><a className={'btn2 '+(!PRISM_EMAIL?'pointer-events-none opacity-60':'')} href={PRISM_EMAIL?'mailto:'+PRISM_EMAIL:undefined}><Mail size={17}/>Email Us</a><ConsultationLink className="btn"/></div></section>
  <section className="bg-cream py-16 md:py-24"><div className="wrap grid gap-8 lg:grid-cols-[1.15fr_.85fr]"><div id="contact-form" className="scroll-mt-28 rounded-[2rem] border border-white bg-white p-6 shadow-[0_22px_65px_rgba(16,38,63,.10)] md:p-9"><span className="eyebrow">SEND AN ENQUIRY</span><h2 className="text-3xl">Tell us how we can help</h2>{status==='success'?<div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status"><CheckCircle2 className="mx-auto text-emerald-600" size={42}/><h3 className="mt-4 text-xl">Thank you. Your enquiry has been received.</h3><p className="mt-2 text-sm">Our team will contact you shortly using the details provided.</p><button className="btn2 mt-5" onClick={()=>setStatus('idle')}>Send Another Enquiry</button></div>:<form className="mt-7" onSubmit={submit}>{status==='error'&&<p className="mb-4 text-sm text-red-700" role="alert">Unable to send your enquiry. Please check your details and try again.</p>}<div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold text-ink">Full Name<input required name="name" autoComplete="name" className="field mt-2"/></label><label className="text-sm font-semibold text-ink">Mobile Number<input required name="phone" autoComplete="tel" inputMode="tel" pattern="[0-9+() -]{7,18}" title="Enter a valid mobile number" className="field mt-2"/></label><label className="text-sm font-semibold text-ink">Email Address<input required name="email" autoComplete="email" type="email" className="field mt-2"/></label><label className="text-sm font-semibold text-ink">School / Organization Name<input required name="organization" className="field mt-2"/></label><label className="text-sm font-semibold text-ink">City / Location<input required name="location" autoComplete="address-level2" className="field mt-2"/></label><label className="text-sm font-semibold text-ink">Enquiry Type<select required name="enquiryType" className="field mt-2" value={type} onChange={e=>setType(e.target.value)}><option value="" disabled>Select an enquiry type</option>{enquiryTypes.map(x=><option key={x}>{x}</option>)}</select></label><label className="text-sm font-semibold text-ink md:col-span-2">Message<textarea required name="message" rows="5" className="field mt-2"/></label></div><label className="mt-4 flex items-start gap-2 text-xs"><input className="mt-0.5" type="checkbox" required/>I agree to be contacted about this enquiry.</label><button disabled={status==='submitting'} className="btn mt-6 min-w-44 disabled:cursor-wait disabled:opacity-60">{status==='submitting'?'Submitting…':'Submit Enquiry'}</button></form>}</div><aside className="space-y-4"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{cards.map(([Icon,title,detail,href])=>{const content=<><span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-gold"><Icon size={21}/></span><div><h3 className="text-base">{title}</h3><p className="mt-1 break-words text-sm leading-6">{detail}</p></div></>;return href?<a key={title} href={href} target={title==='Office Address'?'_blank':undefined} rel="noopener noreferrer" className="flex gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:border-gold">{content}</a>:<div key={title} className="flex gap-4 rounded-2xl border bg-white p-5 opacity-80 shadow-sm">{content}</div>})}</div><div className="rounded-2xl bg-ink p-7 text-white shadow-lg"><Lightbulb className="text-gold"/><h3 className="mt-4 text-2xl text-white">Need Expert Guidance?</h3><p className="mt-3 text-sm leading-6 text-white/70">Book a consultation with Prism Edu to discuss your school project directly.</p><ConsultationLink className="btn mt-5 w-full"/></div></aside></div></section>
  <section className="bg-white py-16 md:py-20"><div className="wrap"><div className="mx-auto mb-9 max-w-3xl text-center"><span className="eyebrow">QUICK ENQUIRY</span><PrismSectionHeading as="h2" className="title">What Can We Help You With?</PrismSectionHeading></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{contactHelp.map(([label,value,Icon])=><button key={label} onClick={()=>choose(value)} className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-gold"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700"><Icon size={21}/></span><span className="font-bold text-ink group-hover:text-gold">{label}</span></button>)}</div></div></section>
  <section className="bg-blue-50/60 py-16 md:py-20"><div className="wrap"><Head label="FIND US" title="Visit Prism Edu Consultancy" text="Visit Prism Edu Consultancy to discuss how we can support your school’s growth."/>{PRISM_MAP_EMBED_URL?<div className="overflow-hidden rounded-[2rem] border bg-white shadow-lg"><iframe src={PRISM_MAP_EMBED_URL} title="Prism Edu Consultancy location" className="aspect-[16/7] min-h-[320px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>:<div className="grid min-h-[300px] place-items-center rounded-[2rem] border border-dashed border-blue-200 bg-white text-center"><div><MapPin className="mx-auto text-gold" size={42}/><h3 className="mt-4 text-xl">Prism Edu Consultancy, Pune</h3><p className="mt-2 text-sm">Use the directions button below to open the office location in Google Maps.</p></div></div>}{PRISM_MAP_URL&&<a className="btn mt-6" href={PRISM_MAP_URL} target="_blank" rel="noopener noreferrer">Get Directions <ArrowRight size={16}/></a>}</div></section>
  <section className="relative overflow-hidden bg-ink py-16 text-white"><div className="wrap flex flex-col justify-between gap-8 lg:flex-row lg:items-center"><div><PrismSectionHeading as="h2" className="max-w-3xl text-3xl font-bold text-white md:text-4xl">Ready to Start, Improve or Transform Your School?</PrismSectionHeading><SectionSubtitle className="mt-3 max-w-3xl leading-7 text-white/70">Connect with Prism Edu for practical guidance from planning and licensing to operations, branding, admissions and digital transformation.</SectionSubtitle></div><div className="flex flex-col gap-3 sm:flex-row"><ConsultationLink/>{whatsappHref&&<a className="btn2 border-white/25 bg-white/5 text-white" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>}{PRISM_EMAIL&&<a className="btn2 border-white/25 bg-white/5 text-white" href={'mailto:'+PRISM_EMAIL}>Email Us</a>}</div></div></section>
  {(whatsappHref||PRISM_EMAIL)&&<div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2">{whatsappHref&&<a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Prism Edu on WhatsApp" className="group flex h-12 items-center justify-end rounded-full bg-emerald-600 px-3 text-white shadow-lg"><span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all group-hover:mr-2 group-hover:max-w-40">Chat with Prism Edu</span><Handshake size={20}/></a>}{PRISM_EMAIL&&<a href={'mailto:'+PRISM_EMAIL} aria-label="Email Prism Edu" className="group flex h-12 items-center justify-end rounded-full bg-blue-700 px-3 text-white shadow-lg"><span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all group-hover:mr-2 group-hover:max-w-32">Email Prism Edu</span><Mail size={20}/></a>}</div>}
</>}

const resourceTabs=['All Resources','Webinars','New Updates','Blogs','Videos','Downloads','Archives','Student / Parent Helpline','Useful Links'];
const resourceContent=[]; // Populate from an authenticated Resources API/CMS when backend infrastructure is available.
const resourceIcon={Webinars:Monitor,'New Updates':AlertCircle,Blogs:BookOpen,Videos:Camera,Downloads:FileText,Archives:Library,'Useful Links':ArrowRight};
function ResourceCard({item}){const Icon=resourceIcon[item.type]||BookOpen;const target=item.type==='Blogs'?'/resources/blog/'+item.slug:item.url;return <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_16px_45px_rgba(16,38,63,.08)] transition hover:-translate-y-1 hover:border-gold/40"><div className="relative grid aspect-[16/8] place-items-center bg-gradient-to-br from-blue-50 to-amber-50">{item.image?<img src={item.image} alt="" className="h-full w-full object-cover"/>:<Icon size={48} className="text-ink/35"/>}<span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[9px] font-bold tracking-wider text-white">{item.type}</span></div><div className="flex flex-1 flex-col p-6"><p className="text-xs font-semibold text-gold">{item.category}{item.date?' · '+item.date:''}</p><h3 className="mt-2 text-xl">{item.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6">{item.description}</p>{target&&(item.type==='Blogs'?<Link className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-ink hover:text-gold" to={target}>Read More <ArrowRight size={15}/></Link>:<a className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-ink hover:text-gold" href={target} target="_blank" rel="noopener noreferrer">View Resource <ArrowRight size={15}/></a>)}</div></article>}
function ResourceEmpty({category}){return <div className="col-span-full rounded-2xl border border-dashed border-blue-200 bg-white p-10 text-center"><Library className="mx-auto text-gold" size={38}/><h3 className="mt-4 text-xl">No {category==='All Resources'?'resources':category.toLowerCase()} are currently published.</h3><p className="mt-2 text-sm">Please check back soon for verified Prism Edu content.</p></div>}
function HelplineForm(){const[status,setStatus]=useState('idle'),[error,setError]=useState('');if(status==='success')return <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status"><CheckCircle2 className="mx-auto text-emerald-600" size={40}/><h3 className="mt-4 text-xl">Your question has been recorded.</h3><p className="mt-2 text-sm">Your question has been securely sent to Prism Edu.</p></div>;return <form className="rounded-2xl border bg-white p-6 shadow-lg md:p-8" onSubmit={async e=>{e.preventDefault();setStatus('submitting');setError('');try{await sendEnquiry(e.currentTarget,'Student / Parent Helpline');setStatus('success')}catch(requestError){setError(requestError.message);setStatus('idle')}}}><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold text-ink">Name<input required className="field mt-2" name="name" autoComplete="name"/></label><label className="text-sm font-semibold text-ink">Email<input required name="email" type="email" className="field mt-2" autoComplete="email"/></label><label className="text-sm font-semibold text-ink">Mobile Number <span className="font-normal text-slate-400">(optional)</span><input name="phone" type="tel" inputMode="tel" pattern="[0-9+() -]{7,18}" className="field mt-2" autoComplete="tel"/></label><label className="text-sm font-semibold text-ink">I am a<select required name="Role" className="field mt-2" defaultValue=""><option value="" disabled>Select</option>{['Student','Parent','Educator','School Representative'].map(x=><option key={x}>{x}</option>)}</select></label><label className="text-sm font-semibold text-ink">Topic<select required name="Topic" className="field mt-2" defaultValue=""><option value="" disabled>Select a topic</option>{['Academic Guidance','School Admission','Parent Guidance','Student Guidance','Career / Education Guidance','School-related Query','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label className="text-sm font-semibold text-ink">Preferred Response<select required name="Preferred Response" className="field mt-2" defaultValue=""><option value="" disabled>Select</option><option>Email</option><option>Phone</option></select></label><label className="text-sm font-semibold text-ink md:col-span-2">Message / Question<textarea required name="message" rows="5" className="field mt-2"/></label></div><p className="mt-4 text-xs leading-5 text-slate-500">Please avoid sharing sensitive personal or confidential information in your message. This is an educational guidance channel, not an emergency service.</p>{error&&<p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}<button disabled={status==='submitting'} className="btn mt-6">{status==='submitting'?'Sending…':'Send Your Question'}</button></form>}
function ResourcesPage(){const[query,setQuery]=useState(''),[tab,setTab]=useState('All Resources'),[sort,setSort]=useState('Latest'),[limit,setLimit]=useState(6);const published=resourceContent.filter(x=>x.status==='published'&&!x.archived),filtered=useMemo(()=>{const q=query.trim().toLowerCase(),items=published.filter(x=>(tab==='All Resources'||x.type===tab)&&(!q||[x.title,x.type,x.category,x.description,x.date,x.author,...(x.tags||[])].join(' ').toLowerCase().includes(q)));return [...items].sort((a,b)=>sort==='Oldest'?new Date(a.date)-new Date(b.date):new Date(b.date)-new Date(a.date))},[query,tab,sort]);const featured=published.filter(x=>x.featured).slice(0,4),upcoming=published.find(x=>x.type==='Webinars'&&x.webinarStatus==='Upcoming');return <>
  <section className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-24"><div className="absolute inset-0 -z-10 opacity-[.08]" style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'36px 36px'}}/><div className="wrap"><span className="eyebrow">RESOURCES</span><PrismSectionHeading as="h1" className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">Prism Edu Knowledge &amp; Resource Hub</PrismSectionHeading><SectionSubtitle className="mt-5 max-w-3xl text-lg leading-8 text-white/75">Practical guidance, updates, learning resources and expert support for schools, educators, students and parents.</SectionSubtitle></div></section>
  <section className="border-b bg-white py-7"><div className="wrap"><div className="flex flex-col gap-3 lg:flex-row"><label className="relative flex-1"><span className="sr-only">Search resources</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/><input className="field !pl-12" value={query} onChange={e=>{setQuery(e.target.value);setLimit(6)}} placeholder="Search resources, blogs, webinars, videos or updates..."/></label><button className="btn" type="button" onClick={()=>setLimit(6)}>Search</button><button className="btn2" type="button" onClick={()=>{setQuery('');setLimit(6)}} disabled={!query}>Clear</button><select className="field lg:w-44" value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort resources"><option>Latest</option><option>Oldest</option></select></div><div className="mt-5 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Resource categories">{resourceTabs.map(x=><button key={x} role="tab" aria-selected={tab===x} onClick={()=>{setTab(x);setLimit(6)}} className={'whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition '+(tab===x?'bg-ink text-white shadow':'border border-slate-200 text-ink hover:border-gold')}>{x}</button>)}</div></div></section>
  {featured.length>0&&<section className="bg-cream py-16"><div className="wrap"><Head label="FEATURED RESOURCES" title="Selected guidance and updates"/><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{featured.map(x=><ResourceCard key={x.id} item={x}/>)}</div></div></section>}
  {upcoming&&<section className="bg-blue-50 py-14"><div className="wrap"><span className="eyebrow">UPCOMING WEBINAR</span><ResourceCard item={upcoming}/></div></section>}
  <section className="bg-[#f6f8fb] py-16 md:py-24"><div className="wrap"><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">KNOWLEDGE CENTER</span><PrismSectionHeading as="h2" className="title">{tab}</PrismSectionHeading></div><p className="text-sm text-slate-500">Showing {Math.min(limit,filtered.length)} of {filtered.length}</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.length?filtered.slice(0,limit).map(x=><ResourceCard key={x.id} item={x}/>):<ResourceEmpty category={tab}/>}</div>{limit<filtered.length&&<div className="mt-9 text-center"><button className="btn2" onClick={()=>setLimit(x=>x+6)}>Load More</button></div>}</div></section>
  <section id="student-parent-helpline" className="scroll-mt-24 bg-gradient-to-br from-[#eef5fb] to-[#faf4e8] py-16 md:py-24"><div className="wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><span className="eyebrow">FREE GUIDANCE CHANNEL</span><PrismSectionHeading as="h2" className="title">Free Student &amp; Parent Email Helpline</PrismSectionHeading><SectionSubtitle className="mt-5 text-lg leading-8">Send your education-related question to Prism Edu and receive guidance through our support channel.</SectionSubtitle><div className="mt-7 rounded-2xl border border-blue-100 bg-white/70 p-5 text-sm leading-6"><Mail className="mb-3 text-gold"/><strong className="text-ink">Professional educational support</strong><p className="mt-1">This channel supports education-related questions and does not replace emergency, medical, legal or safeguarding services.</p></div></div><HelplineForm/></div></section>
  <section className="bg-white py-16"><div className="wrap"><Head label="ARCHIVES" title="Browse earlier resources" text="Published archived content will be organized by year, month, resource type and category once available."/><div className="flex flex-wrap gap-3">{[new Date().getFullYear(),new Date().getFullYear()-1,new Date().getFullYear()-2].map(year=><button className="btn2" key={year} onClick={()=>{setTab('Archives');setQuery(String(year));scrollTo({top:0,behavior:'smooth'})}}>{year}</button>)}</div></div></section>
  <section className="bg-ink py-16 text-white"><div className="wrap flex flex-col justify-between gap-7 lg:flex-row lg:items-center"><div><PrismSectionHeading as="h2" className="text-3xl font-bold text-white md:text-4xl">Need Guidance Beyond These Resources?</PrismSectionHeading><SectionSubtitle className="mt-3 text-white/70">Connect with Prism Edu for personalized school consultancy and education support.</SectionSubtitle></div><div className="flex flex-col gap-3 sm:flex-row"><ConsultationLink/><Link className="btn2 border-white/25 bg-white/5 text-white" to="/contact">Contact Prism Edu</Link><a className="px-4 py-3 text-center text-sm font-bold text-white/80 hover:text-gold" href="#student-parent-helpline">Ask Through Free Helpline</a></div></div></section>
</>}
function ResourceBlogPage(){const{slug}=useParams(),blog=resourceContent.find(x=>x.type==='Blogs'&&x.slug===slug&&x.status==='published');if(!blog)return <section className="wrap py-20"><div className="card mx-auto max-w-2xl text-center"><BookOpen className="mx-auto text-gold" size={42}/><h1 className="mt-4 text-3xl">Resource not found</h1><p className="mt-3">This blog may be unpublished, archived or unavailable.</p><Link className="btn mt-6" to="/resources">Back to Resources</Link></div></section>;return <article className="wrap max-w-4xl py-16"><span className="eyebrow">{blog.category}</span><PrismSectionHeading as="h1" className="text-4xl font-bold md:text-5xl">{blog.title}</PrismSectionHeading><SectionSubtitle className="mt-4 text-sm">{blog.author} · {blog.date}</SectionSubtitle>{blog.image&&<img src={blog.image} alt="" className="mt-8 aspect-video w-full rounded-2xl object-cover"/>}<div className="prose mt-10 max-w-none whitespace-pre-wrap leading-8">{blog.content}</div><Link className="btn2 mt-10" to="/resources">Back to Resources</Link></article>}

const procurementChallenges=[
  [School,'Challenges Faced by Schools',['Difficulty identifying reliable and verified Industry Associates','Time-consuming quotation and Industry Associates-comparison processes','Uncertainty about product quality, pricing, and after-sales support','Delays in receiving essential academic, laboratory, sports, safety, transport, and infrastructure materials','Limited access to suitable new, pre-owned, rental, lease, or shared-use options','Difficulty communicating urgent or bulk material requirements to multiple suppliers']],
  [PackageOpen,'Challenges Faced by Industry Associates',['Difficulty reaching the right schools and decision-makers','Limited visibility beyond local markets','High marketing and customer-acquisition effort','Lack of clear information about current school requirements','Difficulty presenting products and services to multiple institutions','Delays in establishing trusted professional connections with schools']],
  [Handshake,'The Prism Edu Solution',['Connects schools with relevant school-material Industry Associates','Supports smooth communication between demand and supply sides','Helps schools share specific, bulk, and urgent requirements','Provides visibility for available, required, sale, resale, lease, and shared materials','Supports access to multiple product categories through one coordinated platform']],
];

function MaterialsPage({onAdd,cartCount}){return <>
  <section className="material-page-hero bg-[#052e4b] py-4 sm:py-6" aria-label="School Material Marketplace"><div className="mx-auto max-w-[1600px] px-3 sm:px-5"><img src="/images/prism-official/school-material-marketplace-hero.jpg" alt="School Material Marketplace with books, stationery, laboratory equipment, sports goods, school bag and school bus" width="1600" height="245" fetchPriority="high" className="w-full rounded-2xl object-contain shadow-[0_20px_55px_rgba(0,17,38,.3)]"/><div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row"><a className="btn" href="#material-listings">Browse Materials <ArrowRight size={16}/></a><Link className="btn2 border-white/30 bg-white/10 text-white" to="/school-materials/order">Submit Material Requirement</Link><Link className="btn2 border-white/30 bg-white/10 text-white" to="/school-materials/list">List School Materials</Link></div></div></section>
  <section className="material-procurement-section py-16 md:py-24" aria-labelledby="procurement-title"><div className="wrap"><div className="mx-auto max-w-4xl text-center"><span className="eyebrow">SCHOOL–Industry Associates NETWORK</span><PrismSectionHeading as="h1" id="procurement-title" className="title">Making School Procurement Simpler and Better Connected</PrismSectionHeading><SectionSubtitle className="mt-5 text-lg leading-8 text-slate-600">Schools often require a wide range of quality materials from dependable Industry Associates, while Industry Associates need an effective way to reach genuine educational institutions. Prism Edu Consultancy helps bridge this gap through a practical school material demand-and-supply network.</SectionSubtitle></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{procurementChallenges.map(([Icon,title,points],index)=><article key={title} className={'procurement-card procurement-card-'+(index+1)}><span className="procurement-icon"><Icon size={25}/></span><h2>{title}</h2><ul>{points.map(point=><li key={point}><CheckCircle2 size={16}/><span>{point}</span></li>)}</ul></article>)}</div></div></section>
  <MaterialShop onAdd={onAdd} cartCount={cartCount}/>
  <IndustryAssociates/>
</>}


function SiteLoader({leaving}){return <div className={'site-loader '+(leaving?'is-leaving':'')} role="status" aria-live="polite" aria-label="Loading Prism Edu Consultancy"><div className="loader-content"><div className="loader-prism"><span className="loader-point" aria-hidden="true"/><svg className="loader-triangle" viewBox="0 0 240 220" fill="none" aria-hidden="true"><path pathLength="1" d="M120 14L225 200"/><path pathLength="1" d="M225 200H15"/><path pathLength="1" d="M15 200L120 14"/></svg><span className="loader-spectrum" aria-hidden="true"/><img className="loader-logo" src={PRISM_LOGO_URL} alt="Prism" fetchPriority="high"/></div><p className="loader-title">PRISM</p><p className="loader-subtitle">Edu Consultancy</p><p className="loader-tagline">Supporting Education Institutions from Vision to Growth.</p><div className="loader-progress" aria-hidden="true"><span/></div></div></div>}
function App() {
  const [showLoader,setShowLoader]=useState(true),[loaderLeaving,setLoaderLeaving]=useState(false);
  const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('prism-material-cart')||'[]')}catch{return[]}});
  useEffect(()=>localStorage.setItem('prism-material-cart',JSON.stringify(cart)),[cart]);
  useEffect(()=>{
    const minimumDuration=1500,maximumDuration=3000,fadeDuration=300;
    const started=performance.now();
    let disposed=false,finished=false,minimumTimer,removeTimer;
    const finish=()=>{if(disposed||finished)return;finished=true;clearTimeout(deadline);clearTimeout(minimumTimer);setLoaderLeaving(true);removeTimer=setTimeout(()=>{if(!disposed)setShowLoader(false)},fadeDuration)};
    // Include the fade in the maximum lifetime.
    const deadline=setTimeout(finish,maximumDuration-fadeDuration);
    const images=[...document.images].filter(image=>image.classList.contains('loader-logo')||(image.loading!=='lazy'&&image.getBoundingClientRect().top<innerHeight));
    const assets=images.map(image=>image.decode?image.decode().catch(()=>{}):Promise.resolve());
    if(document.fonts)assets.push(document.fonts.ready);
    Promise.allSettled(assets).then(()=>{if(disposed||finished)return;const remaining=minimumDuration-(performance.now()-started);if(remaining<=0)finish();else minimumTimer=setTimeout(finish,remaining)});
    return()=>{disposed=true;clearTimeout(deadline);clearTimeout(minimumTimer);clearTimeout(removeTimer)};
  },[]);
  const addToCart=item=>setCart(items=>{const found=items.find(x=>x.id===item.id);return found?items.map(x=>x.id===item.id?{...x,cartQty:x.cartQty+1}:x):[...items,{...item,cartQty:1}]});
  const cartCount=cart.reduce((total,item)=>total+item.cartQty,0);
  return (<>
    {showLoader&&<SiteLoader leaving={loaderLeaving}/>}<Layout cartCount={cartCount}>
      <Routes>
        <Route path="/our-clients" element={<ClientsSection standalone />} />
        <Route
          path="/"
          element={
            <div className="home-page">
              <HeroRedesign />
              <AboutPrismPreview />
              <Ecosystem />
              <PracticalStart />
              <ServicesShowcase />
              <TrainingWorkshops />
              <HomeProperties />
              <MaterialShop home onAdd={addToCart} cartCount={cartCount} />
              <EduHelpline />
              <WorkProcess />
              <FinalVisionCTA />
            </div>
          }
        />

        <Route
          path="/about"
          element={<AboutRedesign />}
        />

        <Route
          path="/services"
          element={
            <>
              <ServicesRedesign />
              <ServicesClosing />
            </>
          }
        />
        <Route path="/services/website-quotation" element={<WebsiteQuotationPage />} />
        <Route path="/business-meeting" element={<PremiumMeetingPage />} />

        <Route
          path="/school-properties"
          element={<SchoolPropertiesPage />}
        />

        <Route path="/school-properties/:id" element={<PropertiesDetailsPage />} />

        <Route path="/school-properties/list" element={<PropertiesSubmission key="available" type="Properties Available"/>}/>
        <Route path="/school-properties/requirement" element={<PropertiesSubmission key="required" type="Properties Required"/>}/>

        <Route
          path="/start-a-school"
          element={
            <Hero
              label="START A SCHOOL"
              title="Turn Your School Idea Into Reality"
              text="End-to-end support for planning and launching your school."
            />
          }
        />

        <Route
          path="/licensing-affiliation"
          element={
            <section className="wrap py-16">
              <Head
                label="LICENSING"
                title="School Licensing and Affiliation"
              />

              <Cards items={lic} icons />
            </section>
          }
        />

        <Route
          path="/school-growth"
          element={
            <section className="wrap py-16">
              <Head
                label="SCHOOL GROWTH"
                title="Grow Your School With Confidence"
              />

              <Cards items={grow} />
            </section>
          }
        />

        <Route
          path="/partner-with-prism"
          element={
            <Hero
              label="PARTNERSHIP"
              title="Partner With Prism Edu"
              text="Collaborate with us to transform and grow your school."
            />
          }
        />

        <Route path="/events-awards" element={<EventsAwardsPage />} />

        <Route
          path="/resources"
          element={<ResourcesPage />}
        />
        <Route path="/resources/blog/:slug" element={<ResourceBlogPage />} />

        <Route path="/school-materials" element={<MaterialsPage onAdd={addToCart} cartCount={cartCount} />} />
        <Route path="/school-materials/cart" element={<MaterialCart cart={cart} setCart={setCart} />} />
        <Route path="/school-materials/:id" element={<MaterialDetails onAdd={addToCart} />} />

        <Route
          path="/school-materials/list"
          element={
            <section className="wrap py-16">
              <Head label="SCHOOL MATERIAL MARKETPLACE" title="Lease / List School Materials" text="List school materials available to sell, lease or offer to another school." />
              <Form title="Share your material details" fields={["Material category", "Item / equipment name", "Quantity or specification", "Sale / Lease preference", "Condition", "Message"]} />
            </section>
          }
        />

        <Route
          path="/school-materials/order"
          element={
            <section className="wrap py-16">
              <Head label="SCHOOL MATERIAL MARKETPLACE" title="Order School Materials" text="Submit a purchase, lease, sourcing or bulk quotation requirement." />
              <Form title="Tell us what your school needs" fields={["Material category", "Required item", "Quantity or specification", "Buy / Lease preference", "Required by", "Message"]} />
            </section>
          }
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route path="/admin/*" element={<PropertiesAdmin/>} />
        <Route path="/account" element={<AccountPage/>} />
      </Routes>
    </Layout></>
  );
}

export default App;
