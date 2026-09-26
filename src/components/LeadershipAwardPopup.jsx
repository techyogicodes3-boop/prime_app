import {useEffect,useRef,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {X} from 'lucide-react';

const STORAGE_KEY='prism-principals-school-leadership-award-seen';
const POSTER='/images/events-awards/principals-education-leaders-invitation.jpeg';
const REGISTRATION_DESTINATION='/contact?enquiry=events-awards';

let shownThisSession=false;
export default function LeadershipAwardPopup(){
  const {pathname}=useLocation();
  const[open,setOpen]=useState(false);
  const closeButtonRef=useRef(null),dialogRef=useRef(null),previousFocusRef=useRef(null);
  useEffect(()=>{
    if(pathname!=='/'){setOpen(false);return}
    try{if(sessionStorage.getItem(STORAGE_KEY))return}catch{}
    if(shownThisSession)return;
    let timer;
    const check=()=>{
      if(document.querySelector('.site-loader'))return;
      window.clearInterval(poll);
      timer=window.setTimeout(()=>{shownThisSession=true;try{sessionStorage.setItem(STORAGE_KEY,'true')}catch{}previousFocusRef.current=document.activeElement;setOpen(true)},200);
    };
    const poll=window.setInterval(check,100);check();
    return()=>{window.clearInterval(poll);window.clearTimeout(timer)};
  },[pathname]);
  useEffect(()=>{
    if(!open)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown=event=>{
      if(event.key==='Escape'){setOpen(false);return}
      if(event.key!=='Tab')return;
      const focusable=dialogRef.current?.querySelectorAll('a[href],button:not([disabled])');
      if(!focusable?.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    };
    document.addEventListener('keydown',handleKeyDown);
    return()=>{document.removeEventListener('keydown',handleKeyDown);document.body.style.overflow=previousOverflow;previousFocusRef.current?.focus?.()};
  },[open]);
  if(!open)return null;
  return <div className="leadership-award-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}>
    <div ref={dialogRef} className="leadership-award-dialog" role="dialog" aria-modal="true" aria-labelledby="leadership-award-popup-title">
      <h2 id="leadership-award-popup-title" className="sr-only">Principals and School Leadership Award announcement</h2>
      <button ref={closeButtonRef} type="button" className="leadership-award-close" onClick={()=>setOpen(false)} aria-label="Close Principals and School Leadership Award announcement"><X aria-hidden="true"/></button>
      <Link className="leadership-award-poster-link" to={REGISTRATION_DESTINATION} onClick={()=>setOpen(false)} aria-label="Register your interest for the Principals and School Leadership Award">
        <img src={POSTER} alt="Prism Edu Consultancy Principals and School Leadership Award event" width="1024" height="1536" fetchPriority="high"/>
      </Link>
    </div>
  </div>;
}
