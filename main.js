/* ══════════════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════════════ */
const hamburger  = document.getElementById('navHamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileNavClose');

hamburger.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', closeMobileMenu);
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

function closeMobileMenu() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   NAVBAR SCROLL EFFECT
══════════════════════════════════════════ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

/* ══════════════════════════════════════════
   VALUE SECTION — Two-column grid wrapper
   (builds the responsive two-col layout)
══════════════════════════════════════════ */
function buildValueGrid() {
  const section  = document.querySelector('.value-section');
  const content  = document.querySelector('.value-content');
  const steps    = document.querySelector('.value-steps');
  if (!section || !content || !steps) return;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'display:grid',
    'grid-template-columns:1fr 1fr',
    'gap:72px',
    'align-items:center',
    'max-width:1200px',
    'margin:0 auto',
  ].join(';');
  wrapper.id = 'valueGrid';

  section.insertBefore(wrapper, content);
  wrapper.appendChild(content);
  wrapper.appendChild(steps);

  // collapse to 1 col on small screens
  const mq = window.matchMedia('(max-width:900px)');
  const handle = (e) => {
    wrapper.style.gridTemplateColumns = e.matches ? '1fr' : '1fr 1fr';
    wrapper.style.gap = e.matches ? '40px' : '72px';
  };
  mq.addEventListener('change', handle);
  handle(mq);
}
buildValueGrid();

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const num = parseInt(el.dataset.val, 10);
    animateNum(el.querySelector('.mcount'), num);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-item[data-val]').forEach(el => counterObs.observe(el));

function animateNum(span, target) {
  const dur  = 1800;
  const step = target / (dur / 16);
  let cur    = 0;
  const t    = setInterval(() => {
    cur += step;
    if (cur >= target) { span.textContent = target; clearInterval(t); }
    else { span.textContent = Math.floor(cur); }
  }, 16);
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
// Tag elements we want to reveal
const revealTargets = [
  '.metric-item',
  '.feat-card',
  '.phil-card',
  '.vstep',
  '.value-content',
  '.value-steps',
  '.announcement-box',
  '.hero-text',
  '.cta-band-inner',
  '.wow-head',
];

function tagReveal() {
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });
}

function checkReveal() {
  const vh = window.innerHeight;
  document.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh - 60) {
      setTimeout(() => el.classList.add('visible'), i * 55);
    }
  });
}

tagReveal();
window.addEventListener('scroll', checkReveal, { passive: true });
checkReveal();

/* ══════════════════════════════════════════
   HERO IMAGE — mouse parallax
══════════════════════════════════════════ */
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroImg.style.transform = `translate(${dx * 10}px, ${dy * 7}px)`;
  });
  window.addEventListener('mouseleave', () => {
    heroImg.style.transform = '';
  });
}

/* ══════════════════════════════════════════
   ACTIVE STEP HIGHLIGHT ON SCROLL
══════════════════════════════════════════ */
const vsteps = document.querySelectorAll('.vstep');
const stepObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      vsteps.forEach(s => s.classList.remove('vstep-active'));
      e.target.classList.add('vstep-active');
    }
  });
}, { threshold: 0.75 });

vsteps.forEach(s => stepObs.observe(s));

/* ══════════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) cur = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('nav-active');
    if (a.getAttribute('href') === `#${cur}`) a.classList.add('nav-active');
  });
}, { passive: true });
