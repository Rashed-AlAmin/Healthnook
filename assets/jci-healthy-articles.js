/**
 * ══════════════════════════════════════════════════════
 * JCI - Healthy Articles  |  assets/jci-healthy-articles.js
 *
 * Custom article queue slider — no Swiper dependency.
 *
 * Desktop: 3-slot layout
 *   - Right = active featured article
 *   - Left top = next queued article (slot +1)
 *   - Left bottom = after-next article (slot +2)
 *   Prev/Next arrows rotate the queue.
 *
 * Mobile: Only the featured slot is visible (CSS hides left).
 *   Arrows still navigate the same queue.
 *
 * Scoped per section — multi-instance safe.
 * ══════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ── HTML escaping helper ─────────────────────────── */
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ── Build small card HTML ───────────────────────── */
  function renderSmall(art) {
    var link = esc(art.btn_link || '#');
    var cta  = esc(art.btn_label || 'Read Article');
    return (
      '<a class="jci-ha__small-link" href="' + link + '" aria-label="' + esc(art.title) + '">' +
        '<p class="jci-ha__small-eyebrow">' + esc(art.eyebrow) + '</p>' +
        '<h3 class="jci-ha__small-title">' + esc(art.title) + '</h3>' +
        '<span class="jci-ha__small-cta">' + cta + ' \u2192</span>' +
      '</a>'
    );
  }

  /* ── Build featured card HTML ────────────────────── */
  function renderFeatured(art) {
    var link = esc(art.btn_link || '#');
    var cta  = esc(art.btn_label || 'Read Article');

    var imgHtml = '';
    if (art.image_url) {
      imgHtml = (
        '<img' +
          ' class="jci-ha__feat-img"' +
          ' src="' + esc(art.image_url) + '"' +
          ' alt="' + esc(art.image_alt) + '"' +
          ' loading="lazy"' +
        '>'
      );
    }

    return (
      '<div class="jci-ha__feat-inner">' +
        '<div class="jci-ha__feat-top-row">' +
          '<p class="jci-ha__feat-eyebrow">' + esc(art.eyebrow) + '</p>' +
          '<a class="jci-ha__feat-cta jci-ha__feat-cta--top" href="' + link + '">' + cta + ' \u2192</a>' +
        '</div>' +
        '<h3 class="jci-ha__feat-title">' + esc(art.title) + '</h3>' +
        '<p class="jci-ha__feat-desc">'  + esc(art.description) + '</p>' +
        imgHtml +
        '<a class="jci-ha__feat-cta jci-ha__feat-cta--bot" href="' + link + '">' + cta + ' \u2192</a>' +
      '</div>'
    );
  }

  /* ── Initialise one section ──────────────────────── */
  function initSection(sectionEl) {
    var sid = sectionEl.dataset.sectionId;
    if (!sid) return;

    /* Read article data from embedded JSON */
    var dataEl = document.getElementById('jci-ha-data-' + sid);
    if (!dataEl) return;

    var articles;
    try {
      articles = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }

    if (!Array.isArray(articles) || articles.length === 0) return;

    var total     = articles.length;
    var activeIdx = 0;

    /* DOM targets */
    var featuredEl  = document.getElementById('jci-ha-featured-'  + sid);
    var topSmallEl  = document.getElementById('jci-ha-small-top-' + sid);
    var botSmallEl  = document.getElementById('jci-ha-small-bot-' + sid);
    var leftColEl   = document.getElementById('jci-ha-left-'      + sid);
    var prevBtn     = sectionEl.querySelector('.jci-ha__arrow--prev');
    var nextBtn     = sectionEl.querySelector('.jci-ha__arrow--next');

    /* Hide left column entirely when only 1 article */
    if (leftColEl) {
      leftColEl.style.display = total > 1 ? '' : 'none';
    }

    /* Circular index helper */
    function at(offset) {
      return ((activeIdx + offset) % total + total) % total;
    }

    /* Push new content into each slot */
    function update() {
      if (featuredEl) {
        featuredEl.innerHTML = renderFeatured(articles[at(0)]);
      }
      if (topSmallEl) {
        topSmallEl.innerHTML = total > 1 ? renderSmall(articles[at(1)]) : '';
      }
      if (botSmallEl) {
        botSmallEl.innerHTML = total > 2 ? renderSmall(articles[at(2)]) : '';
      }
    }

    /* Arrow click handlers */
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        activeIdx = at(-1);
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        activeIdx = at(1);
        update();
      });
    }

    /* Keyboard: arrow keys on buttons navigate the queue */
    [prevBtn, nextBtn].forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          activeIdx = at(-1);
          update();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          activeIdx = at(1);
          update();
        }
      });
    });

    /* Initial render */
    update();
  }

  /* ── Boot: find all healthy-articles sections ─────── */
  function boot() {
    document.querySelectorAll('.jci-ha[data-section-id]').forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* Re-init when section is reloaded in the theme editor */
  document.addEventListener('shopify:section:load', function (e) {
    var el = e.target && e.target.querySelector('.jci-ha[data-section-id]');
    if (el) initSection(el);
  });

})();
