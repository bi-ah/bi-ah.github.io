/*
  Home hero search box -> opens Material search.
  Works across Material versions by trying multiple strategies.
*/
(function () {
  function openSearch() {
    // Strategy 1: Material uses a hidden checkbox with id __search
    var cb = document.getElementById('__search');
    if (cb && cb.type === 'checkbox') {
      cb.checked = true;
      return true;
    }

    // Strategy 2: click a search toggle button
    var toggle = document.querySelector('[data-md-component="search"]') || document.querySelector('.md-header__button[for="__search"]');
    if (toggle && typeof toggle.click === 'function') {
      toggle.click();
      return true;
    }

    // Strategy 3: focus search input if present
    var input = document.querySelector('input[data-md-component="search-query"], .md-search__input');
    if (input && typeof input.focus === 'function') {
      input.focus();
      return true;
    }

    // Fallback: dispatch keyboard shortcut '/'
    try {
      var ev = new KeyboardEvent('keydown', { key: '/', code: 'Slash', bubbles: true });
      document.dispatchEvent(ev);
      return true;
    } catch (_) {
      return false;
    }
  }

  function bind() {
    document.querySelectorAll('[data-home-search]').forEach(function (el) {
      if (el.__bound) return;
      el.__bound = true;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch();
      });
    });
  }

  // Initial bind
  bind();

  // Material's instant navigation: bind on page changes
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function () {
      bind();
    });
  } else {
    document.addEventListener('DOMContentLoaded', bind);
  }
})();
