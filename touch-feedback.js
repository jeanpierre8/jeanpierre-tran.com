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
