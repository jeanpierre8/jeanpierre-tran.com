(()=>{
 const hero=document.querySelector('.hero');if(!hero||hero.querySelector('.voyage-stage'))return;
 const stage=document.createElement('div');stage.className='voyage-stage';
 while(hero.firstChild)stage.appendChild(hero.firstChild);hero.appendChild(stage);hero.classList.add('voyage-ready');
 const lens=document.createElement('div');lens.className='voyage-lens';lens.setAttribute('aria-hidden','true');const text=stage.querySelector('.hero-inner');stage.insertBefore(lens,text);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let queued=false;
 const clamp=n=>Math.max(0,Math.min(1,n));
 function draw(){queued=false;if(reduced.matches){hero.style.removeProperty('--v-camera-scale');hero.style.removeProperty('--v-station-scale');hero.style.removeProperty('--v-star-opacity');hero.style.removeProperty('--v-lens-opacity');return}const rect=hero.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const pinned=Math.max(0,rect.height-stage.getBoundingClientRect().height);const p=clamp(-rect.top/(pinned>30?pinned:rect.height));const ease=1-Math.pow(1-p,2);hero.style.setProperty('--v-camera-scale',`${1+ease*.38}`);hero.style.setProperty('--v-station-scale',`${1+ease*.13}`);hero.style.setProperty('--v-star-opacity',`${Math.sin(Math.PI*p)*.88}`);hero.style.setProperty('--v-lens-opacity',`${Math.sin(Math.PI*p)*.72}`);hero.style.setProperty('--v-lens-scale',`${1+ease*.35}`);}

 function schedule(){if(!queued){queued=true;requestAnimationFrame(draw)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener?.('change',schedule);schedule();
})();
