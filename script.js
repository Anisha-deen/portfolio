const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";

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
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Trigger running numbers if it's an impact item
      const num = entry.target.querySelector('.impact-num');
      if (num && !num.classList.contains('animated')) {
        const target = parseInt(num.getAttribute('data-target'));
        animateValue(num, 0, target, 2000);
        num.classList.add('animated');
      }
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== RUNNING NUMBERS =====
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentVal = Math.floor(progress * (end - start) + start);
    obj.innerHTML = currentVal;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize Hero stats on load
window.addEventListener('load', () => {
  const heroStats = document.querySelectorAll('.stat-num');
  heroStats.forEach(stat => {
    const targetStr = stat.textContent.trim();
    const isPlus = targetStr.includes('+');
    const target = parseInt(targetStr.replace('+', ''));
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
      const currentVal = Math.floor(progress * target);
      stat.innerHTML = currentVal + (isPlus ? '+' : '');
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  });
});

// ===== MAGNETIC BUTTONS =====
const magneticBtns = document.querySelectorAll('.btn, .nav-cta, .contact-item');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== CURSOR TRAIL (SUBTLE) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const blobs = document.querySelectorAll('.blob');

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  // Parallax blobs
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;
  
  blobs.forEach((blob, index) => {
    const factor = (index + 1) * 0.5;
    blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
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
  if (!heroRole) return;
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

// ===== TOUCH & HOVER ACTIVE STATES (All Devices) =====
// Fires on cursor hover AND tap for universal interaction support
function addTouchEffect(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    // Mouse hover (desktop & DevTools)
    el.addEventListener('mouseenter', () => {
      el.classList.add('touch-active');
    });
    el.addEventListener('mouseleave', () => {
      el.classList.remove('touch-active');
    });

    // Touch (mobile & tablet)
    el.addEventListener('touchstart', () => {
      el.classList.add('touch-active');
    }, { passive: true });
    el.addEventListener('touchend', () => {
      setTimeout(() => el.classList.remove('touch-active'), 400);
    }, { passive: true });
    el.addEventListener('touchcancel', () => {
      el.classList.remove('touch-active');
    }, { passive: true });
  });
}

addTouchEffect('.profile-frame');
addTouchEffect('.about-card');
addTouchEffect('.project-card');
addTouchEffect('.cert-card');
addTouchEffect('.workshop-item');
addTouchEffect('.exp-card');
addTouchEffect('.gallery-item');
addTouchEffect('.design-card');
