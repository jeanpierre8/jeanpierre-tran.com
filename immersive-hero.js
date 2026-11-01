(()=>{
 const hero=document.querySelector('.hero');if(!hero)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const stream=document.createElement('div');stream.className='ih-stream';stream.setAttribute('aria-hidden','true');
 const bloom=document.createElement('div');bloom.className='ih-bloom';bloom.setAttribute('aria-hidden','true');
 // Deterministic positions avoid flicker or random movement on page load.
 let seed=137;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
 for(let i=0;i<24;i++){const line=document.createElement('i');line.style.setProperty('--x',`${34+random()*70}%`);line.style.setProperty('--y',`${8+random()*70}%`);line.style.setProperty('--length',`${15+random()*60}px`);line.style.setProperty('--alpha',`${.2+random()*.48}`);line.style.setProperty('--speed',`${.3+random()*.8}`);line.style.setProperty('--vertical',`${-.3+random()*.6}`);line.style.setProperty('--angle',`${-25+random()*50}deg`);stream.append(line)}
 const anchor=hero.querySelector('.hero-inner');hero.insertBefore(stream,anchor);hero.insertBefore(bloom,anchor);
 let queued=false;const clamp=n=>Math.max(0,Math.min(1,n));
 function draw(){queued=false;if(reduce.matches){['--ih-camera-scale','--ih-station-scale','--ih-stream-opacity','--ih-travel','--ih-bloom-opacity','--ih-bloom-scale'].forEach(k=>hero.style.removeProperty(k));return}const r=hero.getBoundingClientRect();const p=clamp(-r.top/Math.max(1,r.height));const ease=1-Math.pow(1-p,2);hero.style.setProperty('--ih-camera-scale',`${1+ease*.2}`);hero.style.setProperty('--ih-station-scale',`${1+ease*.14}`);hero.style.setProperty('--ih-stream-opacity',`${Math.sin(Math.PI*p)*.72}`);hero.style.setProperty('--ih-travel',`${ease*180}px`);hero.style.setProperty('--ih-bloom-opacity',`${Math.sin(Math.PI*p)*.7}`);hero.style.setProperty('--ih-bloom-scale',`${1+ease*.22}`)}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(draw)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener?.('change',schedule);schedule();
})();
