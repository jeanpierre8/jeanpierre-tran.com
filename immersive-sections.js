/* Independent background planes follow each section, not extra pages. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const scenes=[
  ['#expertise','expertise','<div class="im-ex-grid"></div><div class="im-ex-beam"></div><div class="im-ex-constellation"><i></i><i></i><i></i><i></i></div>'],
  ['#experience','experience','<div class="im-exp-ray"></div><div class="im-exp-orbit a"></div><div class="im-exp-orbit b"></div><div class="im-exp-points"><i></i><i></i><i></i></div>'],
  ['#projet','project','<div class="im-prism a"></div><div class="im-prism b"></div><div class="im-prism c"></div><div class="im-proj-rays"></div>'],
  ['#parcours','journey','<svg class="im-route" viewBox="0 0 1200 700" preserveAspectRatio="none"><path d="M-50 570 C 180 610 130 320 420 370 S 790 130 1250 110" fill="none"/><circle cx="420" cy="370" r="5"/><circle cx="770" cy="224" r="5"/><circle cx="1060" cy="139" r="5"/></svg>'],
  ['#contact','contact','<div class="im-contact-atmosphere"></div><div class="im-contact-crescent"></div><div class="im-contact-light"></div>']
 ];
 const targets=[];
 scenes.forEach(([selector,name,markup])=>{let section=document.querySelector(selector);if(!section)return;let el=document.createElement('div');el.className='im-depth im-'+name;el.setAttribute('aria-hidden','true');el.innerHTML=markup;section.insertBefore(el,section.firstChild);targets.push([section,el])});
 let pending=false;
 function draw(){pending=false;if(reduce.matches){targets.forEach(([,e])=>e.removeAttribute('style'));return}const h=innerHeight;targets.forEach(([section,el])=>{let r=section.getBoundingClientRect();if(r.bottom < -h*.25||r.top>h*1.25)return;let p=Math.max(0,Math.min(1,(h-r.top)/(h+r.height)));let q=p-.5;el.style.setProperty('--im-x',`${q*140}px`);el.style.setProperty('--im-y',`${q*-150}px`);el.style.setProperty('--im-rev',`${q*130}px`);el.style.setProperty('--im-angle',`${q*32}deg`);el.style.setProperty('--im-fill',`${Math.max(0,Math.min(1,p*1.8))}`);el.style.setProperty('--im-light',`${35+p*40}%`)})}
 function request(){if(!pending){pending=true;requestAnimationFrame(draw)}}addEventListener('scroll',request,{passive:true});addEventListener('resize',request);reduce.addEventListener?.('change',request);request();
})();
