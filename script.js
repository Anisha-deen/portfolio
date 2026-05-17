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

// =============================================
// LIGHTBOX — Gallery & Creative section
// Click image → open full-screen image viewer
// Click video → open full-screen with sound + controls
// Close → ✕ button | backdrop click | Escape key
// =============================================
(function () {
  const lightbox       = document.getElementById('lightbox');
  const backdrop       = document.getElementById('lightboxBackdrop');
  const closeBtn       = document.getElementById('lightboxClose');
  const caption        = document.getElementById('lightboxCaption');
  const imgWrap        = document.getElementById('lightboxImgWrap');
  const lightboxImg    = document.getElementById('lightboxImg');
  const videoWrap      = document.getElementById('lightboxVideoWrap');
  const lightboxVideo  = document.getElementById('lightboxVideo');

  if (!lightbox) return; // safety guard

  // ── Open helpers ─────────────────────────────────────────────────────────

  function openImage(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    caption.textContent = alt || '';
    imgWrap.style.display   = 'flex';
    videoWrap.style.display = 'none';
    // Reset any leftover video
    lightboxVideo.pause();
    lightboxVideo.src = '';
    showLightbox();
  }

  function openVideo(src, label) {
    lightboxVideo.src = src;
    lightboxVideo.muted = false;    // sound ON in lightbox
    caption.textContent = label || '';
    imgWrap.style.display   = 'none';
    videoWrap.style.display = 'flex';
    showLightbox();
    // Small delay so the DOM is visible before play()
    setTimeout(() => lightboxVideo.play().catch(() => {}), 80);
  }

  function showLightbox() {
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden'; // prevent background scroll
    // Animate in
    requestAnimationFrame(() => lightbox.classList.add('lb-open'));
  }

  // ── Close helper ─────────────────────────────────────────────────────────

  function closeLightbox() {
    lightbox.classList.remove('lb-open');
    // Wait for CSS transition to finish, then hide
    lightbox.addEventListener('transitionend', function handler() {
      lightbox.hidden = true;
      lightbox.removeEventListener('transitionend', handler);
    });
    // Stop video & release src so browser stops buffering
    lightboxVideo.pause();
    lightboxVideo.src = '';
    lightboxImg.src   = '';
    document.body.style.overflow = '';
  }

  // ── Close triggers ───────────────────────────────────────────────────────

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  // ── Attach to Gallery section items ──────────────────────────────────────
  // Selector: every .gallery-img-box that contains an <img>

  document.querySelectorAll('.gallery-item .gallery-img-box').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;

    box.style.cursor = 'zoom-in';
    box.addEventListener('click', () => {
      // Use dataset label from the overlay span, else fall back to alt
      const label = box.querySelector('.gallery-overlay span')?.textContent
                    || img.alt || '';
      openImage(img.src, label);
    });
  });

  // ── Attach to Creative / Design-grid items ───────────────────────────────
  // Images → image mode, Videos → video mode

  document.querySelectorAll('.design-card .design-img-box').forEach(box => {
    const img   = box.querySelector('img');
    const video = box.querySelector('video');

    // Label from the overlay title span
    const label = box.querySelector('.design-title')?.textContent
                  || box.querySelector('.design-cat')?.textContent
                  || '';

    if (video) {
      // Card has a video — open in video lightbox
      box.style.cursor = 'pointer';
      box.addEventListener('click', () => openVideo(video.src || video.currentSrc, label));
    } else if (img) {
      // Card has only an image
      box.style.cursor = 'zoom-in';
      box.addEventListener('click', () => openImage(img.src, label));
    }
  });

  // ── Attach to Projects section video boxes ───────────────────────────────
  // Each .project-video-box contains a looping muted preview video.
  // Clicking it opens the same video in the lightbox WITH sound + controls.

  document.querySelectorAll('.project-video-box').forEach(box => {
    const video = box.querySelector('.project-video');
    if (!video) return;

    // Grab the project title from the nearest parent card
    const card  = box.closest('.project-card');
    const label = card?.querySelector('.project-title')?.textContent?.trim() || '';

    box.style.cursor = 'pointer';

    box.addEventListener('click', () => {
      openVideo(video.src || video.currentSrc, label);
    });
  });

})();


// CONTACT FORM — Web3Forms Integration
// Handles submission via fetch() so the page
// never reloads. Shows loading / success / error
// states inline, then clears the form on success.
// =============================================
(function () {
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const successBox  = document.getElementById('formSuccess');
  const errorBox    = document.getElementById('formError');

  // Guard: do nothing if the contact section isn't on this page
  if (!form) return;

  // ── Helpers ──────────────────────────────────────────────────────────────

  /** Show the submit button in its loading state */
  function setLoading(state) {
    form.classList.toggle('loading', state);
    submitBtn.disabled = state;
  }

  /** Show the success banner and hide the error banner */
  function showSuccess() {
    successBox.hidden = false;
    errorBox.hidden   = true;
    // Auto-hide the success message after 8 seconds
    setTimeout(() => { successBox.hidden = true; }, 8000);
  }

  /** Show the error banner and hide the success banner */
  function showError() {
    errorBox.hidden   = false;
    successBox.hidden = true;
  }

  /** Hide both feedback banners */
  function hideFeedback() {
    successBox.hidden = true;
    errorBox.hidden   = true;
  }

  // ── Manual HTML5-style validation ────────────────────────────────────────
  // novalidate is set on the form so we control the UX ourselves.

  function validateForm() {
    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const message = form.querySelector('#message');

    // Trim whitespace before checking
    if (!name.value.trim() || name.value.trim().length < 2) {
      name.focus();
      name.setCustomValidity('Please enter your name (at least 2 characters).');
      name.reportValidity();
      name.setCustomValidity('');   // reset so next submit re-evaluates
      return false;
    }

    // Basic email pattern check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRe.test(email.value.trim())) {
      email.focus();
      email.setCustomValidity('Please enter a valid email address.');
      email.reportValidity();
      email.setCustomValidity('');
      return false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      message.focus();
      message.setCustomValidity('Please enter a message (at least 10 characters).');
      message.reportValidity();
      message.setCustomValidity('');
      return false;
    }

    return true;
  }

  // ── Form submit handler ───────────────────────────────────────────────────

  form.addEventListener('submit', async (e) => {
    // Always prevent the default browser redirect/reload
    e.preventDefault();

    hideFeedback();

    // Client-side validation before hitting the API
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Build the payload from form fields
      const formData = new FormData(form);
      const payload  = Object.fromEntries(formData.entries());

      // POST to Web3Forms API as JSON
      const response = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':        'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // ✅ Submission accepted by Web3Forms
        showSuccess();
        form.reset();   // clear all fields
      } else {
        // API returned a non-2xx status or success:false
        console.error('Web3Forms error:', result);
        showError();
      }
    } catch (networkError) {
      // Network failure (offline, DNS error, etc.)
      console.error('Network error:', networkError);
      showError();
    } finally {
      // Always re-enable the button regardless of outcome
      setLoading(false);
    }
  });
})();
