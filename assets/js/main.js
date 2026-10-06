/**
 * Lumiere — MAIN SCRIPTS
 * Theme Toggle, RTL Toggle, Mobile Drawer, Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDrawer();
  initNavbarScroll();
  initBackToTop();
  initAnimations();
});

// ==========================================
// THEME TOGGLE
// ==========================================
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('Lumiere-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = 'light';
  
  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (systemPrefersDark) {
    currentTheme = 'dark';
  }
  
  applyTheme(currentTheme);
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem('Lumiere-theme', currentTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    if (theme === 'dark') {
      toggle.innerHTML = '<i class="ph ph-sun"></i>';
    } else {
      toggle.innerHTML = '<i class="ph ph-moon"></i>';
    }
  });
}


// ==========================================
// MOBILE DRAWER
// ==========================================
function initDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const overlay = document.querySelector('.drawer-overlay');
  
  if (!hamburger || !drawer) return;
  
  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  hamburger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ==========================================
// BACK TO TOP
// Built here rather than in markup so all pages pick it up.
// ==========================================
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="ph ph-arrow-up"></i>';
  document.body.appendChild(btn);

  const onScroll = () => {
    btn.classList.toggle('show', window.scrollY > 400);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}

// ==========================================
// ANIMATIONS OBSERVER
// ==========================================
function initAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  // Elements start hidden in CSS, so reveal everything if we can't observe.
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('fade-in-up'));
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.05
  });

  elements.forEach(el => observer.observe(el));
}

