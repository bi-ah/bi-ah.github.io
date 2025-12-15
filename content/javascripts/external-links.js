// Open all external links in a new tab (site-wide), safely.
// - Applies to http/https links whose hostname differs from the current site.
// - Leaves internal/relative links, hash links, mailto:, tel:, and other schemes unchanged.
(function () {
  function isExternal(a) {
    try {
      var href = a.getAttribute("href");
      if (!href) return false;

      // Ignore anchors, mailto, tel, and other non-http(s) schemes
      if (href.startsWith("#")) return false;
      if (/^(mailto:|tel:|sms:|javascript:)/i.test(href)) return false;

      // Resolve relative URLs
      var url = new URL(href, window.location.href);

      // Only http(s) links
      if (!(url.protocol === "http:" || url.protocol === "https:")) return false;

      // Compare hostnames (handles custom domains + GitHub Pages)
      return url.hostname !== window.location.hostname;
    } catch (e) {
      return false;
    }
  }

  function apply() {
    var links = document.querySelectorAll('a[href]');
    links.forEach(function (a) {
      if (!isExternal(a)) return;

      a.setAttribute("target", "_blank");

      // Preserve existing rel, add security tokens
      var rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (!rel.includes("noopener")) rel.push("noopener");
      if (!rel.includes("noreferrer")) rel.push("noreferrer");
      a.setAttribute("rel", rel.join(" "));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();