/* =============================================
   THAI PHUOC BUI — PORTFOLIO JAVASCRIPT
   ============================================= */

// ---- Typewriter Effect ----
const phrases = [
  'SoC / RTL Design Engineer (Aspiring)',
  'Verilog / FPGA Developer',
  'Design Verification Enthusiast',
  'Embedded Systems Developer',
  'RISC-V SoC Explorer',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 50 : 90;
  if (!isDeleting && charIndex === current.length) {
    speed = 1800; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }
  setTimeout(typeWriter, speed);
}
window.addEventListener('load', () => setTimeout(typeWriter, 1400));

// ---- Navbar Scroll Style ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,0.5)' : 'none';
}, { passive: true });

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Scroll Reveal ----
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
document.querySelectorAll(
  '.about-grid, .skill-card, .project-card, .award-item, .contact-card, .contact-desc'
).forEach(el => el.classList.add('reveal'));
window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll();

// ---- Active Nav Link ----
const sections = document.querySelectorAll('section[id]');
const navAnchorList = document.querySelectorAll('.nav-links a');
function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchorList.forEach(a => {
    a.style.color = (a.getAttribute('href') === '#' + current) ? 'var(--accent)' : '';
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });


// ============================================================
//  PROJECT MODALS
// ============================================================

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // lock background scroll
  overlay.scrollTop = 0;                   // reset modal scroll to top
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Open — clicking the GitHub button on each project card
document.querySelectorAll('.btn-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    openModal(btn.dataset.modal);
  });
});

// Close — clicking the X button inside a modal
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

// Close — clicking the dark backdrop (outside the modal box)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Close — pressing Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
      closeModal(overlay.id);
    });
  }
});


// ============================================================
//  GALLERY — Add real photo (click placeholder → file input)
// ============================================================
document.querySelectorAll('.gallery-placeholder').forEach(placeholder => {
  placeholder.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      // Replace placeholder with real image
      const imgDiv = document.createElement('div');
      imgDiv.className = 'gallery-img';
      imgDiv.innerHTML = `<img src="${url}" alt="${file.name}" />`;
      placeholder.replaceWith(imgDiv);
      // Click to enlarge
      imgDiv.addEventListener('click', () => window.open(url, '_blank'));
    };
    input.click();
  });
});
