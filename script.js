/**
 * =====================================================================================
 * YiShen Global Website — Core JavaScript Engine (V32.0)
 * -------------------------------------------------------------------------------------
 * Positioning:
 * Engineering-led · AI-ready · Deterministic · Enterprise-safe
 *
 * Design Principles:
 * ✔ Minimal execution
 * ✔ No marketing logic
 * ✔ No trackers
 * ✔ No dependencies
 * ✔ Fully compatible with static hosting
 *
 * Author: YiShen Global Engineering System
 * Status: PRODUCTION / CODE FREEZE SAFE
 * =====================================================================================
 */

(function () {
  'use strict';

  /* ============================================================================
     GLOBAL CONFIG (Frozen by Design)
  ============================================================================ */
  const CONFIG = {
    MOBILE_BREAKPOINT: 1024,
    LANG_STORAGE_KEY: 'lang',
    DEBUG: false
  };

  /* ============================================================================
     SAFE LOGGER (Disabled by Default)
  ============================================================================ */
  const log = (...args) => {
    if (CONFIG.DEBUG) console.log('[YiShen]', ...args);
  };

  /* ============================================================================
     DOM READY GUARD
  ============================================================================ */
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  /* ============================================================================
     CORE INIT
  ============================================================================ */
  onReady(() => {
    initMobileNavigation();
    initAccessibilityGuards();
    initI18nBridge();
    initRFQSafeguard();
    initFutureHooks();
  });

  /* ============================================================================
     MODULE A — MOBILE NAVIGATION (Elite UX)
  ============================================================================ */
  function initMobileNavigation() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    const open = () => navLinks.classList.add('active');
    const close = () => navLinks.classList.remove('active');
    const toggle = () => navLinks.classList.toggle('active');

    // Toggle via hamburger
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', close);
    });

    // Click outside closes menu
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        close();
      }
    });

    // ESC closes menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    log('Mobile navigation initialized');
  }

  /* ============================================================================
     MODULE B — ACCESSIBILITY & ENTERPRISE SAFEGUARDS
     (Quietly improves trust & compliance)
  ============================================================================ */
  function initAccessibilityGuards() {
    // Ensure all external links open safely
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
      if (!a.rel.includes('noopener')) {
        a.rel += ' noopener noreferrer';
      }
    });

    // Prevent accidental form auto-submit (enterprise UX)
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!form.dataset.allowSubmit) {
          e.preventDefault();
          log('Form submit blocked (safeguard)');
        }
      });
    });

    log('Accessibility guards applied');
  }

  /* ============================================================================
     MODULE C — I18N BRIDGE (AI-Compatible, No Coupling)
     Works with your existing i18n-engine.js
  ============================================================================ */
  function initI18nBridge() {
    const html = document.documentElement;
    const storedLang = localStorage.getItem(CONFIG.LANG_STORAGE_KEY);

    if (storedLang) {
      html.lang = storedLang;
    }

    // Optional future hook: AI language override
    window.YISHEN_I18N = {
      set(lang) {
        localStorage.setItem(CONFIG.LANG_STORAGE_KEY, lang);
        html.lang = lang;
        log('Language set:', lang);
      },
      get() {
        return html.lang || 'en';
      }
    };

    log('I18N bridge ready');
  }

  /* ============================================================================
     MODULE D — RFQ / SKU SAFEGUARD
     Prevents duplicated / malformed RFQ actions
  ============================================================================ */
  function initRFQSafeguard() {
    window.YISHEN_RFQ = window.YISHEN_RFQ || {
      items: new Set(),
      add(sku) {
        if (!sku) return;
        this.items.add(sku);
        log('RFQ add:', sku);
      },
      list() {
        return Array.from(this.items);
      },
      clear() {
        this.items.clear();
        log('RFQ cleared');
      }
    };
  }

  /* ============================================================================
     MODULE E — FUTURE AI / DATA HOOKS (INTENTIONALLY EMPTY)
     DO NOT IMPLEMENT WITHOUT STRATEGIC REVIEW
  ============================================================================ */
  function initFutureHooks() {
    /**
     * Reserved Interfaces:
     * ----------------------------------------
     * window.YISHEN_AI
     * window.YISHEN_DATA
     * window.YISHEN_ANALYTICS (SERVER-SIDE ONLY)
     *
     * Rules:
     * ❌ No client tracking
     * ❌ No cookies
     * ❌ No fingerprinting
     * ✔ AI pulls should be server-side or manual
     */
    log('Future hooks reserved');
  }

})();
