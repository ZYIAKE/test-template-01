/* ============================================
   ATLINKER Template 02 — Pro Artisan Clean
   Main JavaScript — supports all class variants
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Sticky Header Shadow --- */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* --- Mobile Nav Toggle (supports both class naming conventions) --- */
  var hamburger = document.querySelector('.hamburger') || document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav') || document.querySelector('.mobile-nav-overlay');
  var mobileClose = document.querySelector('.mobile-close') || document.querySelector('.mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      var wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* --- Form Validation --- */
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#e74c3c';
          input.addEventListener('input', function () {
            this.style.borderColor = '';
          }, { once: true });
        }
      });
      var email = form.querySelector('input[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        valid = false;
        email.style.borderColor = '#e74c3c';
      }
      var phone = form.querySelector('input[type="tel"]');
      if (phone && phone.value && !/^[\d\s\+\.\-]{10,}$/.test(phone.value)) {
        valid = false;
        phone.style.borderColor = '#e74c3c';
      }
      if (!valid) {
        e.preventDefault();
        var firstError = form.querySelector('[style*="border-color"]');
        if (firstError) firstError.focus();
      }
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Animate stats on scroll --- */
  var statsAnimated = false;
  function animateStats() {
    if (statsAnimated) return;
    var statsSection = document.querySelector('.stats') || document.querySelector('.stats-bar');
    if (!statsSection) return;
    var rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;
      document.querySelectorAll('.stat-number').forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target') || el.textContent);
        var suffix = el.getAttribute('data-suffix') || '';
        if (isNaN(target)) return;
        var duration = 1500;
        var startTime = null;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
  }
  window.addEventListener('scroll', animateStats);
  animateStats();

  /* --- Multi-step form (devis page) --- */
  var devisForm = document.querySelector('.devis-form');
  if (devisForm) {
    var steps = devisForm.querySelectorAll('.form-step');
    var nextBtns = devisForm.querySelectorAll('.btn-next');
    var prevBtns = devisForm.querySelectorAll('.btn-prev');
    var progressBar = devisForm.querySelector('.progress-fill');
    var currentStep = 0;

    function showStep(n) {
      steps.forEach(function (s, i) {
        s.style.display = i === n ? 'block' : 'none';
      });
      if (progressBar) {
        progressBar.style.width = ((n + 1) / steps.length * 100) + '%';
      }
      devisForm.querySelectorAll('.step-indicator').forEach(function (ind, i) {
        ind.classList.toggle('active', i <= n);
      });
    }

    nextBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep < steps.length - 1) { currentStep++; showStep(currentStep); }
      });
    });
    prevBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep > 0) { currentStep--; showStep(currentStep); }
      });
    });
    showStep(0);
  }
});
