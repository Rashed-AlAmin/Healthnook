/**
 * JCI - Featured Collection  |  assets/jci-featured-collection.js
 *
 * Initialises Swiper for both mobile and desktop.
 * Desktop: 4 visible slides, 14px gap, arrow buttons in the title header.
 * Mobile:  auto-width slides (313px via CSS), 17.69px gap, no arrows shown.
 */

(function () {
  'use strict';

  function initFCSwiper(section) {
    var el = section.querySelector('.jci-fc-swiper');
    if (!el || typeof Swiper === 'undefined') return;

    new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 17.69,
      navigation: {
        prevEl: section.querySelector('.jci-trending__arrow--prev'),
        nextEl: section.querySelector('.jci-trending__arrow--next'),
      },
      breakpoints: {
        750: {
          slidesPerView: 4,
          spaceBetween: 14,
        },
      },
    });
  }

  function boot() {
    document.querySelectorAll('.jci-featured-collection').forEach(initFCSwiper);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Re-init when section reloaded in theme editor
  document.addEventListener('shopify:section:load', function (e) {
    var el = e.target && e.target.querySelector('.jci-featured-collection');
    if (el) initFCSwiper(el);
  });
})();
