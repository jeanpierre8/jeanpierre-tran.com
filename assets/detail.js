/* --- detail-pages.js --- */
(()=>{
 const button=document.getElementById('language');
 const query=new URLSearchParams(location.search).get('lang');
 let stored='fr';try{stored=localStorage.getItem('portfolio-language')||'fr'}catch(e){}
 let language=query==='en'||query==='fr'?query:(stored==='en'?'en':'fr');
 function render(){
  document.documentElement.lang=language;
  try{localStorage.setItem('portfolio-language',language)}catch(e){}
  document.querySelectorAll('[data-fr][data-en]').forEach(el=>{el.innerHTML=el.dataset[language]});
  button.innerHTML=language==='fr'?'FR <span>/ EN</span>':'EN <span>/ FR</span>';
  button.setAttribute('aria-label',language==='fr'?'FR / EN — Switch to English':'EN / FR — Passer en français');
  document.querySelector('nav').setAttribute('aria-label',language==='fr'?'Navigation des pages':'Page navigation');
  document.querySelectorAll('a[data-journey]').forEach(a=>a.href=language==='en'?'index.html?lang=en#parcours':'index.html#parcours');
  document.querySelectorAll('a[data-home]').forEach(a=>a.href=language==='en'?'index.html?lang=en#top':'index.html#top');
  document.querySelectorAll('a[data-detail-link]').forEach(a=>{const path=a.getAttribute('href').split('?')[0];a.href=path+(language==='en'?'?lang=en':'')});
  document.title=language==='en'?document.body.dataset.titleEn:document.body.dataset.titleFr;
 }
 button.addEventListener('click',()=>{language=language==='fr'?'en':'fr';render();try{const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(history.state,'',url)}catch(e){}});
 render();
})();
;
/* --- academic-effects.js --- */
(() => {
  const section = document.querySelector('.academic-projects');
  if (!section) return;

  // Decorative layers are kept separate from the content and never take focus.
  const space = document.createElement('div');
  space.className = 'academic-space';
  space.setAttribute('aria-hidden', 'true');
  const starfield = document.createElement('i');
  starfield.className = 'academic-starfield';
  const orbitOne = document.createElement('i');
  orbitOne.className = 'academic-orbit orbit-one';
  const orbitTwo = document.createElement('i');
  orbitTwo.className = 'academic-orbit orbit-two';
  space.append(starfield, orbitOne, orbitTwo);
  section.prepend(space);

  // Pause decorative motion while the section is away from the viewport.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      space.classList.toggle('space-active', entries.some(entry => entry.isIntersecting));
    }, { rootMargin: '120px 0px' }).observe(section);
  } else {
    space.classList.add('space-active');
  }

  const elements = [...section.querySelectorAll('.academic-heading, .academic-card')];
  const cards = [...section.querySelectorAll('.academic-card')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let observer;

  cards.forEach((card, index) => card.style.setProperty('--academic-index', String(index % 2)));

  function showAll() {
    elements.forEach(element => element.classList.add('is-visible'));
    observer?.disconnect();
  }

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(element => observer.observe(element));
    section.classList.add('effects-ready');
  } else {
    showAll();
  }

  // Keyboard navigation should never land on content that is still concealed.
  section.addEventListener('focusin', event => {
    const element = event.target.closest('.academic-card, .academic-heading');
    if (!element) return;
    element.classList.add('is-visible');
    observer?.unobserve(element);
  });

  function clearPointer(card) {
    card.style.removeProperty('--academic-x');
    card.style.removeProperty('--academic-y');
  }

  cards.forEach(card => {
    let frame = 0;
    let x = 50;
    let y = 50;
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      clearPointer(card);
    };
    card.addEventListener('pointermove', event => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      x = Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100));
      y = Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100));
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        card.style.setProperty('--academic-x', `${x}%`);
        card.style.setProperty('--academic-y', `${y}%`);
      });
    }, { passive: true });
    card.addEventListener('pointerleave', clear, { passive: true });
    card.addEventListener('pointercancel', clear, { passive: true });
  });

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) {
      showAll();
      cards.forEach(clearPointer);
    }
  });
})();
;
/* --- story-wow.js --- */
(()=>{
 const exp=document.querySelector('.exp-copy'), project=document.querySelector('.project-copy'), langButton=document.querySelector('#language');
 const fr={
  ivcTitle:'Explorer les outils de ma mission',ivcHint:'Choisissez un outil pour voir son rôle.',
  ivc:{dlt:['Journaux DLT','Examiner des journaux de diagnostic pour comprendre le comportement logiciel.'],pcap:['Captures PCAP','Observer les échanges réseau pour rechercher l’origine d’une anomalie.'],can:['Trames CAN','Simuler des échanges véhicule sur banc avec CANalyzer.']},
  demoTitle:'Illustration interactive',demoHint:'Deux exemples prédéfinis pour comprendre le principe du projet.',positive:'Exemple positif',negative:'Exemple négatif',positiveText:'« J’ai adoré ce produit. »',negativeText:'« Je suis déçu par ce service. »',positiveResult:'Positif',negativeResult:'Négatif',result:'Sentiment associé',demoNote:'Illustration : aucun modèle n’est exécuté ici.'
 },en={
  ivcTitle:'Explore tools used in my assignment',ivcHint:'Choose a tool to see its role.',
  ivc:{dlt:['DLT logs','Examine diagnostic logs to understand software behaviour.'],pcap:['PCAP captures','Inspect network exchanges to investigate the source of an issue.'],can:['CAN frames','Simulate vehicle communications on a test bench with CANalyzer.']},
  demoTitle:'Interactive illustration',demoHint:'Two preset examples illustrate the project’s principle.',positive:'Positive example',negative:'Negative example',positiveText:'“I loved this product.”',negativeText:'“I am disappointed with this service.”',positiveResult:'Positive',negativeResult:'Negative',result:'Associated sentiment',demoNote:'Illustration only: no model is running here.'
 };
 let selectedTool='dlt',selectedExample='positive';
 function lang(){return document.documentElement.lang==='en'?en:fr}
 function create(className){const el=document.createElement('div');el.className=className;return el}
 let tools,demo;
 if(exp){tools=create('story-tool');tools.innerHTML='<div class="story-top"><span class="story-kicker"></span><span class="story-indicator" aria-hidden="true"><i></i><i></i><i></i></span></div><p class="story-hint"></p><div class="story-controls" role="group"><button type="button" data-tool="dlt">DLT</button><button type="button" data-tool="pcap">PCAP</button><button type="button" data-tool="can">CAN</button></div><div class="story-tool-result" aria-live="polite" aria-atomic="true"><span class="story-pulse" aria-hidden="true"></span><div><strong></strong><p></p></div></div>';const list=exp.querySelector('.exp-list');if(list)list.after(tools);else exp.append(tools);tools.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selectedTool=b.dataset.tool;render()}))}
 if(project){demo=create('story-demo');demo.innerHTML='<div class="story-top"><span class="story-kicker"></span><span class="story-demo-index" aria-hidden="true">01 / 02</span></div><p class="story-hint"></p><div class="story-samples" role="group"><button type="button" data-example="positive"></button><button type="button" data-example="negative"></button></div><div class="story-demo-result" aria-live="polite" aria-atomic="true"><p class="story-sentence"></p><div class="story-answer"><span class="story-answer-label"></span><strong></strong></div></div><p class="story-note"></p>';project.append(demo);demo.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{selectedExample=b.dataset.example;render()}))}
 function render(){const t=lang();if(tools){tools.querySelector('.story-kicker').textContent=t.ivcTitle;tools.querySelector('.story-hint').textContent=t.ivcHint;tools.querySelector('.story-controls').setAttribute('aria-label',t.ivcTitle);tools.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===selectedTool)));const [title,description]=t.ivc[selectedTool];tools.querySelector('.story-tool-result strong').textContent=title;tools.querySelector('.story-tool-result p').textContent=description;tools.dataset.selected=selectedTool}
 if(demo){demo.querySelector('.story-kicker').textContent=t.demoTitle;demo.querySelector('.story-hint').textContent=t.demoHint;demo.querySelector('.story-samples').setAttribute('aria-label',t.demoTitle);demo.querySelectorAll('button').forEach(b=>{b.textContent=t[b.dataset.example];b.setAttribute('aria-pressed',String(b.dataset.example===selectedExample))});demo.querySelector('.story-sentence').textContent=t[selectedExample+'Text'];demo.querySelector('.story-answer-label').textContent=t.result;demo.querySelector('.story-answer strong').textContent=t[selectedExample+'Result'];demo.querySelector('.story-note').textContent=t.demoNote;demo.querySelector('.story-demo-index').textContent=selectedExample==='positive'?'01 / 02':'02 / 02';demo.dataset.selected=selectedExample}}
 langButton?.addEventListener('click',render);render();
})();
;
/* --- extra-motion.js --- */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const expertise=document.querySelector('#expertise'), exp=document.querySelector('#experience'), project=document.querySelector('#projet'), journey=document.querySelector('#parcours'), closing=document.querySelector('#contact');
 function add(parent,cls,html=''){if(!parent)return null;let node=parent.querySelector(`.${cls}`);if(node)return node;node=document.createElement('div');node.className=cls;node.setAttribute('aria-hidden','true');node.innerHTML=html;parent.append(node);return node}
 document.querySelectorAll('.expertise-item').forEach(el=>{add(el,'xp-card-light');let art=el.querySelector('.item-art');if(art)add(art,'xp-satellites','<i></i><i></i><i></i>')});
 add(document.querySelector('.exp-art'),'xp-radar','<span class="xp-radar-ring a"></span><span class="xp-radar-ring b"></span><span class="xp-radar-sweep"></span><span class="xp-radar-point p1"></span><span class="xp-radar-point p2"></span><span class="xp-radar-point p3"></span>');
 add(document.querySelector('.project-art'),'xp-project-orbit','<span class="xp-comet a"></span><span class="xp-comet b"></span><span class="xp-project-halo"></span>');
 add(document.querySelector('.timeline'),'xp-route','<span></span>');
 add(closing,'xp-closing-stars','<i></i><i></i><i></i><i></i><i></i><i></i><span></span>');
 const watched=[expertise,exp,project,journey,closing].filter(Boolean);
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('xp-active',entry.isIntersecting)),{rootMargin:'20% 0px'});watched.forEach(x=>io.observe(x))}else watched.forEach(x=>x.classList.add('xp-active'));
 let ticking=false;function draw(){ticking=false;if(reduced.matches)return;const vh=innerHeight;watched.forEach(section=>{const r=section.getBoundingClientRect();if(r.bottom<-vh*.2||r.top>vh*1.2)return;const p=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height)));section.style.setProperty('--xp-progress',p.toFixed(4));section.style.setProperty('--xp-spin',`${(p-.5)*110}deg`);section.style.setProperty('--xp-rise',`${(p-.5)*-85}px`);section.style.setProperty('--xp-drift',`${(p-.5)*90}px`)});if(journey){const t=journey.querySelector('.timeline');if(t){const r=t.getBoundingClientRect();const p=Math.max(0,Math.min(1,(vh*.75-r.top)/Math.max(1,r.height)));journey.style.setProperty('--xp-route-progress',p.toFixed(4))}}}function schedule(){if(!ticking){ticking=true;requestAnimationFrame(draw)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener?.('change',schedule);schedule();
})();
;
/* --- immersive-sections.js --- */
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
;
/* --- section-motion.js --- */
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
;
/* --- hover-space.js --- */
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
;
/* --- continuity-v2.js --- */
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
;
