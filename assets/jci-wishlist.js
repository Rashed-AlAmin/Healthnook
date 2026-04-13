(function () {
  const KEY_PREFIX = 'sf_wishlist_';

  function getKey(productId) {
    return KEY_PREFIX + String(productId);
  }

  function getItem(productId) {
    try {
      return JSON.parse(localStorage.getItem(getKey(productId)));
    } catch (e) {
      return null;
    }
  }

  function saveItem(button) {
    const payload = {
      id: button.getAttribute('data-product-id'),
      handle: button.getAttribute('data-product-handle') || '',
      title: button.getAttribute('data-product-title') || '',
      url: button.getAttribute('data-product-url') || '',
      image: button.getAttribute('data-product-image') || '',
      price_cents: button.getAttribute('data-product-price-cents') || '',
      price_formatted: button.getAttribute('data-product-price-formatted') || ''
    };

    localStorage.setItem(getKey(payload.id), JSON.stringify(payload));
    return payload;
  }

  function removeItem(productId) {
    localStorage.removeItem(getKey(productId));
  }

  function syncButton(button) {
    if (!button) return;

    const productId = button.getAttribute('data-product-id');
    if (!productId) return;

    const active = !!getItem(productId);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  function syncAllButtons(scope) {
    const root = scope && scope.querySelectorAll ? scope : document;
    const buttons = root.querySelectorAll('.jci-fix-card__wishlist');
    buttons.forEach(syncButton);
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('.jci-fix-card__wishlist');
    if (!button) return;

    event.preventDefault();

    const productId = button.getAttribute('data-product-id');
    if (!productId) return;

    if (getItem(productId)) {
      removeItem(productId);
    } else {
      saveItem(button);
    }

    syncButton(button);
    window.dispatchEvent(
      new CustomEvent('sf:wishlist:changed', {
        detail: { productId: productId }
      })
    );
  });

  document.addEventListener('DOMContentLoaded', function () {
    syncAllButtons(document);
  });

  document.addEventListener('shopify:section:load', function (event) {
    syncAllButtons(event.target);
  });

  window.addEventListener('sf:wishlist:changed', function () {
    syncAllButtons(document);
  });
})();