/* A lightweight 3D star field projected over the existing station scene. */
(()=>{
 const hero=document.querySelector('.hero'), stage=hero?.querySelector('.voyage-stage');
 if(!hero||!stage||stage.querySelector('.flight-canvas'))return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const canvas=document.createElement('canvas');canvas.className='flight-canvas';canvas.setAttribute('aria-hidden','true');
 const hud=document.createElement('div');hud.className='flight-hud';hud.setAttribute('aria-hidden','true');hud.innerHTML='<div class="flight-corner a"></div><div class="flight-corner b"></div><div class="flight-corner c"></div><div class="flight-corner d"></div><div class="flight-target"><i></i><i></i><i></i></div><div class="flight-sweep"></div>';
 const anchor=stage.querySelector('.hero-inner');stage.insertBefore(canvas,anchor);stage.insertBefore(hud,anchor);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let width=0,height=0,frame=0,onscreen=true,prev=0,elapsed=0,p=0,lastP=0,velocity=0;let seed=8391;const rand=()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646};
 const stars=Array.from({length:200},()=>({x:(rand()-.5)*3,y:(rand()-.5)*1.9,z:.06+rand()*.94,size:.45+rand()*1.0,glow:rand()>.84,phase:rand()*6.28}));
 const clamp=v=>Math.max(0,Math.min(1,v));
 function resize(){const box=stage.getBoundingClientRect();width=box.width;height=box.height;const d=Math.min(devicePixelRatio||1,1.4);canvas.width=Math.round(width*d);canvas.height=Math.round(height*d);ctx.setTransform(d,0,0,d,0,0)}
 function tick(ms){frame=0;if(reduce.matches||document.hidden||!onscreen)return;const box=hero.getBoundingClientRect();if(box.bottom<=0||box.top>=innerHeight)return;const pin=Math.max(0,box.height-stage.getBoundingClientRect().height);const next=clamp(-box.top/(pin>30?pin:box.height));const dt=Math.min(.04,(ms-(prev||ms))/1000);prev=ms;elapsed+=dt;velocity+=(Math.abs(next-lastP)-velocity)*.16;lastP=next;p+=(next-p)*.12;
  hero.style.setProperty('--flight-active',String(Math.sin(Math.PI*p)*.75));hero.style.setProperty('--flight-hud-opacity',String(.22+Math.sin(Math.PI*p)*.45));hero.style.setProperty('--flight-hud-angle',`${p*16}deg`);hero.style.setProperty('--flight-hud-scale',String(1+p*.12));
  ctx.clearRect(0,0,width,height);const cx=width*(width<800?.73:.76),cy=height*.38;const focal=Math.min(width,height)*.4;const count=width<800?90:200;const travel=p*1.55+elapsed*.018;
  for(let i=0;i<count;i++){const a=stars[i],z=((a.z-travel)%1+1)%1*.91+.09;const px=cx+a.x*focal/z,py=cy+a.y*focal/z;if(px < -80||px>width+80||py < -80||py>height+80)continue;const dx=px-cx,dy=py-cy,dist=Math.hypot(dx,dy)||1;const streak=(2+Math.min(70,velocity*5500)+p*34)*(.28+1-z);const alpha=(1-z)*.66+.13;ctx.strokeStyle=`rgba(${a.glow?'244,220,186':'185,231,245'},${alpha})`;ctx.lineWidth=a.size*(1-z*.35);ctx.beginPath();ctx.moveTo(px-dx/dist*streak,py-dy/dist*streak);ctx.lineTo(px,py);ctx.stroke();if(a.glow&&z<.38){ctx.fillStyle=`rgba(212,243,248,${alpha*.7})`;ctx.beginPath();ctx.arc(px,py,1.2,0,Math.PI*2);ctx.fill()}}
  frame=requestAnimationFrame(tick)}
 function stop(){cancelAnimationFrame(frame);frame=0;prev=0}
 function start(){if(!reduce.matches&&!document.hidden&&onscreen&&!frame){resize();frame=requestAnimationFrame(tick)}}
 addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>{document.hidden?stop():start()});reduce.addEventListener?.('change',()=>{if(reduce.matches){stop();ctx.clearRect(0,0,width,height)}else start()});
 if('IntersectionObserver'in window){new IntersectionObserver(entries=>{onscreen=entries.some(e=>e.isIntersecting);onscreen?start():stop()},{threshold:0}).observe(hero)}
 resize();start();
})();
