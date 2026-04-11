/* ══════════════════════════════════════════════════════
   JCI - Navigate By Product Features
   assets/jci-navigate-by-product-feature.js

   Handles View All / View Less expand-collapse for
   feature mode only. Does not touch brand mode at all.
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var MOBILE_BREAKPOINT = 749;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function initSection(section) {
    var grid  = section.querySelector('.jci-shop-brand__logos');
    var btn   = section.querySelector('.jci-feature-toggle-btn');

    if (!grid || !btn) return;

    var cards = Array.from(
      grid.querySelectorAll('.jci-shop-brand__logo-item--ti')
    );

    if (cards.length === 0) return;

    var labelMore     = btn.dataset.labelMore    || 'View All';
    var labelLess     = btn.dataset.labelLess    || 'View Less';
    var desktopLimit  = parseInt(btn.dataset.desktopLimit, 10) || 12;
    var mobileLimit   = parseInt(btn.dataset.mobileLimit,  10) || 3;
    var expanded      = false;
    var prevMobile    = isMobile();

    /* ── core display logic ── */
    function apply() {
      var limit = isMobile() ? mobileLimit : desktopLimit;

      /* If all cards fit within the limit, hide the button and show everything */
      if (cards.length <= limit) {
        cards.forEach(function (card) {
          card.removeAttribute('data-feature-hidden');
        });
        btn.parentElement.hidden = true;
        return;
      }

      btn.parentElement.hidden = false;

      if (expanded) {
        cards.forEach(function (card) {
          card.removeAttribute('data-feature-hidden');
        });
        btn.textContent  = labelLess;
        btn.setAttribute('aria-expanded', 'true');
      } else {
        cards.forEach(function (card, i) {
          if (i < limit) {
            card.removeAttribute('data-feature-hidden');
          } else {
            card.setAttribute('data-feature-hidden', '');
          }
        });
        btn.textContent  = labelMore;
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    /* ── button click ── */
    btn.addEventListener('click', function () {
      expanded = !expanded;
      apply();
    });

    /* ── resize: reset collapse when crossing the mobile breakpoint ── */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var nowMobile = isMobile();
        if (nowMobile !== prevMobile) {
          /* Breakpoint crossed — collapse back to initial state */
          expanded  = false;
          prevMobile = nowMobile;
        }
        apply();
      }, 150);
    });

    /* ── initial render ── */
    apply();
  }

  function init() {
    document.querySelectorAll('.jci-product-features').forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
