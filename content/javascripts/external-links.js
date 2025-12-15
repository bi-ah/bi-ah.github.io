// Open external links in a new tab (site-wide).
// - Only affects http(s) URLs pointing to a different origin.
// - Leaves internal/relative links and special schemes (mailto:, tel:, etc.) untouched.

(function () {
  function isHttpUrl(href) {
    return /^https?:\/\//i.test(href) || /^\/\//.test(href);
  }

  function isSkippableScheme(href) {
    return /^(mailto:|tel:|sms:|whatsapp:|skype:)/i.test(href);
  }

  function toAbsolute(href) {
    // Support protocol-relative links (//example.com)
    if (/^\/\//.test(href)) {
      return window.location.protocol + href;
    }
    try {
      return new URL(href, window.location.href);
    } catch (_err) {
      return null;
    }
  }

  function markExternalLinks() {
    var anchors = document.querySelectorAll('a[href]');
    var origin = window.location.origin;

    anchors.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      if (isSkippableScheme(href)) return;
      if (!isHttpUrl(href)) return;

      var url = toAbsolute(href);
      if (!url) return;
      if (url.origin === origin) return;

      a.setAttribute('target', '_blank');

      // Preserve existing rel values, but ensure safety
      var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      ['noopener', 'noreferrer'].forEach(function (v) {
        if (!rel.includes(v)) rel.push(v);
      });
      a.setAttribute('rel', rel.join(' '));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markExternalLinks);
  } else {
    markExternalLinks();
  }
})();
