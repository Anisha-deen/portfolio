// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.skill-card, .exp-card, .project-card, .contact-item, .about-content, .about-visual, .hero-badge, .hero-stats');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  setTimeout(() => {
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    form.reset();
    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }, 1200);
});

// ===== TYPING EFFECT ON HERO ROLE =====
const heroRole = document.querySelector('.hero-role');
const roles = [
  'React Native Developer',
  'Full Stack Developer',
  'Mobile App Developer',
  'Real-Time Systems Builder'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    heroRole.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    heroRole.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeRole, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeRole, isDeleting ? 60 : 100);
}

setTimeout(typeRole, 1000);
