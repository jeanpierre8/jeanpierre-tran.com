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
 function syncLanguage(){const en=document.documentElement.lang==='en';try{sessionStorage.setItem('portfolio-language',en?'en':'fr')}catch(_){}document.querySelectorAll('.timeline-detail-link[data-page]').forEach(a=>{a.href=a.dataset.page+(en?'?lang=en':'')});labels()}
 lang?.addEventListener('click',()=>{syncLanguage();try{const url=new URL(location.href);url.searchParams.set('lang',document.documentElement.lang==='en'?'en':'fr');history.replaceState(history.state,'',url)}catch(_){}});
 let preferred='fr';try{preferred=new URLSearchParams(location.search).get('lang')||sessionStorage.getItem('portfolio-language')||'fr'}catch(_){};
 if(preferred==='en'&&document.documentElement.lang!=='en')lang?.click();else syncLanguage();
})();
