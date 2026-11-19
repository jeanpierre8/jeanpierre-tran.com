/* --- script.js --- */
(()=>{const lang=document.querySelector('#language');let current='fr';lang.addEventListener('click',()=>{current=current==='fr'?'en':'fr';document.documentElement.lang=current;document.querySelectorAll('[data-fr][data-en]').forEach(el=>{el.innerHTML=el.dataset[current]});lang.innerHTML=current==='fr'?'FR <span>/ EN</span>':'EN <span>/ FR</span>';lang.setAttribute('aria-label',current==='fr'?'FR / EN — Switch to English':'EN / FR — Passer en français');document.querySelector('nav').setAttribute('aria-label',current==='fr'?'Navigation principale':'Main navigation')});const reduce=matchMedia('(prefers-reduced-motion: reduce)');const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){try{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});items.forEach(el=>observer.observe(el));items.forEach(el=>{const rect=el.getBoundingClientRect();if(rect.top>=innerHeight||rect.bottom<=0)el.classList.add('reveal-pending')});document.addEventListener('focusin',e=>{const el=e.target.closest?.('.reveal');if(el){el.classList.add('visible');observer.unobserve(el)}})}catch(e){items.forEach(el=>{el.classList.add('visible');el.classList.remove('reveal-pending')})}}else items.forEach(el=>el.classList.add('visible'));const layers=[...document.querySelectorAll('[data-depth]')];let ticking=false;function update(){ticking=false;if(reduce.matches)return;const vh=innerHeight;layers.forEach(el=>{const rect=el.parentElement.getBoundingClientRect();if(rect.bottom<0||rect.top>vh)return;const progress=(rect.top+rect.height/2-vh/2)/vh;el.style.setProperty('--offset',`${progress*Number(el.dataset.depth)*160}px`)})}function request(){if(!ticking){ticking=true;requestAnimationFrame(update)}}addEventListener('scroll',request,{passive:true});addEventListener('resize',request);reduce.addEventListener?.('change',request);request()})();
;
/* --- motion.js --- */
(()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)');let queued=false;const clamp=n=>Math.max(0,Math.min(1,n));const sections=[...document.querySelectorAll('.section,.closing')];const hero=document.querySelector('.hero');function draw(){queued=false;if(reduce.matches)return;const vh=innerHeight;const hr=hero.getBoundingClientRect();const hp=clamp(-hr.top/Math.max(1,hr.height));hero.style.setProperty('--hero-zoom',1.025+hp*.1);hero.style.setProperty('--hero-copy-y',`${hp*-65}px`);hero.style.setProperty('--hero-copy-opacity',Math.max(.45,1-hp*.8));sections.forEach(section=>{const r=section.getBoundingClientRect();if(r.bottom < -vh*.2||r.top>vh*1.2)return;const p=clamp((vh-r.top)/(vh+r.height));const enter=clamp((vh-r.top)/(vh*.8));section.style.setProperty('--orbit-angle',`${(p-.3)*120}deg`);section.style.setProperty('--bar-fill',`${.45+enter*.55}`);section.style.setProperty('--signal-offset',`${(1-enter)*520}`);section.style.setProperty('--panel-rotate',`${(1-enter)*-9}deg`);section.style.setProperty('--panel-y',`${(1-enter)*35}px`);section.style.setProperty('--project-turn',`${(1-enter)*-12}deg`);section.style.setProperty('--project-tilt',`${(1-enter)*-3}deg`);section.style.setProperty('--project-y',`${(1-enter)*35}px`);section.querySelectorAll('.timeline article').forEach((row,i)=>{const rr=row.getBoundingClientRect();const q=clamp((vh-rr.top)/(vh*.28));row.style.setProperty('--timeline-x',`${(1-q)*24}px`);row.style.setProperty('--timeline-opacity',`${.35+q*.65}`)})})}function schedule(){if(!queued){queued=true;requestAnimationFrame(draw)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener?.('change',schedule);schedule()})();
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
/* --- transitions.js --- */
/* Animate the actual sections as they enter and leave the viewport. */
(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)');const sections=[...document.querySelectorAll('main > .section, main > .closing')];let queued=false;const clamp=n=>Math.max(0,Math.min(1,n));function draw(){queued=false;if(reduced.matches){sections.forEach(s=>{s.style.removeProperty('--section-enter-y');s.style.removeProperty('--section-enter-scale');s.style.removeProperty('--section-enter-opacity');s.style.removeProperty('--section-exit-opacity')});return}const h=innerHeight;sections.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom < -h*.25||r.top>h*1.25)return;const entrance=clamp((h-r.top)/(h*.76));const exit=clamp(r.bottom/(h*.5));const ease=1-Math.pow(1-entrance,3);s.style.setProperty('--section-enter-y',`${(1-ease)*100}px`);s.style.setProperty('--section-enter-scale',`${.94+ease*.06}`);s.style.setProperty('--section-enter-opacity',`${.35+ease*.65}`);s.style.setProperty('--section-exit-opacity',`${.5+exit*.5}`)})}function schedule(){if(!queued){queued=true;requestAnimationFrame(draw)}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener?.('change',schedule);schedule()})();
;
/* --- hero-wow.js --- */
(()=>{
 const hero=document.querySelector('.hero');if(!hero)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');const hover=matchMedia('(hover: hover) and (pointer: fine)');
 const stars=document.createElement('canvas');stars.className='wow-cosmos';stars.setAttribute('aria-hidden','true');
 const rings=document.createElement('div');rings.className='wow-orbits';rings.setAttribute('aria-hidden','true');rings.innerHTML='<i class="wow-orbit"></i><i class="wow-orbit"></i><i class="wow-orbit"></i>';
 const flare=document.createElement('div');flare.className='wow-flare';flare.setAttribute('aria-hidden','true');hero.insertBefore(stars,hero.querySelector('.hero-inner'));hero.insertBefore(rings,hero.querySelector('.hero-inner'));hero.insertBefore(flare,hero.querySelector('.hero-inner'));
 const ctx=stars.getContext('2d');if(!ctx)return;let width=0,height=0,raf=0,px=0,py=0,tx=0,ty=0,scrollProgress=0;let active=true,lastFrame=0;const points=[];let seed=25719;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 for(let i=0;i<85;i++)points.push({x:rand(),y:rand(),radius:.35+rand()*1.1,depth:.25+rand()*.75,phase:rand()*6.28,speed:.4+rand()*.9});
 function resize(){const rect=stars.parentElement.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,1.4);stars.width=Math.round(width*dpr);stars.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
 function step(ms){raf=0;if(!active||media.matches||document.hidden)return;if(ms-lastFrame<33){raf=requestAnimationFrame(step);return}lastFrame=ms;const rect=hero.getBoundingClientRect();if(rect.bottom<=0||rect.top>=innerHeight)return;const time=ms*.001;px+=(tx-px)*.035;py+=(ty-py)*.035;hero.style.setProperty('--wow-px',`${px*16}px`);hero.style.setProperty('--wow-py',`${py*12}px`);scrollProgress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height)));ctx.clearRect(0,0,width,height);const limit=width<800?48:85;for(let i=0;i<limit;i++){const p=points[i];const x=p.x*width+px*p.depth*25;const y=p.y*height+py*p.depth*18-scrollProgress*p.depth*60;const opacity=(.2+.6*(.5+.5*Math.sin(time*p.speed+p.phase)))*(.4+p.depth*.6);ctx.beginPath();ctx.fillStyle=`rgba(191,232,247,${opacity})`;ctx.arc(x,y,p.radius,0,Math.PI*2);ctx.fill()}
 // An occasional passing glint, kept away from the headline.
 const phase=(time%8)/8;if(phase<.22){const v=phase/.22;const x=width*(.68+v*.28),y=height*(.16+v*.13);const grad=ctx.createLinearGradient(x-55,y-17,x,y);grad.addColorStop(0,'rgba(177,220,240,0)');grad.addColorStop(1,`rgba(225,246,250,${Math.sin(v*Math.PI)*.7})`);ctx.strokeStyle=grad;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x-55,y-17);ctx.lineTo(x,y);ctx.stroke()}
 raf=requestAnimationFrame(step)}
 function start(){if(media.matches){active=false;cancelAnimationFrame(raf);raf=0;hero.style.removeProperty('--wow-px');hero.style.removeProperty('--wow-py');return}active=true;resize();if(!raf)raf=requestAnimationFrame(step)}
 hero.addEventListener('pointermove',e=>{if(!hover.matches||media.matches)return;const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5},{passive:true});hero.addEventListener('pointerleave',()=>{tx=0;ty=0},{passive:true});addEventListener('resize',resize,{passive:true});addEventListener('load',resize,{once:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});media.addEventListener?.('change',start);if('IntersectionObserver' in window){new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))start()},{threshold:0}).observe(hero)}start();
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
/* --- immersive-hero.js --- */
(()=>{
 const hero=document.querySelector('.hero');if(!hero)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const stream=document.createElement('div');stream.className='ih-stream';stream.setAttribute('aria-hidden','true');
 const bloom=document.createElement('div');bloom.className='ih-bloom';bloom.setAttribute('aria-hidden','true');
 // Deterministic positions avoid flicker or random movement on page load.
 let seed=137;const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};
 for(let i=0;i<24;i++){const line=document.createElement('i');line.style.setProperty('--x',`${34+random()*70}%`);line.style.setProperty('--y',`${8+random()*70}%`);line.style.setProperty('--length',`${15+random()*60}px`);line.style.setProperty('--alpha',`${.2+random()*.48}`);line.style.setProperty('--speed',`${.3+random()*.8}`);line.style.setProperty('--vertical',`${-.3+random()*.6}`);line.style.setProperty('--angle',`${-25+random()*50}deg`);stream.append(line)}
 const anchor=hero.querySelector('.hero-inner');hero.insertBefore(stream,anchor);hero.insertBefore(bloom,anchor);
 let queued=false,hiddenInVoyage;const clamp=n=>Math.max(0,Math.min(1,n));
 // Voyage hides these layers; retain the fallback if its stylesheet is unavailable.
 function layersHidden(){if(!hero.classList.contains('voyage-ready')){hiddenInVoyage=undefined;return false}if(hiddenInVoyage===undefined)hiddenInVoyage=getComputedStyle(stream).display==='none';return hiddenInVoyage}
 function draw(){queued=false;if(layersHidden())return;if(reduce.matches){['--ih-camera-scale','--ih-station-scale','--ih-stream-opacity','--ih-travel','--ih-bloom-opacity','--ih-bloom-scale'].forEach(k=>hero.style.removeProperty(k));return}const r=hero.getBoundingClientRect();const p=clamp(-r.top/Math.max(1,r.height));const ease=1-Math.pow(1-p,2);hero.style.setProperty('--ih-camera-scale',`${1+ease*.2}`);hero.style.setProperty('--ih-station-scale',`${1+ease*.14}`);hero.style.setProperty('--ih-stream-opacity',`${Math.sin(Math.PI*p)*.72}`);hero.style.setProperty('--ih-travel',`${ease*180}px`);hero.style.setProperty('--ih-bloom-opacity',`${Math.sin(Math.PI*p)*.7}`);hero.style.setProperty('--ih-bloom-scale',`${1+ease*.22}`)}
 function schedule(){if(layersHidden())return;if(!queued){queued=true;requestAnimationFrame(draw)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener?.('change',schedule);schedule();
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
/* --- voyage.js --- */
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
/* --- flight.js --- */
/* A lightweight 3D star field projected over the existing station scene. */
(()=>{
 const hero=document.querySelector('.hero'), stage=hero?.querySelector('.voyage-stage');
 if(!hero||!stage||stage.querySelector('.flight-canvas'))return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const canvas=document.createElement('canvas');canvas.className='flight-canvas';canvas.setAttribute('aria-hidden','true');
 const hud=document.createElement('div');hud.className='flight-hud';hud.setAttribute('aria-hidden','true');hud.innerHTML='<div class="flight-corner a"></div><div class="flight-corner b"></div><div class="flight-corner c"></div><div class="flight-corner d"></div><div class="flight-target"><i></i><i></i><i></i></div><div class="flight-sweep"></div>';
 const anchor=stage.querySelector('.hero-inner');stage.insertBefore(canvas,anchor);stage.insertBefore(hud,anchor);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let width=0,height=0,frame=0,onscreen=true,prev=0,elapsed=0,p=0,lastP=0,velocity=0,lastFrame=0;let seed=8391;const rand=()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646};
 const stars=Array.from({length:200},()=>({x:(rand()-.5)*3,y:(rand()-.5)*1.9,z:.06+rand()*.94,size:.45+rand()*1.0,glow:rand()>.84,phase:rand()*6.28}));
 const clamp=v=>Math.max(0,Math.min(1,v));
 function resize(){const box=stage.getBoundingClientRect();width=box.width;height=box.height;const d=Math.min(devicePixelRatio||1,1.4);canvas.width=Math.round(width*d);canvas.height=Math.round(height*d);ctx.setTransform(d,0,0,d,0,0)}
 function tick(ms){frame=0;if(reduce.matches||document.hidden||!onscreen)return;if(ms-lastFrame<33){frame=requestAnimationFrame(tick);return}lastFrame=ms;const box=hero.getBoundingClientRect();if(box.bottom<=0||box.top>=innerHeight)return;const pin=Math.max(0,box.height-stage.getBoundingClientRect().height);const next=clamp(-box.top/(pin>30?pin:box.height));const dt=Math.min(.04,(ms-(prev||ms))/1000);prev=ms;elapsed+=dt;velocity+=(Math.abs(next-lastP)-velocity)*.16;lastP=next;p+=(next-p)*.12;
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
;
/* --- immersion-plus.js --- */
(()=>{
 const root=document.querySelector('main');if(!root)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const layer=document.createElement('div');layer.className='ip-space';layer.setAttribute('aria-hidden','true');
 const canvas=document.createElement('canvas');canvas.className='ip-stars';layer.appendChild(canvas);
 const glow=document.createElement('div');glow.className='ip-nebula';layer.prepend(glow);root.prepend(layer);
 const ctx=canvas.getContext('2d');if(!ctx)return;let w=0,h=0,queued=false;let seed=48611;
 const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const stars=Array.from({length:145},()=>({x:(random()-.5)*2.4,y:(random()-.5)*1.8,z:.1+random()*.9,size:.4+random()*1.4,color:random()>.8?'warm':'cool'}));
 function resize(){w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,w<=800?1.25:1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);request()}
 function draw(){queued=false;ctx.clearRect(0,0,w,h);if(reduce.matches)return;const y=scrollY;const journey=Math.max(1,document.documentElement.scrollHeight-h);const p=Math.max(0,Math.min(1,y/journey));const behind=document.querySelector('.hero')?.getBoundingClientRect();const show=Math.max(0,Math.min(1,behind?1-behind.bottom/(h*.75):1));layer.style.setProperty('--ip-visible',show.toFixed(3));layer.style.setProperty('--ip-x',`${Math.sin(p*6.28)*55}px`);layer.style.setProperty('--ip-y',`${Math.cos(p*6.28)*45}px`);document.querySelectorAll('.section').forEach(section=>{const r=section.getBoundingClientRect();if(r.bottom < -h*.15 || r.top > h*1.15)return;const v=Math.max(0,Math.min(1,(h-r.top)/(h+r.height)));section.style.setProperty('--ip-shift',`${(v-.5)*-55}px`);section.style.setProperty('--ip-shift-reverse',`${(v-.5)*38}px`)});
 if(show<=0)return;
 const count=w<=800?60:145;for(let i=0;i<count;i++){let s=stars[i];let z=((s.z+y*.00010)%1+.05);let xp=w*.5+s.x*w*.55/z,yp=h*.5+s.y*h*.55/z;if(xp<-25||xp>w+25||yp<-25||yp>h+25)continue;let fade=Math.min(1,(z-.05)*8)*Math.min(1,(1.05-z)*9);let opacity=(.14+.34*(1-z))*fade;let r=Math.min(2.2,s.size*(1.1-z*.55));ctx.beginPath();ctx.fillStyle=s.color==='warm'?`rgba(235,191,150,${opacity})`:`rgba(169,219,232,${opacity})`;ctx.arc(xp,yp,r,0,Math.PI*2);ctx.fill();if(z<.40){let length=(.40-z)*14;let vx=xp-w*.5,vy=yp-h*.5,mag=Math.hypot(vx,vy)||1;ctx.strokeStyle=s.color==='warm'?`rgba(235,191,150,${opacity*.28})`:`rgba(169,219,232,${opacity*.28})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(xp-vx/mag*length,yp-vy/mag*length);ctx.lineTo(xp,yp);ctx.stroke()}}
 }
 function request(){if(!queued){queued=true;requestAnimationFrame(draw)}}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',resize,{passive:true});reduce.addEventListener?.('change',request);resize();
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
/* --- mobile-menu.js --- */
(()=>{
 const header=document.querySelector('.nav'), end=header?.querySelector('.nav-end'), original=header?.querySelector('nav'), lang=document.querySelector('#language');
 if(!header||!end||!original||header.querySelector('.mobile-menu-toggle'))return;
 const toggle=document.createElement('button');toggle.type='button';toggle.className='mobile-menu-toggle';toggle.setAttribute('aria-controls','mobile-site-menu');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<span class="mobile-menu-word">Menu</span><span class="mobile-menu-icon" aria-hidden="true"><i></i><i></i></span>';
 const menu=document.createElement('nav');menu.className='mobile-site-menu';menu.id='mobile-site-menu';menu.hidden=true;
 for(const source of original.querySelectorAll('a[href^="#"]')){const a=document.createElement('a');a.href=source.getAttribute('href');a.dataset.fr=source.dataset.fr||source.textContent;a.dataset.en=source.dataset.en||source.textContent;a.textContent=document.documentElement.lang==='en'?a.dataset.en:a.dataset.fr;menu.appendChild(a)}
 end.appendChild(toggle);header.appendChild(menu);
 const narrow=matchMedia('(max-width: 800px)');
 function labels(){const en=document.documentElement.lang==='en';const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-label',en?(open?'Close navigation menu':'Open navigation menu'):(open?'Fermer le menu de navigation':'Ouvrir le menu de navigation'));menu.setAttribute('aria-label',en?'Mobile navigation':'Navigation mobile');toggle.querySelector('.mobile-menu-word').textContent=en?(open?'Close':'Menu'):(open?'Fermer':'Menu')}
 function setOpen(open,restore=false){menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));header.classList.toggle('mobile-menu-open',open);labels();if(restore)toggle.focus()}
 toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
 menu.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){event.preventDefault();setOpen(false,true)}});
 document.addEventListener('pointerdown',event=>{if(!menu.hidden&&!header.contains(event.target))setOpen(false)});
 narrow.addEventListener?.('change',()=>{if(!narrow.matches&&!menu.hidden)setOpen(false)});
 function syncLanguage(){const en=document.documentElement.lang==='en';try{localStorage.setItem('portfolio-language',en?'en':'fr')}catch(_){}document.querySelectorAll('.timeline-detail-link[data-page]').forEach(a=>{a.href=a.dataset.page+(en?'?lang=en':'')});labels()}
 lang?.addEventListener('click',()=>{syncLanguage();try{const url=new URL(location.href);url.searchParams.set('lang',document.documentElement.lang==='en'?'en':'fr');history.replaceState(history.state,'',url)}catch(_){}});
 let preferred='fr';try{preferred=new URLSearchParams(location.search).get('lang')||localStorage.getItem('portfolio-language')||'fr'}catch(_){};
 if(preferred==='en'&&document.documentElement.lang!=='en')lang?.click();else syncLanguage();
})();
;
/* --- contact-extra.js --- */
(()=>{
 const container=document.querySelector('.closing-copy');
 const existing=container?.querySelector('a[href^="mailto:"]');
 if(!container||!existing||container.querySelector('.contact-direct'))return;
 const address='jeanpierre.tran.pro.fr@gmail.com';
 const text={
  fr:{label:'OU CONTACTEZ-MOI DIRECTEMENT',copy:'Copier',copyLabel:'Copier l’adresse e-mail',success:'Adresse copiée.',failure:'Copie indisponible : sélectionnez l’adresse pour la copier.'},
  en:{label:'OR CONTACT ME DIRECTLY',copy:'Copy',copyLabel:'Copy email address',success:'Email address copied.',failure:'Copy unavailable: select the address to copy it.'}
 };
 const wrap=document.createElement('div');wrap.className='contact-direct';
 const label=document.createElement('span');label.className='contact-direct-label';
 const row=document.createElement('div');row.className='contact-direct-row';
 const email=document.createElement('span');email.className='contact-direct-address';email.textContent=address;
 const button=document.createElement('button');button.type='button';button.className='contact-copy';
 const status=document.createElement('p');status.className='contact-copy-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 row.append(email,button);wrap.append(label,row,status);existing.insertAdjacentElement('afterend',wrap);
 let lastStatus='';
 function language(){return document.documentElement.lang==='en'?'en':'fr'}
 function render(){const t=text[language()];label.textContent=t.label;button.textContent=t.copy;button.setAttribute('aria-label',t.copyLabel);status.textContent=lastStatus?t[lastStatus]:''}
 button.addEventListener('click',async()=>{
  try{if(!navigator.clipboard?.writeText)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(address);lastStatus='success'}
  catch{lastStatus='failure'}
  render();
 });
 document.querySelector('#language')?.addEventListener('click',render);
 render();
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
/* --- touch-feedback.js --- */
/* A short touch response for the decorative skill cards; native scrolling stays untouched. */
(() => {
  const cards = document.querySelectorAll('.expertise-item');
  if (!cards.length || !('PointerEvent' in window)) return;

  const touches = new Set();
  let active = null;
  let releaseTimer = 0;

  function clear() {
    if (releaseTimer) clearTimeout(releaseTimer);
    releaseTimer = 0;
    if (!active) return;
    active.card.classList.remove('touch-active');
    // Keep the last position during the fade; the next touch replaces it.
    active = null;
  }

  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    // A second finger can mean a pinch, so stop the decorative response.
    if (touches.size) {
      touches.add(event.pointerId);
      clear();
      return;
    }
    touches.add(event.pointerId);
    clear();
    const card = event.target.closest?.('.expertise-item');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const clamp = n => Math.max(0, Math.min(100, n));
    card.style.setProperty('--touch-x', `${clamp((event.clientX - rect.left) / rect.width * 100)}%`);
    card.style.setProperty('--touch-y', `${clamp((event.clientY - rect.top) / rect.height * 100)}%`);
    active = { card, id: event.pointerId, x: event.clientX, y: event.clientY, started: performance.now() };
    card.classList.add('touch-active');
  }, { passive: true });

  document.addEventListener('pointermove', event => {
    if (!active || event.pointerType !== 'touch' || event.pointerId !== active.id) return;
    if (Math.hypot(event.clientX - active.x, event.clientY - active.y) > 10) clear();
  }, { passive: true });

  document.addEventListener('pointerup', event => {
    if (event.pointerType !== 'touch') return;
    touches.delete(event.pointerId);
    if (!active || event.pointerId !== active.id) return;
    // Keep a quick tap visible long enough to be perceived, without delaying navigation.
    const remaining = Math.max(0, 120 - (performance.now() - active.started));
    releaseTimer = setTimeout(clear, remaining);
  }, { passive: true });

  document.addEventListener('pointercancel', event => {
    if (event.pointerType !== 'touch') return;
    touches.delete(event.pointerId);
    if (active?.id === event.pointerId) clear();
  }, { passive: true });
  document.addEventListener('scroll', clear, { passive: true, capture: true });
  window.addEventListener('blur', () => { touches.clear(); clear(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { touches.clear(); clear(); }
  });
})();
;
