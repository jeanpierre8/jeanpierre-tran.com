(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const clamp=n=>Math.min(1,Math.max(0,n));
 const bars=[...document.querySelectorAll('.data-art i')], ai=document.querySelector('.orbit-art'),wave=document.querySelector('.wave-art'),screen=document.querySelector('.signal-screen'),card=document.querySelector('.project-card'),timeline=document.querySelector('.timeline');
 if(screen&&!screen.querySelector('.sm-signal-scan')){const el=document.createElement('span');el.className='sm-signal-scan';el.setAttribute('aria-hidden','true');screen.append(el)}
 if(card&&!card.querySelector('.sm-project-glow')){const el=document.createElement('span');el.className='sm-project-glow';el.setAttribute('aria-hidden','true');card.append(el)}
 if(timeline&&!timeline.querySelector('.sm-timeline-track')){const el=document.createElement('span');el.className='sm-timeline-track';el.setAttribute('aria-hidden','true');timeline.prepend(el)}
 const elements=[...bars,ai,wave,screen,card,timeline].filter(Boolean);let waiting=false;
 function progress(el){const r=el.getBoundingClientRect();return clamp((innerHeight*.92-r.top)/(innerHeight*.58+Math.min(r.height,innerHeight*.25)))}
 function update(){waiting=false;if(reduced.matches){elements.forEach(el=>{['--sm-bar','--sm-ai','--sm-signal','--sm-project','--sm-track'].forEach(v=>el.style.removeProperty(v))});timeline?.querySelectorAll('article').forEach(el=>el.style.removeProperty('--sm-node'));return}
 bars.forEach((bar,i)=>{const p=progress(bar.parentElement);bar.style.setProperty('--sm-bar',String(.12+.88*clamp((p-i*.065)/.55)))});
 if(ai)ai.style.setProperty('--sm-ai',progress(ai));if(wave)wave.style.setProperty('--sm-signal',progress(wave));if(screen)screen.style.setProperty('--sm-signal',progress(screen));if(card)card.style.setProperty('--sm-project',progress(card));
 if(timeline){const r=timeline.getBoundingClientRect();const q=clamp((innerHeight*.72-r.top)/Math.max(1,r.height));timeline.style.setProperty('--sm-track',q);timeline.querySelectorAll('article').forEach(row=>{const rr=row.getBoundingClientRect();row.style.setProperty('--sm-node',clamp((innerHeight*.8-rr.top)/(innerHeight*.15)))})}}
 function schedule(){if(!waiting){waiting=true;requestAnimationFrame(update)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener?.('change',schedule);schedule();
})();
