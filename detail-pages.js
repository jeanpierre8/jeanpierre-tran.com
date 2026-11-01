(()=>{
 const button=document.getElementById('language');
 const query=new URLSearchParams(location.search).get('lang');
 let stored='fr';try{stored=sessionStorage.getItem('portfolio-language')||'fr'}catch(e){}
 let language=query==='en'||query==='fr'?query:(stored==='en'?'en':'fr');
 function render(){
  document.documentElement.lang=language;
  try{sessionStorage.setItem('portfolio-language',language)}catch(e){}
  document.querySelectorAll('[data-fr][data-en]').forEach(el=>{el.innerHTML=el.dataset[language]});
  button.innerHTML=language==='fr'?'FR <span>/ EN</span>':'EN <span>/ FR</span>';
  button.setAttribute('aria-label',language==='fr'?'Switch to English':'Passer en français');
  document.querySelector('nav').setAttribute('aria-label',language==='fr'?'Navigation des pages':'Page navigation');
  document.querySelectorAll('a[data-journey]').forEach(a=>a.href=language==='en'?'index.html?lang=en#parcours':'index.html#parcours');
  document.querySelectorAll('a[data-home]').forEach(a=>a.href=language==='en'?'index.html?lang=en#top':'index.html#top');
  document.querySelectorAll('a[data-detail-link]').forEach(a=>{const path=a.getAttribute('href').split('?')[0];a.href=path+(language==='en'?'?lang=en':'')});
  document.title=language==='en'?document.body.dataset.titleEn:document.body.dataset.titleFr;
 }
 button.addEventListener('click',()=>{language=language==='fr'?'en':'fr';render();try{const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(history.state,'',url)}catch(e){}});
 render();
})();
