document.addEventListener('DOMContentLoaded', () => {
  const sidebar   = document.getElementById('sidebar');
  const toggle    = document.getElementById('menuToggle');
  const scrim     = document.getElementById('scrim');
  const navLinks  = Array.from(document.querySelectorAll('.nav-link'));
  const sections  = Array.from(document.querySelectorAll('[data-section]'));

  /* ---- Mobile menu ---- */
  function openMenu(){
    sidebar.classList.add('open');
    scrim.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu(){
    sidebar.classList.remove('open');
    scrim.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeMenu() : openMenu();
  });
  scrim?.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ---- Reveal sections on scroll ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(sec => revealObserver.observe(sec));

  /* ---- Scroll-spy active nav link ---- */
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => spyObserver.observe(sec));
});
