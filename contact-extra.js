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
