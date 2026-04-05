/**
 * ══════════════════════════════════════════════════════
 * JCI - Shop By Brand  |  assets/jci-shop-by-brand.js
 *
 * - Flat image_card blocks grouped by data-group attr
 * - Tabs filter items via [hidden] attribute
 * - Desktop: CSS grid shows all (JS does nothing extra)
 * - Mobile ≤749px: one card at a time carousel via
 *   jci-shop-brand__logo-item--carousel-active class
 * - No jQuery. Multi-instance safe.
 * ══════════════════════════════════════════════════════
 */

(function () {
    'use strict';
  
    var MOBILE_BP       = 749;
    var CAROUSEL_CLASS  = 'jci-shop-brand__logo-item--carousel-active';
    var CONTROLS_HIDDEN = 'jci-shop-brand__controls--hidden';
  
    function isMobile() {
      return window.matchMedia('(max-width: ' + MOBILE_BP + 'px)').matches;
    }
  
    function initSection(section) {
      var tabs     = Array.from(section.querySelectorAll('.jci-shop-brand__tab'));
      var allItems = Array.from(section.querySelectorAll('.jci-shop-brand__logo-item'));
      var controls = section.querySelector('.jci-shop-brand__controls');
      var prevBtn  = section.querySelector('.jci-shop-brand__arrow--prev');
      var nextBtn  = section.querySelector('.jci-shop-brand__arrow--next');
  
      if (allItems.length === 0) return;
  
      var carouselIndex = 0;
  
      /* Returns items NOT hidden by [hidden] attribute */
      function getVisibleItems() {
        return allItems.filter(function (item) {
          return !item.hasAttribute('hidden');
        });
      }
  
      /* Show/hide the arrow controls */
      function updateControls(visibleItems) {
        if (!controls) return;
        if (!isMobile() || visibleItems.length <= 1) {
          controls.classList.add(CONTROLS_HIDDEN);
        } else {
          controls.classList.remove(CONTROLS_HIDDEN);
        }
      }
  
      /*
       * Desktop: clear all carousel classes — CSS grid handles layout.
       * Mobile:  show only item at `index`, hide rest via class.
       */
      function applyCarousel(visibleItems, index) {
        /* Always clear first */
        allItems.forEach(function (item) {
          item.classList.remove(CAROUSEL_CLASS);
        });
  
        if (!isMobile()) {
          /* Desktop — nothing more needed, CSS grid shows all */
          return;
        }
  
        if (visibleItems.length === 0) return;
  
        var len     = visibleItems.length;
        var clamped = ((index % len) + len) % len;
        carouselIndex = clamped;
        visibleItems[clamped].classList.add(CAROUSEL_CLASS);
      }
  
      /* Switch the active tab */
      function activateTab(group) {
        /* Update tab button states */
        tabs.forEach(function (tab) {
          var active = tab.dataset.tab === group;
          tab.classList.toggle('jci-shop-brand__tab--active', active);
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
  
        /* Show items for this group, hide others */
        allItems.forEach(function (item) {
          if (item.dataset.group === group) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
            item.classList.remove(CAROUSEL_CLASS);
          }
        });
  
        /* Reset to first slide on tab switch */
        carouselIndex = 0;
        var visible = getVisibleItems();
        applyCarousel(visible, 0);
        updateControls(visible);
      }
  
      /* Tab click */
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activateTab(this.dataset.tab);
        });
  
        /* Keyboard nav (ARIA tablist pattern) */
        tab.addEventListener('keydown', function (e) {
          var idx    = tabs.indexOf(tab);
          var target = null;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            target = tabs[(idx + 1) % tabs.length];
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            target = tabs[(idx - 1 + tabs.length) % tabs.length];
          } else if (e.key === 'Home') {
            e.preventDefault();
            target = tabs[0];
          } else if (e.key === 'End') {
            e.preventDefault();
            target = tabs[tabs.length - 1];
          }
          if (target) { target.focus(); activateTab(target.dataset.tab); }
        });
      });
  
      /* Prev / Next arrows */
      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          applyCarousel(getVisibleItems(), carouselIndex - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          applyCarousel(getVisibleItems(), carouselIndex + 1);
        });
      }
  
      /* Touch swipe */
      var logosEl = section.querySelector('.jci-shop-brand__logos');
      if (logosEl) {
        var startX = null;
        logosEl.addEventListener('touchstart', function (e) {
          startX = e.touches[0].clientX;
        }, { passive: true });
        logosEl.addEventListener('touchend', function (e) {
          if (startX === null) return;
          var diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            applyCarousel(getVisibleItems(), diff > 0 ? carouselIndex + 1 : carouselIndex - 1);
          }
          startX = null;
        }, { passive: true });
      }
  
      /* Resize: recalculate desktop vs mobile */
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          var visible = getVisibleItems();
          applyCarousel(visible, carouselIndex);
          updateControls(visible);
        }, 150);
      });
  
      /* ── INIT ── */
      if (tabs.length > 0) {
        /* Activate first tab */
        activateTab(tabs[0].dataset.tab);
      } else {
        /* No tabs — show items directly */
        var visible = getVisibleItems();
        applyCarousel(visible, 0);
        updateControls(visible);
      }
    }
  
    /* Find and boot all section instances */
    function boot() {
      document.querySelectorAll('.jci-shop-brand').forEach(initSection);
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  
    /* Shopify Theme Editor live-reload support */
    document.addEventListener('shopify:section:load', function (e) {
      var el = e.target && e.target.querySelector('.jci-shop-brand');
      if (el) initSection(el);
    });
  
  })();