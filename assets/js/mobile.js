/* Shared navigation: the same destinations on desktop and touch screens. */
(() => {
  const nav = document.getElementById('nav');
  const toggle = nav?.querySelector('.mobile-menu-toggle');
  const panel = document.getElementById('site-navigation');
  if (!toggle || !panel) return;
  const mobile = window.matchMedia('(max-width: 1000px)');
  const cta = nav.querySelector('.nav-cta')?.cloneNode(true);
  if (cta) { cta.classList.add('mobile-menu-cta'); panel.append(cta); }
  function close(restoreFocus = false) {
    nav.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('mobile-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  panel.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('mobile-open')) close(true);
  });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) close(); });
  nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) close(); });
  mobile.addEventListener('change', () => close());
  panel.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
  });
})();
