/**
 * Rural Capital, LLC - Landing Page
 * Vanilla JS: scroll reveals, header behavior, smooth nav, mobile menu
 */

(function () {
  'use strict';

  // Copyright year
  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ——— Scroll Reveal ———
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ——— Hero entrance (trigger immediately for above-fold elements) ———
  var heroReveals = document.querySelectorAll('.reveal-hero');
  requestAnimationFrame(function () {
    heroReveals.forEach(function (el) {
      el.classList.add('revealed');
    });
  });

  // ——— Header scroll behavior ———
  var header = document.getElementById('site-header');
  var scrollThreshold = 60;

  function updateHeader() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ——— Smooth scroll for anchor links ———
  var navLinks = document.querySelectorAll('a[href^="#"]');
  var headerHeight = 70;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // ——— Mobile menu ———
  var hamburger = document.getElementById('hamburger');
  var mainNav = document.getElementById('main-nav');

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = mainNav.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mainNav.classList.add('open');
      document.body.classList.add('lock-scroll');
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMobileMenu();
      hamburger.focus();
    }
  });
})();
