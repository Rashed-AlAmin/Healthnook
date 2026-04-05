/**
 * ══════════════════════════════════════════════════════
 * JCI - Shop By Brand  |  assets/jci-shop-by-brand.js
 *
 * - No jQuery. Vanilla ES6+.
 * - Section-instance scoped: supports multiple section
 *   instances on the same page without conflicts.
 * - Tabs switch logo panels.
 * - Mobile carousel: prev/next cycle through logos in
 *   the active panel.
 * ══════════════════════════════════════════════════════
 */

(function () {
    'use strict';
  
    /**
     * Initialize one section instance.
     * @param {HTMLElement} section
     */
    function initShopByBrand(section) {
      const tabs     = Array.from(section.querySelectorAll('.jci-shop-brand__tab'));
      const panels   = Array.from(section.querySelectorAll('.jci-shop-brand__panel'));
      const prevBtns = Array.from(section.querySelectorAll('.jci-shop-brand__arrow--prev'));
      const nextBtns = Array.from(section.querySelectorAll('.jci-shop-brand__arrow--next'));
  
      if (tabs.length === 0) return;
  
      // ── Per-panel carousel state ──────────────────────
      // Store the current logo index for each panel key.
      const carouselState = {};
  
      panels.forEach(function (panel) {
        carouselState[panel.dataset.panelKey] = 0;
      });
  
      // ── Helpers ───────────────────────────────────────
  
      /**
       * Get all logo items inside a panel.
       * @param {HTMLElement} panel
       * @returns {HTMLElement[]}
       */
      function getLogos(panel) {
        return Array.from(panel.querySelectorAll('.jci-shop-brand__logo-item'));
      }
  
      /**
       * Activate the logo at `index` in `panel`, deactivate others.
       * @param {HTMLElement} panel
       * @param {number} index
       */
      function showLogo(panel, index) {
        const logos = getLogos(panel);
        if (logos.length === 0) return;
  
        // Clamp / wrap index
        const clamped = ((index % logos.length) + logos.length) % logos.length;
        carouselState[panel.dataset.panelKey] = clamped;
  
        logos.forEach(function (logo, i) {
          if (i === clamped) {
            logo.classList.add('jci-shop-brand__logo-item--active');
          } else {
            logo.classList.remove('jci-shop-brand__logo-item--active');
          }
        });
      }
  
      /**
       * Switch the active tab & panel.
       * @param {string} key  — data-tab-key / data-panel-key value
       */
      function activateTab(key) {
        // Update tab buttons
        tabs.forEach(function (tab) {
          const isActive = tab.dataset.tabKey === key;
          tab.classList.toggle('jci-shop-brand__tab--active', isActive);
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
  
        // Update panels
        panels.forEach(function (panel) {
          const isActive = panel.dataset.panelKey === key;
          panel.classList.toggle('jci-shop-brand__panel--active', isActive);
          if (isActive) {
            panel.removeAttribute('aria-hidden');
            // Restore carousel position for this panel
            showLogo(panel, carouselState[key] || 0);
          } else {
            panel.setAttribute('aria-hidden', 'true');
          }
        });
      }
  
      // ── Tab click handlers ────────────────────────────
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activateTab(tab.dataset.tabKey);
        });
  
        // Keyboard: arrow keys for ARIA tablist pattern
        tab.addEventListener('keydown', function (e) {
          let idx = tabs.indexOf(tab);
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = tabs[(idx + 1) % tabs.length];
            next.focus();
            activateTab(next.dataset.tabKey);
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
            prev.focus();
            activateTab(prev.dataset.tabKey);
          } else if (e.key === 'Home') {
            e.preventDefault();
            tabs[0].focus();
            activateTab(tabs[0].dataset.tabKey);
          } else if (e.key === 'End') {
            e.preventDefault();
            tabs[tabs.length - 1].focus();
            activateTab(tabs[tabs.length - 1].dataset.tabKey);
          }
        });
      });
  
      // ── Carousel arrow handlers ───────────────────────
      function getActivePanel() {
        return panels.find(function (p) {
          return p.classList.contains('jci-shop-brand__panel--active');
        });
      }
  
      prevBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const panel = getActivePanel();
          if (!panel) return;
          const current = carouselState[panel.dataset.panelKey] || 0;
          showLogo(panel, current - 1);
        });
      });
  
      nextBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const panel = getActivePanel();
          if (!panel) return;
          const current = carouselState[panel.dataset.panelKey] || 0;
          showLogo(panel, current + 1);
        });
      });
  
      // ── Swipe support (mobile touch) ─────────────────
      panels.forEach(function (panel) {
        let startX = null;
  
        panel.addEventListener('touchstart', function (e) {
          startX = e.touches[0].clientX;
        }, { passive: true });
  
        panel.addEventListener('touchend', function (e) {
          if (startX === null) return;
          const diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            const current = carouselState[panel.dataset.panelKey] || 0;
            showLogo(panel, diff > 0 ? current + 1 : current - 1);
          }
          startX = null;
        }, { passive: true });
      });
  
      // ── Initialise first tab ──────────────────────────
      if (tabs.length > 0) {
        activateTab(tabs[0].dataset.tabKey);
      }
    }
  
    // ── Boot: find all section instances ─────────────
    function boot() {
      document.querySelectorAll('[data-section-id]').forEach(function (el) {
        if (el.querySelector('.jci-shop-brand__tab')) {
          initShopByBrand(el);
        }
      });
    }
  
    // ── Run after DOM ready ───────────────────────────
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  
    // ── Shopify Theme Editor live-reload support ──────
    document.addEventListener('shopify:section:load', function (e) {
      const section = e.target;
      if (section && section.querySelector('.jci-shop-brand__tab')) {
        initShopByBrand(section);
      }
    });
  
  })();