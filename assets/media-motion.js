/* Decorative motion: content is visible even when animation is unavailable. */
(() => {
  if (!('IntersectionObserver' in window) || !window.matchMedia) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  const hero = document.querySelector('.media-art');
  const diagram = document.querySelector('.media-ai-visual');
  const contact = document.querySelector('.media-contact');
  let heroVisible = false, diagramVisible = false, contactVisible = false;

  const cancelEntrances = () => {
    active.forEach(animation => animation.cancel());
    active.clear();
  };
  const syncOrbit = () => {
    if (hero) hero.classList.toggle('is-orbit-active', heroVisible && !document.hidden && !reducedMotion.matches);
    if (diagram) diagram.classList.toggle('is-diagram-active', diagramVisible && !document.hidden && !reducedMotion.matches);
    if (contact) contact.classList.toggle('is-contact-active', contactVisible && !document.hidden && !reducedMotion.matches);
  };
  const onMotionChange = () => {
    if (reducedMotion.matches) cancelEntrances();
    syncOrbit();
  };
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', onMotionChange);
  else if (reducedMotion.addListener) reducedMotion.addListener(onMotionChange);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelEntrances();
    syncOrbit();
  });

  if (hero || diagram || contact) {
    const visualObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === diagram) diagramVisible = entry.isIntersecting;
        if (entry.target === contact) contactVisible = entry.isIntersecting;
      });
      syncOrbit();
    }, {threshold: 0});
    if (hero) visualObserver.observe(hero);
    if (diagram) visualObserver.observe(diagram);
    if (contact) visualObserver.observe(contact);
  }

  if (!Element.prototype.animate) return;
  const items = [...document.querySelectorAll('.media-feature, .media-ai-copy, .media-ai-panel, .media-demo-intro, .media-contact')];
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reducedMotion.matches || document.hidden) return;
      const animation = entry.target.animate(
        [{opacity: .82, transform: 'translateY(12px)'}, {opacity: 1, transform: 'translateY(0)'}],
        {duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)'}
      );
      active.add(animation);
      animation.onfinish = animation.oncancel = () => active.delete(animation);
    });
  }, {threshold: .1});
  items.forEach(item => observer.observe(item));
})();
/* A temporary visual response only: these informational cards are not controls. */
(() => {
  let active = null;
  const clear = () => {
    if (active) active.card.classList.remove('is-touch-active');
    active = null;
  };
  const begin = (target, id, x, y) => {
    clear();
    const card = target && typeof target.closest === 'function' ? target.closest('.media-feature') : null;
    if (!card) return;
    active = {card, id, x, y};
    card.classList.add('is-touch-active');
  };
  const moved = (id, x, y) => {
    if (active && active.id === id && Math.hypot(x - active.x, y - active.y) > 10) clear();
  };
  const end = id => { if (active && active.id === id) clear(); };
  const passive = {passive: true};

  if ('PointerEvent' in window) {
    document.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      if (!event.isPrimary) { clear(); return; }
      begin(event.target, event.pointerId, event.clientX, event.clientY);
    }, passive);
    window.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') moved(event.pointerId, event.clientX, event.clientY);
    }, passive);
    window.addEventListener('pointerup', event => end(event.pointerId), passive);
    window.addEventListener('pointercancel', event => end(event.pointerId), passive);
  } else {
    document.addEventListener('touchstart', event => {
      if (event.touches.length !== 1) { clear(); return; }
      const touch = event.touches[0];
      begin(event.target, touch.identifier, touch.clientX, touch.clientY);
    }, passive);
    window.addEventListener('touchmove', event => {
      if (event.touches.length !== 1) { clear(); return; }
      const touch = event.touches[0];
      moved(touch.identifier, touch.clientX, touch.clientY);
    }, passive);
    const touchEnd = event => {
      for (const touch of Array.from(event.changedTouches)) end(touch.identifier);
    };
    window.addEventListener('touchend', touchEnd, passive);
    window.addEventListener('touchcancel', touchEnd, passive);
  }
  window.addEventListener('scroll', clear, {passive: true, capture: true});
  window.addEventListener('blur', clear, passive);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); }, passive);
})();
