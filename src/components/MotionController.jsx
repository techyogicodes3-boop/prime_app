import {useLayoutEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MotionController(){
  const {pathname}=useLocation();
  useLayoutEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context=gsap.context(()=>{
      const targets=gsap.utils.toArray('main section').filter(section=>!section.closest('[role="dialog"]'));
      targets.forEach(target=>target.classList.add('gsap-reveal'));
      if(reduced){gsap.set(targets,{clearProps:'all'});return;}
      targets.forEach(target=>gsap.fromTo(target,{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:target,start:'top 88%',once:true}}));
    });
    const refresh=window.setTimeout(()=>ScrollTrigger.refresh(),120);
    return()=>{window.clearTimeout(refresh);context.revert();};
  },[pathname]);
  return null;
}
