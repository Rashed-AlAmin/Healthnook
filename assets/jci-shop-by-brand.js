/**
 * ══════════════════════════════════════════════════════
 * JCI - Shop By Brand  |  assets/jci-shop-by-brand.js
 *
 * - Flat image_card blocks grouped by data-group attr
 * - Tabs filter items via [hidden] attribute
 * - Desktop: CSS grid shows all
 * - Mobile ≤749px: shows up to 4 cards at a time
 * - Prev/Next arrows paginate by groups of 4 on mobile
 * - No jQuery. Multi-instance safe.
 * ══════════════════════════════════════════════════════
 */

(function () {
    'use strict';
  
    var MOBILE_BP = 749;
    var ACTIVE_CLASS = 'jci-shop-brand__logo-item--carousel-active';
    var CONTROLS_HIDDEN = 'jci-shop-brand__controls--hidden';
    var MOBILE_ITEMS_PER_PAGE = 4;
  
    function isMobile() {
      return window.matchMedia('(max-width: ' + MOBILE_BP + 'px)').matches;
    }
  
    function initSection(section) {
      var tabs = Array.from(section.querySelectorAll('.jci-shop-brand__tab'));
      var allItems = Array.from(section.querySelectorAll('.jci-shop-brand__logo-item'));
      var controls = section.querySelector('.jci-shop-brand__controls');
      var prevBtn = section.querySelector('.jci-shop-brand__arrow--prev');
      var nextBtn = section.querySelector('.jci-shop-brand__arrow--next');
  
      if (!allItems.length) return;
  
      var currentPage = 0;
  
      function getVisibleItems() {
        return allItems.filter(function (item) {
          return !item.hasAttribute('hidden');
        });
      }
  
      function clearActiveClasses() {
        allItems.forEach(function (item) {
          item.classList.remove(ACTIVE_CLASS);
        });
      }
  
      function updateControls(visibleItems) {
        if (!controls) return;
  
        if (!isMobile()) {
          controls.classList.add(CONTROLS_HIDDEN);
          return;
        }
  
        var totalPages = Math.ceil(visibleItems.length / MOBILE_ITEMS_PER_PAGE);
  
        if (totalPages <= 1) {
          controls.classList.add(CONTROLS_HIDDEN);
        } else {
          controls.classList.remove(CONTROLS_HIDDEN);
        }
      }
  
      function applyCarousel(visibleItems, pageIndex) {
        clearActiveClasses();
  
        if (!isMobile()) {
          return;
        }
  
        if (!visibleItems.length) return;
  
        var totalPages = Math.ceil(visibleItems.length / MOBILE_ITEMS_PER_PAGE);
        var clampedPage = ((pageIndex % totalPages) + totalPages) % totalPages;
        currentPage = clampedPage;
  
        var start = clampedPage * MOBILE_ITEMS_PER_PAGE;
        var end = start + MOBILE_ITEMS_PER_PAGE;
  
        visibleItems.slice(start, end).forEach(function (item) {
          item.classList.add(ACTIVE_CLASS);
        });
      }
  
      function activateTab(group) {
        tabs.forEach(function (tab) {
          var active = tab.dataset.tab === group;
          tab.classList.toggle('jci-shop-brand__tab--active', active);
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
  
        allItems.forEach(function (item) {
          if (item.dataset.group === group) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
            item.classList.remove(ACTIVE_CLASS);
          }
        });
  
        currentPage = 0;
        var visible = getVisibleItems();
        applyCarousel(visible, 0);
        updateControls(visible);
      }
  
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activateTab(this.dataset.tab);
        });
  
        tab.addEventListener('keydown', function (e) {
          var idx = tabs.indexOf(tab);
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
  
          if (target) {
            target.focus();
            activateTab(target.dataset.tab);
          }
        });
      });
  
      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          applyCarousel(getVisibleItems(), currentPage - 1);
        });
      }
  
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          applyCarousel(getVisibleItems(), currentPage + 1);
        });
      }
  
      window.addEventListener('resize', function () {
        var visible = getVisibleItems();
        applyCarousel(visible, currentPage);
        updateControls(visible);
      });
  
      if (tabs.length > 0) {
        activateTab(tabs[0].dataset.tab);
      } else {
        var visible = getVisibleItems();
        applyCarousel(visible, 0);
        updateControls(visible);
      }
    }
  
    function boot() {
      document.querySelectorAll('.jci-shop-brand').forEach(initSection);
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  
    document.addEventListener('shopify:section:load', function (e) {
      var el = e.target && e.target.querySelector('.jci-shop-brand');
      if (el) initSection(el);
    });
  })();