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
    speed = 1800;
    isDeleting = true;
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
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Scroll Reveal ----
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

// Add .reveal to all major content blocks
document.querySelectorAll(
  '.about-grid, .skill-card, .project-card, .award-item, .contact-card, .contact-desc'
).forEach(el => el.classList.add('reveal'));

window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll(); // run once on load

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchorList = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.id;
    }
  });
  navAnchorList.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent)';
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
