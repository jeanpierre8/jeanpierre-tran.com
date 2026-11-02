/* Keep a single field of stars and light moving with the page, across every section. */
(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const projectPage=!!document.querySelector('.academic-projects');
  const experiencePage=!!document.querySelector('.detail-page #experience');
  const optimizedDetail=projectPage||experiencePage;
  const optimizedScene=optimizedDetail||!!document.querySelector('main > .hero');
  const field=document.createElement('div');
  field.className='cosmic-continuity';field.setAttribute('aria-hidden','true');
  const canvas=document.createElement('canvas');field.append(canvas);document.body.prepend(field);
  const ctx=canvas.getContext('2d');
  const sections=[...document.querySelectorAll('main > .hero, main > .section, main > .closing')];
  const lights=[[75,35,12,78],[62,42,18,74],[23,42,85,70],[74,50,12,75],[40,30,80,78],[55,72,20,35]];
  let width=0,height=0,frame=0,singleLightApplied=false;
  let seed=7193;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
  const stars=Array.from({length:110},()=>({x:random(),y:random(),r:.35+random()*1.05,alpha:.14+random()*.48,depth:.025+random()*.055}));
  const ease=t=>{t=Math.min(1,Math.max(0,t));return t*t*(3-2*t)};
  function resize(){width=innerWidth;height=innerHeight;const maxDpr=width<=800?(optimizedScene?1.25:1.5):2;const dpr=Math.min(devicePixelRatio||1,maxDpr);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);schedule()}
  function draw(){
    frame=0;const scroll=window.scrollY||0;ctx.clearRect(0,0,width,height);
    const count=optimizedScene&&width<=800?85:stars.length;
    for(let i=0;i<count;i++){const s=stars[i];const y=((s.y*height-(reduced.matches?0:scroll*s.depth))%height+height)%height;ctx.globalAlpha=s.alpha;ctx.fillStyle='#c9edf3';ctx.beginPath();ctx.arc(s.x*width,y,s.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
    if(reduced.matches||!sections.length)return;
    // The experience page has one section, so its light positions never change.
    if(experiencePage&&sections.length===1&&singleLightApplied)return;
    const probe=scroll+height*.5;
    let index=0;
    while(index<sections.length-2 && probe>sections[index+1].offsetTop+sections[index+1].offsetHeight*.5) index++;
    const a=sections[index],b=sections[Math.min(index+1,sections.length-1)];
    const start=a.offsetTop+a.offsetHeight*.5,end=b.offsetTop+b.offsetHeight*.5;
    const t=ease((probe-start)/Math.max(1,end-start));
    const from=lights[Math.min(index,lights.length-1)],to=lights[Math.min(index+1,lights.length-1)];
    ['--cosmos-x','--cosmos-y','--cosmos-x2','--cosmos-y2'].forEach((key,i)=>field.style.setProperty(key,`${(from[i]+(to[i]-from[i])*t).toFixed(1)}%`));
    if(experiencePage&&sections.length===1)singleLightApplied=true;
  }
  function schedule(){if(optimizedScene&&document.hidden)return;if(!frame)frame=requestAnimationFrame(draw)}
  function onScroll(){if(!optimizedScene||!reduced.matches)schedule()}
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',resize,{passive:true});
  if(optimizedScene)document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else schedule()});
  reduced.addEventListener?.('change',()=>{if(reduced.matches){field.removeAttribute('style');singleLightApplied=false}schedule()});resize();
})();
