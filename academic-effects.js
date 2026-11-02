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
