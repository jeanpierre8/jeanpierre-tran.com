(()=>{
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const enabled=()=>fine.matches&&!reduced.matches;
 const configs=[['.hero','hero'],['.expertise-item','card'],['.exp-art','signal'],['.project-card','project']];
 const targets=[];
 for(const [selector,kind] of configs){
  document.querySelectorAll(selector).forEach(el=>{
   const parent=kind==='hero'?(el.querySelector('.voyage-stage')||el):el;
   if(!parent)return;
   const overlay=document.createElement('div');overlay.className=`hs-layer hs-${kind}`;overlay.setAttribute('aria-hidden','true');
   overlay.innerHTML=kind==='hero'?'<span class="hs-light"></span><span class="hs-arc hs-arc-a"></span><span class="hs-arc hs-arc-b"></span>':'<span class="hs-light"></span><span class="hs-orbit"><i></i><i></i></span><span class="hs-line"></span>';
   if(kind==='hero'){const before=parent.querySelector('.hero-inner');parent.insertBefore(overlay,before||null)}else parent.appendChild(overlay);
   const experienceSignal=kind==='signal'&&!!el.closest('.detail-page #experience');
   const homeHover=!document.body.classList.contains('detail-page')&&(kind==='hero'||kind==='card');
   const trackedByFrame=experienceSignal||homeHover;
   let raf=0,nextX=0,nextY=0,clientX=0,clientY=0;
   function draw(){raf=0;if(!enabled())return;if(trackedByFrame){const box=el.getBoundingClientRect();if(!box.width||!box.height)return;nextX=Math.max(0,Math.min(100,(clientX-box.left)/box.width*100));nextY=Math.max(0,Math.min(100,(clientY-box.top)/box.height*100))}el.style.setProperty('--hs-x',`${nextX}%`);el.style.setProperty('--hs-y',`${nextY}%`);el.style.setProperty('--hs-tilt-x',`${(nextY-50)*-.22}deg`);el.style.setProperty('--hs-tilt-y',`${(nextX-50)*.22}deg`);el.style.setProperty('--hs-shift-x',`${(nextX-50)*.30}px`);el.style.setProperty('--hs-shift-y',`${(nextY-50)*.25}px`);if(homeHover&&kind==='card'){el.style.setProperty('--xp-mouse-x',`${nextX}%`);el.style.setProperty('--xp-mouse-y',`${nextY}%`);el.style.setProperty('--xp-glow','1')}}
   function clear(reset=false){if(raf)cancelAnimationFrame(raf);raf=0;el.classList.remove('hs-active');if(homeHover&&kind==='card')el.style.setProperty('--xp-glow','0');if(!trackedByFrame||reset)['--hs-x','--hs-y','--hs-tilt-x','--hs-tilt-y','--hs-shift-x','--hs-shift-y'].forEach(x=>el.style.removeProperty(x))}
   function move(event){if(!enabled()||event.pointerType==='touch')return;if(trackedByFrame){clientX=event.clientX;clientY=event.clientY}else{const box=el.getBoundingClientRect();if(!box.width||!box.height)return;nextX=Math.max(0,Math.min(100,(event.clientX-box.left)/box.width*100));nextY=Math.max(0,Math.min(100,(event.clientY-box.top)/box.height*100))}el.classList.add('hs-active');if(!raf)raf=requestAnimationFrame(draw)}
   if(trackedByFrame)el.addEventListener('pointerenter',move,{passive:true});
   el.addEventListener('pointermove',move,{passive:true});
   el.addEventListener('pointerleave',()=>clear(),{passive:true});el.addEventListener('pointercancel',()=>clear(),{passive:true});targets.push(()=>clear(true));
  });
 }
 function resetIfDisabled(){if(!enabled())targets.forEach(clear=>clear())}
 fine.addEventListener?.('change',resetIfDisabled);reduced.addEventListener?.('change',resetIfDisabled);
})();
