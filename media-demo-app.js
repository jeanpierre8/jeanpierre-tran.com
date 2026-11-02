/* Independent browser-only demonstration. Every file and path below is fictitious. */
(() => {
  const shell = document.querySelector('.mi-demo-shell');
  if (!shell) return;
  const search = document.getElementById('mi-search');
  const drive = document.getElementById('mi-drive');
  const count = document.getElementById('mi-count');
  const results = document.getElementById('mi-results');
  const detail = document.getElementById('mi-detail');
  const scan = document.getElementById('mi-scan');
  const exportButton = document.getElementById('mi-export');
  const notice = document.getElementById('mi-notice');
  const nav = [...shell.querySelectorAll('.mi-nav-btn[data-view]')];
  if (![search, drive, count, results, detail, scan, exportButton, notice].every(Boolean) || !nav.length) return;

  // These examples are deliberately unrelated to the visitor's files or drives.
  const files = [
    { id:'sunrise', name:'horizon-matin.jpg', type:'image', drive:'archive', tags:{fr:['Voyage','Paysage'],en:['Travel','Landscape']}, quality:'—', size:'4,2 Mo', date:'2025-05-17', favorite:true },
    { id:'portrait', name:'atelier-portrait.png', type:'image', drive:'studio', tags:{fr:['Portrait'],en:['Portrait']}, quality:'—', size:'2,8 Mo', date:'2025-06-09', favorite:false },
    { id:'coast', name:'littoral-ete.mp4', type:'video', drive:'archive', tags:{fr:['Voyage'],en:['Travel']}, quality:'1080p', size:'128 Mo', date:'2025-06-15', favorite:false },
    { id:'note', name:'carnet-idees.pdf', type:'pdf', drive:'studio', tags:{fr:['Projet'],en:['Project']}, quality:'—', size:'1,4 Mo', date:'2025-06-21', favorite:true },
    { id:'forest', name:'ambiance-foret.mp3', type:'music', drive:'archive', tags:{fr:['Nature'],en:['Nature']}, quality:'—', size:'8,6 Mo', date:'2025-07-02', favorite:false },
    { id:'clouds', name:'nuages-douceur.jpg', type:'image', drive:'studio', tags:{fr:['Paysage'],en:['Landscape']}, quality:'—', size:'3,1 Mo', date:'2025-07-18', favorite:false },
    { id:'series1', name:'exploration-01.mp4', type:'video', drive:'studio', series:'Exploration · S01E01', tags:{fr:['Création'],en:['Creative']}, quality:'1080p', size:'246 Mo', date:'2025-08-01', favorite:false },
    { id:'series2', name:'exploration-02.mp4', type:'video', drive:'studio', series:'Exploration · S01E02', tags:{fr:['Création'],en:['Creative']}, quality:'1080p', size:'231 Mo', date:'2025-08-02', favorite:false },
    { id:'journey', name:'itineraire-voyage.pdf', type:'pdf', drive:'archive', tags:{fr:['Voyage','Notes'],en:['Travel','Notes']}, quality:'—', size:'860 Ko', date:'2025-08-10', favorite:false },
    { id:'summary', name:'inventaire-exemple.txt', type:'other', drive:'archive', tags:{fr:['Notes'],en:['Notes']}, quality:'—', size:'12 Ko', date:'2025-08-18', favorite:false }
  ];
  const copy = {
    fr:{ search:'Ctrl+F · Rechercher…', all:'Tous les disques', drives:{archive:'Archives',studio:'Studio'}, types:{image:'Image',video:'Vidéo',pdf:'PDF',music:'Musique',other:'Autre'}, columns:['Fichier','Type','Série / Ép.','Disque','Tags','Qualité','Taille','Date'], one:'fichier', many:'fichiers', empty:'Aucun fichier fictif ne correspond à cette sélection.', clear:'Effacer les filtres', promptTitle:'Sélectionnez un fichier', prompt:'Choisissez une ligne pour voir sa fiche.', close:'Fermer la fiche', details:'Infos', tags:'Tags personnels', note:'Note personnelle', notePlaceholder:'Écrivez une note fictive…', addFavorite:'☆ Ajouter aux favoris', removeFavorite:'★ Retirer des favoris', simulated:'Données fictives · Démonstration', scanned:'Simulation : aucun disque n’est analysé.', exported:'Simulation : aucun fichier n’est exporté.', path:'Chemin fictif', countLabel:'éléments' },
    en:{ search:'Ctrl+F · Search…', all:'All drives', drives:{archive:'Archive',studio:'Studio'}, types:{image:'Image',video:'Video',pdf:'PDF',music:'Music',other:'Other'}, columns:['File','Type','Series / Ep.','Drive','Tags','Quality','Size','Date'], one:'file', many:'files', empty:'No sample files match this selection.', clear:'Clear filters', promptTitle:'Select a file', prompt:'Choose a row to see its details.', close:'Close details', details:'Info', tags:'Personal tags', note:'Personal note', notePlaceholder:'Write a sample note…', addFavorite:'☆ Add to favorites', removeFavorite:'★ Remove from favorites', simulated:'Fictional data · Demonstration', scanned:'Simulation: no drive is scanned.', exported:'Simulation: no file is exported.', path:'Sample path', countLabel:'items' }
  };
  // These are hand-written examples, not output from an AI model.
  const aiExamples = {
    sunrise: {
      fr:{tags:['Horizon','Matin']},
      en:{tags:['Horizon','Morning']}
    },
    portrait: {
      fr:{tags:['Atelier','Portrait']},
      en:{tags:['Studio','Portrait']}
    },
    coast: {
      fr:{tags:['Littoral','Été']},
      en:{tags:['Coast','Summer']}
    },
    forest: {
      fr:{tags:['Ambiance','Forêt']},
      en:{tags:['Ambience','Forest']}
    },
    clouds: {
      fr:{tags:['Nuages','Douceur']},
      en:{tags:['Clouds','Softness']}
    },
    series1: {
      fr:{tags:['Exploration','01']},
      en:{tags:['Exploration','01']}
    },
    series2: {
      fr:{tags:['Exploration','02']},
      en:{tags:['Exploration','02']}
    },
    note: {
      fr:{title:'Carnet d’idées pour un projet créatif',summary:'Ce document fictif rassemble des idées pour organiser un projet créatif et ses prochaines étapes.',tags:['Projet','Créativité','Organisation']},
      en:{title:'Ideas for a creative project',summary:'This fictional document gathers ideas for a creative project and its next steps.',tags:['Project','Creativity','Organisation']}
    },
    journey: {
      fr:{title:'Itinéraire de voyage',summary:'Ce document fictif présente un itinéraire de voyage et les étapes à préparer.',tags:['Voyage','Itinéraire','Préparation']},
      en:{title:'Travel itinerary',summary:'This fictional document presents a travel itinerary and the steps to prepare.',tags:['Travel','Itinerary','Preparation']}
    },
    summary: {
      fr:{tags:['Inventaire','Exemple']},
      en:{tags:['Inventory','Example']}
    }
  };
  const aiCopy = {
    fr:{labelPdf:'IA · EXEMPLE PDF',labelFilename:{other:'IA · EXEMPLE TXT',image:'IA · EXEMPLE IMAGE',video:'IA · EXEMPLE VIDÉO',music:'IA · EXEMPLE MUSIQUE'},hint:'Animation prédéfinie : aucune IA n’est exécutée et aucun fichier n’est consulté sur ce site.',action:'Voir un exemple d’analyse IA',hide:'Masquer l’exemple',title:'Titre proposé',summary:'Résumé proposé',tags:'Tags proposés',filenameTags:'Tags suggérés à partir du titre',stepsLabel:'Étapes de la simulation',stepsPdf:['Préparation de l’exemple','Extraction du texte (simulation)','Proposition du titre, du résumé et des tags (simulation)'],stepsFilename:['Préparation de l’exemple','Lecture du titre fictif (simulation)','Suggestion des tags (simulation)'],skip:'Passer l’animation',progress:(step, label)=>`Étape ${step} sur 3 : ${label}.`,complete:'Simulation terminée : résultat prédéfini.'},
    en:{labelPdf:'AI · PDF EXAMPLE',labelFilename:{other:'AI · TXT EXAMPLE',image:'AI · IMAGE EXAMPLE',video:'AI · VIDEO EXAMPLE',music:'AI · MUSIC EXAMPLE'},hint:'Prewritten animation: no AI runs and no files are accessed on this site.',action:'View an example AI analysis',hide:'Hide the example',title:'Suggested title',summary:'Suggested summary',tags:'Suggested tags',filenameTags:'Tags suggested from the title',stepsLabel:'Simulation steps',stepsPdf:['Preparing the example','Extracting text (simulation)','Suggesting a title, summary and tags (simulation)'],stepsFilename:['Preparing the example','Reading the fictional title (simulation)','Suggesting tags (simulation)'],skip:'Skip animation',progress:(step, label)=>`Step ${step} of 3: ${label}.`,complete:'Simulation complete: prewritten result.'}
  };
  // Keep completed examples per file; never let a timer update a detached detail panel.
  const aiStates = new Map();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let aiTimer = null, runningAiId = null, currentAiView = null;
  function aiState(id) {
    if (!aiStates.has(id)) aiStates.set(id,{expanded:false,phase:-1});
    return aiStates.get(id);
  }
  function stopAiRun(resetIncomplete = false) {
    if (aiTimer !== null) clearTimeout(aiTimer);
    aiTimer = null;
    if (runningAiId !== null && resetIncomplete) {
      const example = aiState(runningAiId);
      if (example.phase < 3) { example.phase = -1; example.expanded = false; }
    }
    runningAiId = null;
  }
  function scheduleAi(id) {
    runningAiId = id;
    aiTimer = setTimeout(()=>{
      aiTimer = null;
      const example = aiState(id);
      if (document.hidden || state.selected !== id || !example.expanded || example.phase < 0 || example.phase >= 3) {
        stopAiRun(true);
        return;
      }
      example.phase += 1;
      if (currentAiView?.id === id) currentAiView.paint();
      if (example.phase < 3) scheduleAi(id);
      else runningAiId = null;
    },750);
  }
  const names = ['name','type','series','drive','tags','quality','size','date'];
  const state = { view:'all', selected:null, notice:null };
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const clean = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const typeText = (file, t) => t.types[file.type];
  const sizeText = (file, l) => l === 'en' ? file.size.replace('Mo','MB').replace('Ko','KB').replace(',','.') : file.size;
  const inView = (file, view) => {
    if (view === 'favorites') return file.favorite;
    if (view === 'series') return !!file.series;
    if (view === 'pdf') return file.type === 'pdf';
    if (view === 'images') return file.type === 'image';
    if (view === 'music') return file.type === 'music';
    if (view === 'others') return file.type === 'other';
    return true;
  };
  function visibleFiles() {
    const query = clean(search.value);
    // Keep searches stable when the visitor switches language; notes remain in memory only.
    const items = files.filter(file => inView(file,state.view) && (drive.value === 'all' || file.drive === drive.value) && (!query || clean([file.name,copy.fr.types[file.type],copy.en.types[file.type],copy.fr.drives[file.drive],copy.en.drives[file.drive],file.series || '',file.note || '',...file.tags.fr,...file.tags.en].join(' ')).includes(query)));
    return state.view === 'recent' ? items.slice().sort((a,b)=>b.date.localeCompare(a.date)) : items;
  }
  function setNotice() {
    const t = copy[lang()];
    notice.textContent = state.notice ? t[state.notice] : '';
  }
  function renderNav() {
    shell.querySelector('.mi-nav')?.setAttribute('aria-label', lang() === 'en' ? 'Demo categories' : 'Catégories de la démonstration');
    nav.forEach(button => {
      const selected = button.dataset.view === state.view;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
      const badge = button.querySelector('.mi-nav-count');
      if (badge) badge.textContent = String(files.filter(file => inView(file,button.dataset.view)).length);
    });
  }
  function showSelected() {
    results.querySelectorAll('.mi-file').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.id === state.selected)));
  }
  function openFile(file) {
    state.selected = file.id;
    showSelected();
    renderDetail();
    if (window.matchMedia('(max-width: 800px) and (pointer: coarse)').matches) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      detail.scrollIntoView({behavior:reduced?'auto':'smooth',block:'nearest'});
    }
  }
  function renderDetail() {
    const l = lang(), t = copy[l], file = files.find(item => item.id === state.selected);
    if (runningAiId !== null && runningAiId !== file?.id) stopAiRun(true);
    currentAiView = null;
    detail.replaceChildren();
    detail.hidden = !file;
    if (!file) return;
    const head = make('div','mi-detail-header');
    const kicker = make('span','mi-detail-kind',typeText(file,t));
    const close = make('button','mi-detail-close','×');
    close.type = 'button'; close.setAttribute('aria-label',t.close);
    close.addEventListener('click',()=>{state.selected=null;renderDetail();showSelected();const button=results.querySelector(`.mi-file[data-id="${file.id}"]`);button?.focus()});
    head.append(kicker,close);
    const title = make('h3','mi-detail-title',file.name);
    const path = make('p','mi-detail-path',`${t.path} · ${t.drives[file.drive]} / Media / ${file.name}`);
    const metaLabel = make('div','mi-detail-section',t.details);
    const meta = make('p','mi-detail-meta',`${typeText(file,t)} · ${sizeText(file,l)} · ${file.date}`);
    const favorite = make('button','mi-favorite',file.favorite?t.removeFavorite:t.addFavorite);
    favorite.type = 'button'; favorite.setAttribute('aria-pressed',String(file.favorite));
    favorite.addEventListener('click',()=>{
      file.favorite = !file.favorite;
      render();
      if (state.selected) detail.querySelector('.mi-favorite')?.focus();
      else shell.querySelector('.mi-nav-btn[data-view="favorites"]')?.focus();
    });
    const tagLabel = make('div','mi-detail-section',t.tags);
    const tags = make('div','mi-detail-tags');
    file.tags[l].forEach(tag=>tags.append(make('span','mi-tag',tag)));
    const noteLabel = make('label','mi-detail-section',t.note);
    const note = make('textarea','mi-note');
    note.id='mi-sample-note';note.rows=3;note.placeholder=t.notePlaceholder;note.value=file.note||'';
    note.addEventListener('input',()=>{file.note=note.value});
    noteLabel.htmlFor=note.id;
    detail.append(head,title,path,metaLabel,meta,favorite,tagLabel,tags,noteLabel,note);
    if (aiExamples[file.id]) {
      const ai = aiCopy[l], example = aiExamples[file.id][l], record = aiState(file.id);
      const isPdf = file.type === 'pdf';
      const stepTexts = isPdf ? ai.stepsPdf : ai.stepsFilename;
      const panel = make('section','mi-ai-panel');
      const label = make('p','mi-ai-label',isPdf ? ai.labelPdf : ai.labelFilename[file.type]);
      const hint = make('p','mi-ai-hint',ai.hint);
      const button = make('button','mi-ai-button',ai.action);
      button.type = 'button';
      const output = make('div','mi-ai-output');
      output.id = `mi-ai-example-${file.id}`;
      button.setAttribute('aria-controls',output.id);
      const steps = make('ol','mi-ai-steps');
      steps.setAttribute('aria-label',ai.stepsLabel);
      steps.setAttribute('aria-live','off');
      const rows = stepTexts.map((text,index)=>{
        const row = make('li','mi-ai-step');
        const mark = make('span','mi-ai-step-mark',String(index+1));
        mark.setAttribute('aria-hidden','true');
        row.append(mark,make('span','mi-ai-step-text',text));
        steps.append(row);
        return row;
      });
      const status = make('p','mi-ai-status');
      status.setAttribute('role','status');
      status.setAttribute('aria-live','polite');
      status.setAttribute('aria-atomic','true');
      const skip = make('button','mi-ai-skip',ai.skip);
      skip.type = 'button';
      const result = make('div','mi-ai-result');
      const tagList = make('div','mi-ai-tags');
      example.tags.forEach(tag=>tagList.append(make('span','',tag)));
      if (isPdf) result.append(make('p','mi-ai-label',ai.title),make('p','mi-ai-summary',example.title),make('p','mi-ai-label',ai.summary),make('p','mi-ai-summary',example.summary));
      result.append(make('p','mi-ai-label',isPdf ? ai.tags : ai.filenameTags),tagList);
      output.append(steps,status,skip,result);
      function paintExample() {
        const complete = record.phase === 3;
        button.setAttribute('aria-expanded',String(record.expanded));
        button.textContent = record.expanded ? ai.hide : ai.action;
        output.hidden = !record.expanded;
        rows.forEach((row,index)=>{row.dataset.state = complete || index < record.phase ? 'done' : index === record.phase ? 'active' : 'pending'});
        status.textContent = !record.expanded || record.phase < 0 ? '' : complete ? ai.complete : ai.progress(record.phase+1,stepTexts[record.phase]);
        if (complete && document.activeElement === skip) button.focus();
        skip.hidden = complete || !record.expanded;
        result.hidden = !complete;
      }
      button.addEventListener('click',()=>{
        if (record.expanded) {
          if (runningAiId === file.id) stopAiRun(true);
          record.expanded = false;
        } else {
          record.expanded = true;
          if (record.phase < 0) {
            record.phase = reducedMotion.matches ? 3 : 0;
            if (record.phase < 3) scheduleAi(file.id);
          }
        }
        paintExample();
      });
      skip.addEventListener('click',()=>{
        if (runningAiId === file.id) stopAiRun();
        record.phase = 3;
        paintExample();
      });
      currentAiView = {id:file.id,paint:paintExample};
      paintExample();
      panel.append(label,hint,button,output);
      detail.insertBefore(panel,tagLabel);
    }
    detail.append(make('p','mi-detail-meta',t.simulated));
  }
  function render() {
    const l=lang(),t=copy[l];
    search.placeholder=t.search;
    renderNav();setNotice();
    const items=visibleFiles();
    if (!items.some(file=>file.id===state.selected)) state.selected=null;
    count.textContent=`${items.length} ${items.length===1?t.one:t.many}`;
    results.replaceChildren();
    if (!items.length) {
      const empty=make('div','mi-empty');
      const text=make('p','',t.empty),button=make('button','mi-reset',t.clear);
      button.type='button';button.addEventListener('click',()=>{state.view='all';drive.value='all';search.value='';state.selected=null;render();search.focus()});
      empty.append(text,button);results.append(empty);renderDetail();return;
    }
    const table=make('table','mi-table');
    const thead=make('thead'),heading=make('tr');
    t.columns.forEach((label,i)=>{const th=make('th',`mi-col-${names[i]}`,label);th.scope='col';heading.append(th)});
    thead.append(heading);
    const body=make('tbody');
    items.forEach(file=>{
      const row=make('tr');
      const nameCell=make('td','mi-col-name'),nameButton=make('button','mi-file');
      nameButton.type='button';nameButton.dataset.id=file.id;nameButton.setAttribute('aria-pressed',String(file.id===state.selected));
      nameButton.append(make('span','mi-file-name',`${file.favorite?'★ ':''}${file.name}`));
      nameButton.addEventListener('click',()=>openFile(file));nameCell.append(nameButton);row.append(nameCell);
      const values=[typeText(file,t),file.series||'—',t.drives[file.drive],file.tags[l].join(' · '),file.quality,sizeText(file,l),file.date];
      values.forEach((value,i)=>{
        const cell=make('td',`mi-col-${names[i+1]}`);
        if(i===0){const badge=make('span','mi-type',value);badge.dataset.type=file.type;cell.append(badge)}
        else if(i===3){file.tags[l].forEach(tag=>cell.append(make('span','mi-tag',tag)))}
        else cell.textContent=value;
        row.append(cell);
      });
      row.addEventListener('click',event=>{if(!event.target.closest('button'))openFile(file)});
      body.append(row);
    });
    table.append(thead,body);results.append(table);renderDetail();
  }
  nav.forEach(button=>button.addEventListener('click',()=>{state.view=button.dataset.view;state.selected=null;state.notice=null;render()}));
  search.addEventListener('input',render);
  drive.addEventListener('change',render);
  scan.addEventListener('click',()=>{state.notice='scanned';setNotice()});
  exportButton.addEventListener('click',()=>{state.notice='exported';setNotice()});
  document.getElementById('language')?.addEventListener('click',render);
  document.addEventListener('visibilitychange',()=>{
    if (document.hidden && runningAiId !== null) {
      stopAiRun(true);
      currentAiView?.paint();
    }
  });
  reducedMotion.addEventListener?.('change',event=>{
    if (event.matches && runningAiId !== null) {
      const id = runningAiId;
      stopAiRun();
      aiState(id).phase = 3;
      if (currentAiView?.id === id) currentAiView.paint();
    }
  });
  render();
  [search,drive,scan,exportButton,...nav].forEach(control=>{control.disabled=false});
})();
