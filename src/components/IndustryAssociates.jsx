import {useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {Armchair,Shirt,Backpack,BookOpen,Printer,Monitor,Computer,Settings,FlaskConical,Calculator,Bot,Library,Trophy,Trees,Palette,Music,Baby,ShieldCheck,Brush,Zap,Building2,Presentation,Bus,MapPin,Utensils,Droplets,Flower2,Flag,Award,ArrowRight} from 'lucide-react';
import {SectionHeadingGroup} from './SectionHeading';
import './industry-associates.css';

const categories=[
  [Armchair,'School Furniture','Student desks, benches, chairs, teacher tables, office furniture, lockers and library furniture.'],
  [Shirt,'School Uniforms','Uniforms, PT dress, sweaters, ties, belts, badges and socks.'],
  [Backpack,'School Bags & Shoes','School bags, sports bags, school shoes and sports shoes.'],
  [BookOpen,'Books & Stationery','Textbooks, notebooks, diaries, registers, files, pens, pencils and art materials.'],
  [Printer,'Printing & Branding','School diaries, ID cards, certificates, brochures, prospectuses, banners and signage.'],
  [Monitor,'Smart Classroom','Interactive panels, smart boards, projectors, screens and audio systems.'],
  [Computer,'IT & Computer Solutions','Computers, laptops, printers, networking, servers, CCTV and biometric systems.'],
  [Settings,'Video Editing & Software','ERP, attendance, fee management, communication apps, LMS and examination software.'],
  [FlaskConical,'Science Laboratories','Physics, Chemistry, Biology and Composite Science laboratories, including equipment, chemicals and glassware.'],
  [Calculator,'Maths Lab','Maths kits, manipulatives, models and activity materials.'],
  [Bot,'Robotics & AI','Robotics kits, coding solutions, AI labs, STEM equipment and 3D printers.'],
  [Library,'Library','Books, library furniture, library software and digital library solutions.'],
  [Trophy,'Sports','Sports equipment, athletics, indoor and outdoor games, and sports flooring.'],
  [Trees,'Playground Development','Play equipment, swings, slides, synthetic turf, courts and safety flooring.'],
  [Palette,'Art & Craft','Colours, painting materials, craft kits, pottery and display materials.'],
  [Music,'Music','Musical instruments, sound systems and school band equipment.'],
  [Baby,'Pre-Primary','Montessori materials, toys, sensory equipment and activity furniture.'],
  [ShieldCheck,'Security & Safety','CCTV, fire extinguishers, fire alarms, access-control systems and safety equipment.'],
  [Brush,'Housekeeping','Cleaning equipment, chemicals, dustbins and washroom supplies.'],
  [Zap,'Electrical & Infrastructure','Electrical items, UPS systems, solar solutions, generators and lighting.'],
  [Building2,'School Construction','Civil contractors, architects, structural consultants and interior designers.'],
  [Presentation,'Classroom Display','Whiteboards, greenboards, noticeboards, pin-up boards and display systems.'],
  [Bus,'School Transport','School buses, GPS systems, vehicle tracking and bus-safety equipment.'],
  [MapPin,'Transport Management','Transport ERP, RFID, attendance and parent-tracking systems.'],
  [Utensils,'Canteen','Kitchen equipment, dining furniture, water purifiers and food-service equipment.'],
  [Droplets,'Water & Hygiene','RO systems, water coolers, sanitary solutions and hygiene products.'],
  [Flower2,'Propertiesscaping','Gardening, lawn development, plants and outdoor Propertiesscaping.'],
  [Flag,'Uniform & House Accessories','House T-shirts, caps, badges, scarves, belts and ties.'],
  [Award,'Awards & Events','Trophies, medals, certificates, event backdrops and stage materials.'],
];

export default function IndustryAssociates(){
  const ref=useRef(null);
  useEffect(()=>{
    const cards=[...ref.current.querySelectorAll('.associate-card')];
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    if(motion.matches||!window.IntersectionObserver)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.remove('associate-pending');observer.unobserve(entry.target)}
    }),{threshold:.08});
    cards.forEach(card=>{card.classList.add('associate-pending');observer.observe(card)});
    const reveal=()=>{if(motion.matches){cards.forEach(card=>card.classList.remove('associate-pending'));observer.disconnect()}};
    motion.addEventListener('change',reveal);
    return()=>{observer.disconnect();motion.removeEventListener('change',reveal)};
  },[]);
  return <section ref={ref} id="school-mart-industry-associates" className="mart-associates py-16 md:py-24" aria-label="Industry Associates"><div className="wrap">
    <SectionHeadingGroup title="Industry Associates" subtitle="We have a trusted network of Industry Associates in the following fields."/>
    <div className="associate-grid">{categories.map(([Icon,name,description],index)=><article className="associate-card" key={name}>
      <div className="associate-card-top"><span className="associate-icon"><Icon size={22} aria-hidden="true"/></span><span className="associate-number" aria-label={'Category '+(index+1)}>{String(index+1).padStart(2,'0')}</span></div>
      <h3>{name}</h3><p>{description}</p>
    </article>)}</div>
    <div className="associate-cta"><p>Looking for reliable products or professional services for your educational institution? Connect with Prism Edu Consultancy’s network of Industry Associates.</p><div><Link className="btn" to="/contact">Connect with an Industry Associate<ArrowRight size={16} aria-hidden="true"/></Link><Link className="btn2" to="/contact">Become an Industry Associate<ArrowRight size={16} aria-hidden="true"/></Link></div></div>
  </div></section>;
}
