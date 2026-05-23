/* ================================================
   LUMIÈRE INTERIORS — script.js
   ================================================ */

/* ---------- DOM REFERENCES ---------- */
const navbar      = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const hamburger   = document.getElementById('hamburger');
const navMenu     = document.getElementById('navMenu');
const navOverlay  = document.getElementById('navOverlay');
const navLinks    = document.querySelectorAll('.nav-link');
const backToTop   = document.getElementById('backToTop');
const portfolioGrid  = document.getElementById('portfolioGrid');
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox    = document.getElementById('lightbox');
const lbBackdrop  = document.getElementById('lbBackdrop');
const lbClose     = document.getElementById('lbClose');
const lbImg       = document.getElementById('lbImg');
const lbTitle     = document.getElementById('lbTitle');
const sliderTrack = document.getElementById('sliderTrack');
const sPrev       = document.getElementById('sPrev');
const sNext       = document.getElementById('sNext');
const sDotsWrap   = document.getElementById('sDots');
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formErrMsg  = document.getElementById('formErrMsg');

/* ================================================
   THEME TOGGLE
   ================================================ */
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.innerHTML = dark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);
})();

themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
});

/* ================================================
   NAVBAR + SCROLL EFFECTS
   ================================================ */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  navbar.classList.toggle('scrolled', y > 55);
  backToTop.classList.toggle('visible', y > 420);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === current);
  });
}, { passive: true });

/* ================================================
   MOBILE NAV
   ================================================ */
function closeMobileNav() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('open');
  if (isOpen) {
    closeMobileNav();
  } else {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
});

navOverlay.addEventListener('click', closeMobileNav);
navLinks.forEach(link => link.addEventListener('click', closeMobileNav));

/* ================================================
   SCROLL REVEAL (Intersection Observer)
   ================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // Stagger siblings inside same parent
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('revealed'), idx * 80);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -55px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ================================================
   STATS COUNTER
   ================================================ */
function runCounter(el) {
  const target = +el.getAttribute('data-target');
  const step   = target / (1800 / 16);
  let current  = 0;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-num').forEach(runCounter);
    statsObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObs.observe(statsSection);

/* ================================================
   PORTFOLIO FILTER
   ================================================ */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        // Show: set display first, then animate in
        item.style.display = '';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }));
      } else {
        // Hide: animate out then set display none
        item.style.opacity = '0';
        item.style.transform = 'scale(0.94)';
        setTimeout(() => { item.style.display = 'none'; }, 310);
      }
    });
  });
});

/* ================================================
   LIGHTBOX
   ================================================ */
function openLightbox(src, title) {
  lbImg.src = src;
  lbImg.alt = title;
  lbTitle.textContent = title;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 350);
}

document.querySelectorAll('.p-zoom').forEach(btn => {
  btn.addEventListener('click', () => {
    openLightbox(btn.dataset.img, btn.dataset.title);
  });
});

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ================================================
   TESTIMONIALS SLIDER
   ================================================ */
const tCards = sliderTrack.querySelectorAll('.t-card');
let currentSlide = 0;
let autoplayId;

// Build dots
tCards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 's-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
  sDotsWrap.appendChild(dot);
});

function updateDots() {
  sDotsWrap.querySelectorAll('.s-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function goTo(n) {
  currentSlide = ((n % tCards.length) + tCards.length) % tCards.length;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function resetAutoplay() {
  clearInterval(autoplayId);
  autoplayId = setInterval(() => goTo(currentSlide + 1), 5200);
}

sPrev.addEventListener('click', () => { goTo(currentSlide - 1); resetAutoplay(); });
sNext.addEventListener('click', () => { goTo(currentSlide + 1); resetAutoplay(); });

// Touch / swipe
let touchX = 0;
sliderTrack.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
sliderTrack.addEventListener('touchend', e => {
  const diff = touchX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 48) { goTo(currentSlide + (diff > 0 ? 1 : -1)); resetAutoplay(); }
}, { passive: true });

resetAutoplay(); // start autoplay

/* ================================================
   CONTACT FORM
   ================================================ */
function validate(input, errId, msg) {
  const errEl = document.getElementById(errId);
  if (!input.value.trim()) {
    input.classList.add('err');
    if (errEl) errEl.textContent = msg;
    return false;
  }
  if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    input.classList.add('err');
    if (errEl) errEl.textContent = 'Please enter a valid email address.';
    return false;
  }
  input.classList.remove('err');
  if (errEl) errEl.textContent = '';
  return true;
}

// Clear errors on input
['name', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.classList.remove('err');
    const errEl = document.getElementById(id + 'Err');
    if (errEl) errEl.textContent = '';
  });
});

function speakAlert(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate  = 0.9;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}

contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const messageEl = document.getElementById('message');

  const ok = [
    validate(nameEl,    'nameErr',    'Please enter your full name.'),
    validate(emailEl,   'emailErr',   'Please enter your email address.'),
    validate(messageEl, 'messageErr', 'Please tell us about your project.'),
  ].every(Boolean);

  if (!ok) return;

  // Loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  formErrMsg.style.display = 'none';

  try {
    const res = await fetch('https://formsubmit.co/ajax/lannyirwan@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    });

    if (!res.ok) throw new Error('Server error');

    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    speakAlert('HURRAY! Your form is submitted successfully.');
  } catch {
    formErrMsg.style.display = 'flex';
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

/* ================================================
   BACK TO TOP
   ================================================ */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
