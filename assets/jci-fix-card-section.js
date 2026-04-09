/**
 * jci-fix-card-section.js
 *
 * Initialises Swiper for the JCI Fix Card Section.
 *
 * slidesPerView: 'auto' at all widths — Swiper reads the CSS-defined
 * slide width (314px desktop / 313px mobile) rather than computing a
 * fraction of the container. Cards stay at their designed size;
 * the number of visible cards scales naturally with viewport width:
 *
 *   ~375px mobile  →  ~1.1 cards + peek
 *   ~768px tablet  →  ~2.3 cards + peek
 *   ~1024px        →  ~3.1 cards + peek
 *   ~1440px        →  ~4.3 cards + peek
 *
 * Only spaceBetween changes at the breakpoint — nothing else.
 */

(function () {
  'use strict';

  function initSwiper(section) {
    var el = section.querySelector('.jci-fix-swiper');
    if (!el || typeof Swiper === 'undefined') return;

    new Swiper(el, {
      slidesPerView: 'auto', /* reads CSS flex-basis — never squeezes cards */
      spaceBetween: 16,
      navigation: {
        prevEl: section.querySelector('.jci-fix-section__arrow--prev'),
        nextEl: section.querySelector('.jci-fix-section__arrow--next'),
      },
      breakpoints: {
        750: {
          spaceBetween: 14, /* tighter gap on desktop; slidesPerView stays 'auto' */
        },
      },
    });
  }

  function boot() {
    document.querySelectorAll('.jci-fix-section').forEach(initSwiper);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* Re-initialise when the section reloads inside the theme editor */
  document.addEventListener('shopify:section:load', function (e) {
    var section = e.target && e.target.querySelector('.jci-fix-section');
    if (section) initSwiper(section);
  });
})();
