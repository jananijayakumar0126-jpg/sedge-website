/* ══ Mobile nav drawer (shared across every page) ══
   Builds a hamburger + drawer from whatever is already inside .nav-links,
   so it never drifts out of sync with per-page nav edits. */
(function () {
  function init() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var navLinks = nav.querySelector('.nav-links');
    var navRight = nav.querySelector('.nav-right');
    if (!navLinks || !navRight) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-mobile-toggle';
    toggle.setAttribute('aria-label', 'Menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    navRight.appendChild(toggle);

    var panel = document.createElement('div');
    panel.className = 'nav-mobile-panel';

    Array.prototype.forEach.call(navLinks.children, function (node) {
      if (node.tagName === 'A') {
        panel.appendChild(node.cloneNode(true));
      } else if (node.classList.contains('nav-dropdown')) {
        var label = node.querySelector('.nav-link-btn');
        var menu = node.querySelector('.nav-dropdown-menu');
        if (label) {
          var groupLabel = document.createElement('div');
          groupLabel.className = 'nav-mobile-group-label';
          groupLabel.textContent = label.textContent.trim();
          panel.appendChild(groupLabel);
        }
        if (menu) {
          var sub = document.createElement('div');
          sub.className = 'nav-mobile-sub';
          Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
            sub.appendChild(a.cloneNode(true));
          });
          panel.appendChild(sub);
        }
      }
    });

    var cta = nav.querySelector('.nav-cta');
    if (cta) {
      var ctaClone = cta.cloneNode(true);
      ctaClone.classList.add('nav-mobile-cta');
      panel.appendChild(ctaClone);
    }

    nav.appendChild(panel);

    function setPanelTop() { panel.style.top = nav.offsetHeight + 'px'; }
    setPanelTop();

    function close() {
      document.body.classList.remove('nav-mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      setPanelTop();
      document.body.classList.add('nav-mobile-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      document.body.classList.contains('nav-mobile-open') ? close() : open();
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    window.addEventListener('resize', function () {
      setPanelTop();
      if (window.innerWidth > 1000) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
