(()=>{
 const root=document.querySelector('main');if(!root)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const layer=document.createElement('div');layer.className='ip-space';layer.setAttribute('aria-hidden','true');
 const canvas=document.createElement('canvas');canvas.className='ip-stars';layer.appendChild(canvas);
 const glow=document.createElement('div');glow.className='ip-nebula';layer.prepend(glow);root.prepend(layer);
 const ctx=canvas.getContext('2d');if(!ctx)return;let w=0,h=0,queued=false;let seed=48611;
 const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const stars=Array.from({length:145},()=>({x:(random()-.5)*2.4,y:(random()-.5)*1.8,z:.1+random()*.9,size:.4+random()*1.4,color:random()>.8?'warm':'cool'}));
 function resize(){const dpr=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);request()}
 function draw(){queued=false;ctx.clearRect(0,0,w,h);if(reduce.matches)return;const y=scrollY;const journey=Math.max(1,document.documentElement.scrollHeight-h);const p=Math.max(0,Math.min(1,y/journey));const behind=document.querySelector('.hero')?.getBoundingClientRect();const show=Math.max(0,Math.min(1,behind?1-behind.bottom/(h*.75):1));layer.style.setProperty('--ip-visible',show.toFixed(3));layer.style.setProperty('--ip-x',`${Math.sin(p*6.28)*55}px`);layer.style.setProperty('--ip-y',`${Math.cos(p*6.28)*45}px`);document.querySelectorAll('.section').forEach(section=>{const r=section.getBoundingClientRect();if(r.bottom < -h*.15 || r.top > h*1.15)return;const v=Math.max(0,Math.min(1,(h-r.top)/(h+r.height)));section.style.setProperty('--ip-shift',`${(v-.5)*-55}px`);section.style.setProperty('--ip-shift-reverse',`${(v-.5)*38}px`)});
 const count=w<800?75:145;for(let i=0;i<count;i++){let s=stars[i];let z=((s.z+y*.00010)%1+.05);let xp=w*.5+s.x*w*.55/z,yp=h*.5+s.y*h*.55/z;if(xp<-25||xp>w+25||yp<-25||yp>h+25)continue;let fade=Math.min(1,(z-.05)*8)*Math.min(1,(1.05-z)*9);let opacity=(.14+.34*(1-z))*fade;let r=Math.min(2.2,s.size*(1.1-z*.55));ctx.beginPath();ctx.fillStyle=s.color==='warm'?`rgba(235,191,150,${opacity})`:`rgba(169,219,232,${opacity})`;ctx.arc(xp,yp,r,0,Math.PI*2);ctx.fill();if(z<.40){let length=(.40-z)*14;let vx=xp-w*.5,vy=yp-h*.5,mag=Math.hypot(vx,vy)||1;ctx.strokeStyle=s.color==='warm'?`rgba(235,191,150,${opacity*.28})`:`rgba(169,219,232,${opacity*.28})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(xp-vx/mag*length,yp-vy/mag*length);ctx.lineTo(xp,yp);ctx.stroke()}}
 }
 function request(){if(!queued){queued=true;requestAnimationFrame(draw)}}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',resize,{passive:true});reduce.addEventListener?.('change',request);resize();
})();
