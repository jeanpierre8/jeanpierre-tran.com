/* Interactive presentation only: every item below is fictitious and stays in this page. */
(() => {
  const section = document.querySelector('.media-demo');
  if (!section) return;
  const search = document.getElementById('demo-search');
  const type = document.getElementById('demo-type');
  const drive = document.getElementById('demo-drive');
  const count = document.getElementById('demo-count');
  const results = document.getElementById('demo-results');
  const detail = document.getElementById('demo-detail');
  const reset = document.getElementById('demo-reset');
  if (![search, type, drive, count, results, detail, reset].every(Boolean)) return;

  // Names, locations and metadata are examples, not visitor files.
  const files = [
    { id:'horizon', name:'horizon-matin.jpg', type:'photo', drive:'archive', size:'4,2 Mo', tags:{fr:['Voyage','Paysage'],en:['Travel','Landscape']} },
    { id:'atelier', name:'atelier-portrait.png', type:'photo', drive:'studio', size:'2,8 Mo', tags:{fr:['Portrait','Création'],en:['Portrait','Creative']} },
    { id:'littoral', name:'littoral-ete.mp4', type:'video', drive:'archive', size:'128 Mo', tags:{fr:['Voyage','Vacances'],en:['Travel','Holiday']} },
    { id:'carnet', name:'carnet-idees.pdf', type:'document', drive:'studio', size:'1,4 Mo', tags:{fr:['Notes','Projet'],en:['Notes','Project']} },
    { id:'ambiance', name:'ambiance-foret.mp3', type:'audio', drive:'archive', size:'8,6 Mo', tags:{fr:['Nature','Son'],en:['Nature','Sound']} },
    { id:'nuages', name:'nuages-douceur.jpg', type:'photo', drive:'studio', size:'3,1 Mo', tags:{fr:['Ciel','Paysage'],en:['Sky','Landscape']} },
    { id:'making', name:'making-of.mp4', type:'video', drive:'studio', size:'96 Mo', tags:{fr:['Création','Projet'],en:['Creative','Project']} },
    { id:'itineraire', name:'itineraire-voyage.pdf', type:'document', drive:'archive', size:'860 Ko', tags:{fr:['Voyage','Notes'],en:['Travel','Notes']} }
  ];
  const copy = {
    fr: {
      type:{photo:'Photo',video:'Vidéo',document:'Document',audio:'Audio'},
      drive:{archive:'Archives',studio:'Studio'},
      searchPlaceholder:'Rechercher un fichier ou un tag',
      item:'fichier', items:'fichiers', noResults:'Aucun fichier fictif ne correspond à ces filtres.',
      placeholder:'Sélectionnez un fichier pour découvrir ses détails.',
      placeholderTitle:'À explorer', details:'Détails du fichier', disk:'Disque', kind:'Type', size:'Taille', tags:'Tags', example:'Données fictives'
    },
    en: {
      type:{photo:'Photo',video:'Video',document:'Document',audio:'Audio'},
      drive:{archive:'Archive',studio:'Studio'},
      searchPlaceholder:'Search a file or tag',
      item:'file', items:'files', noResults:'No sample files match these filters.',
      placeholder:'Select a file to explore its details.',
      placeholderTitle:'Explore', details:'File details', disk:'Drive', kind:'Type', size:'Size', tags:'Tags', example:'Sample data'
    }
  };
  const icons = { photo:'▧', video:'▷', document:'≡', audio:'♫' };
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const language = () => document.documentElement.lang === 'en' ? 'en' : 'fr';
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  let selectedId = null;
  let visibleFiles = [];

  function updatePressed() {
    results.querySelectorAll('.demo-result').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.id === selectedId));
    });
  }

  function detailRow(label, value) {
    const row = make('div', 'demo-detail-row');
    row.append(make('dt', 'demo-detail-label', label), make('dd', 'demo-detail-value', value));
    return row;
  }

  function renderDetail() {
    const lang = language(), t = copy[lang];
    const file = visibleFiles.find(item => item.id === selectedId);
    detail.replaceChildren();
    if (!file) {
      detail.append(make('p', 'demo-detail-kicker', t.example), make('h3', 'demo-detail-title', t.placeholderTitle), make('p', 'demo-detail-placeholder', t.placeholder));
      return;
    }
    const heading = make('div', 'demo-detail-heading');
    const icon = make('span', 'demo-detail-icon', icons[file.type]);
    icon.setAttribute('aria-hidden', 'true');
    const headingCopy = make('div', 'demo-detail-heading-copy');
    headingCopy.append(make('p', 'demo-detail-kicker', t.details), make('h3', 'demo-detail-title', file.name));
    heading.append(icon, headingCopy);
    const list = make('dl', 'demo-detail-list');
    list.append(detailRow(t.disk, t.drive[file.drive]), detailRow(t.kind, t.type[file.type]), detailRow(t.size, lang === 'en' ? file.size.replace('Mo','MB').replace('Ko','KB').replace(',','.') : file.size), detailRow(t.tags, file.tags[lang].join(' · ')));
    detail.append(heading, list, make('p', 'demo-detail-note', t.example));
  }

  function render() {
    const lang = language(), t = copy[lang], query = normalize(search.value);
    search.placeholder = t.searchPlaceholder;
    visibleFiles = files.filter(file => {
      const haystack = normalize([file.name, t.type[file.type], t.drive[file.drive], ...file.tags[lang]].join(' '));
      return (!query || haystack.includes(query)) && (type.value === 'all' || file.type === type.value) && (drive.value === 'all' || file.drive === drive.value);
    });
    if (!visibleFiles.some(file => file.id === selectedId)) selectedId = null;
    count.textContent = `${visibleFiles.length} ${visibleFiles.length === 1 ? t.item : t.items}`;
    results.replaceChildren();
    if (!visibleFiles.length) results.append(make('p', 'demo-empty', t.noResults));
    visibleFiles.forEach(file => {
      const button = make('button', 'demo-result');
      button.type = 'button';
      button.dataset.id = file.id;
      button.setAttribute('aria-pressed', String(file.id === selectedId));
      const icon = make('span', 'demo-result-icon', icons[file.type]);
      icon.setAttribute('aria-hidden', 'true');
      const body = make('span', 'demo-result-copy');
      body.append(make('span', 'demo-result-name', file.name), make('span', 'demo-result-meta', `${t.type[file.type]} · ${t.drive[file.drive]}`));
      button.append(icon, body, make('span', 'demo-result-tag', file.tags[lang][0]));
      button.addEventListener('click', () => {
        selectedId = file.id; updatePressed(); renderDetail();
        // On touch screens the detail panel follows the list, so bring it into view.
        if (window.matchMedia('(max-width: 800px) and (pointer: coarse)').matches) {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          detail.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
        }
      });
      results.append(button);
    });
    renderDetail();
  }

  search.addEventListener('input', render);
  type.addEventListener('change', render);
  drive.addEventListener('change', render);
  reset.addEventListener('click', () => { search.value = ''; type.value = 'all'; drive.value = 'all'; selectedId = null; render(); search.focus(); });
  document.getElementById('language')?.addEventListener('click', render);
  render();
  [search, type, drive, reset].forEach(control => { control.disabled = false; });
})();
