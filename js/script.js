/* ═══════════════════════════════════════════════════════════
   Citadel Chronicle — Script
   Theme toggle + scroll reveal
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Theme Toggle ── */
  const html = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const STORAGE_KEY = "citadel-theme";

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
      toggle.querySelector("span").textContent = theme === "dark" ? "☾" : "☀";
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) applyTheme(saved);

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ── Scroll Reveal ── */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }
})();
