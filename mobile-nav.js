/* ═══════════════════════════════════════════════════════════════════
   UNITVERSE — mobile-nav.js  v4
   5 botones directos en el nav. Sin drawer.
   Breakpoint unificado: 768px
   Cargar DESPUÉS de app.js y activities.js
═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const MOBILE_BP = 768;
  function isMobileNow() { return window.innerWidth <= MOBILE_BP; }

  const nav = document.getElementById('mobile-nav');
  if (!nav) return;

  /* ── Actualizar botón activo ──────────────────────────────────── */
  function setActive(panelId) {
    nav.querySelectorAll('.mn-btn[data-panel]').forEach(btn => {
      const isActive = btn.dataset.panel === panelId;
      btn.classList.toggle('mn-active', isActive);
    });
  }

  /* ── Navegar ──────────────────────────────────────────────────── */
  function goPanel(panelId) {
    if (typeof openPanel === 'function') openPanel(panelId);
    setActive(panelId);
  }

  /* ── Bind eventos (solo una vez) ─────────────────────────────── */
  let eventsBound = false;
  function bindEvents() {
    if (eventsBound) return;
    eventsBound = true;

    nav.querySelectorAll('.mn-btn[data-panel]').forEach(btn => {
      btn.addEventListener('click', () => goPanel(btn.dataset.panel));
    });

    /* Interceptar openPanel global para mantener estado activo */
    const _orig = window.openPanel;
    window.openPanel = function (panelId) {
      if (_orig) _orig(panelId);
      if (isMobileNow()) setActive(panelId);
    };
  }

  /* ── Mostrar/ocultar nav según tamaño ────────────────────────── */
  function applyMode() {
    if (isMobileNow()) {
      nav.style.display = 'flex';
      bindEvents();
      const current = (typeof currentPanel !== 'undefined') ? currentPanel : 'home';
      setActive(current);
    } else {
      nav.style.display = 'none';
    }
  }

  /* ── Init ─────────────────────────────────────────────────────── */
  applyMode();
  setActive('home');

  /* ── Resize ───────────────────────────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyMode, 120);
  });

})();