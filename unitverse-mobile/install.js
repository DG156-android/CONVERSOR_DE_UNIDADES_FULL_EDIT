/* ═══════════════════════════════════════════════════════════════════════════════
   UNITVERSE — install.js
   Gestiona la instalación de PWA, descarga como APK y opciones de instalación
═══════════════════════════════════════════════════════════════════════════════ */

let deferredPrompt = null; // Almacena el evento beforeinstallprompt

/* ──────────────────────────────────────────────────────────────────────────────
   CAPTURAR EL EVENTO beforeinstallprompt
   Se dispara cuando el navegador detecta que la app es instalable
────────────────────────────────────────────────────────────────────────────── */
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
  console.log('[UnitVerse] App instalable detectada');
});

/* ──────────────────────────────────────────────────────────────────────────────
   MOSTRAR/OCULTAR BOTÓN DE INSTALACIÓN
────────────────────────────────────────────────────────────────────────────── */
function showInstallButton() {
  const btn = document.getElementById('install-app-btn');
  if (btn) {
    btn.style.display = 'flex';
    btn.setAttribute('aria-hidden', 'false');
  }
}

function hideInstallButton() {
  const btn = document.getElementById('install-app-btn');
  if (btn) {
    btn.style.display = 'none';
    btn.setAttribute('aria-hidden', 'true');
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   MANEJAR CLICK EN BOTÓN "INSTALAR"
────────────────────────────────────────────────────────────────────────────── */
async function promptInstall() {
  if (!deferredPrompt) {
    showInstallModal('NON_PWA');
    return;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('[UnitVerse] App instalada correctamente');
    deferredPrompt = null;
    hideInstallButton();
    showNotification('✓ UnitVerse instalada como app', 'success');
  } else {
    console.log('[UnitVerse] Instalación rechazada');
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   MODAL DE OPCIONES DE INSTALACIÓN/DESCARGA
────────────────────────────────────────────────────────────────────────────── */
function showInstallModal(type = 'PWA') {
  const overlay = document.getElementById('install-modal-overlay');
  const modal = document.getElementById('install-modal');
  
  if (!overlay || !modal) {
    console.warn('[UnitVerse] Elementos de modal no encontrados');
    return;
  }

  const body = document.getElementById('install-modal-body');
  
  if (type === 'PWA') {
    body.innerHTML = `
      <div class="install-option browser-install">
        <div class="option-icon">📱</div>
        <h3>Instalar en este dispositivo</h3>
        <p>Acceso rápido desde tu pantalla de inicio. Funciona sin conexión.</p>
        <button class="option-btn primary" onclick="promptInstall()">Instalar ahora</button>
      </div>
    `;
  } else if (type === 'NON_PWA') {
    body.innerHTML = `
      <div class="install-options-grid">
        <div class="install-option android-install">
          <div class="option-icon">🤖</div>
          <h3>Descargar APK (Android)</h3>
          <p>Instala UnitVerse directamente en tu móvil Android</p>
          <button class="option-btn secondary" onclick="downloadAPK()">Descargar APK</button>
          <small>Este archivo puede ser generado usando PWA Builder</small>
        </div>
        
        <div class="install-option windows-install">
          <div class="option-icon">💻</div>
          <h3>Descargar para Windows</h3>
          <p>Instala UnitVerse como app de escritorio en tu PC</p>
          <button class="option-btn secondary" onclick="downloadWindowsApp()">Descargar EXE</button>
          <small>Requiere Windows 10 o superior</small>
        </div>

        <div class="install-option mac-install">
          <div class="option-icon">🍎</div>
          <h3>Descargar para macOS</h3>
          <p>Instala UnitVerse en tu Mac</p>
          <button class="option-btn secondary" onclick="downloadMacApp()">Descargar APP</button>
          <small>Requiere macOS 10.13 o superior</small>
        </div>
      </div>

      <div class="install-alternatives">
        <h3>Otras opciones</h3>
        <div class="alt-option">
          <span class="alt-icon">📌</span>
          <div>
            <strong>Agregar a pantalla de inicio</strong>
            <p id="alt-instruction"></p>
          </div>
        </div>
      </div>
    `;
    updateAltInstruction();
  }

  overlay.classList.add('visible');
  overlay.style.pointerEvents = 'auto';
  modal.classList.add('open');
}

function closeInstallModal() {
  const overlay = document.getElementById('install-modal-overlay');
  const modal = document.getElementById('install-modal');
  
  if (overlay && modal) {
    overlay.classList.remove('visible');
    overlay.style.pointerEvents = 'none';
    modal.classList.remove('open');
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   DETECTAR NAVEGADOR Y MOSTRAR INSTRUCCIÓN APROPIADA
────────────────────────────────────────────────────────────────────────────── */
function updateAltInstruction() {
  const instruction = document.getElementById('alt-instruction');
  const ua = navigator.userAgent.toLowerCase();
  
  let text = '';
  
  if (ua.includes('chrome') && ua.includes('android')) {
    text = '<span class="kbd">Menú ⋮</span> → <span class="kbd">Instalar app</span>';
  } else if (ua.includes('firefox') && ua.includes('android')) {
    text = '<span class="kbd">Menú ≡</span> → <span class="kbd">Instalar</span>';
  } else if (ua.includes('safari') && ua.includes('iphone')) {
    text = '<span class="kbd">Compartir</span> → <span class="kbd">Agregar a pantalla de inicio</span>';
  } else if (ua.includes('chrome') && !ua.includes('android')) {
    text = '<span class="kbd">Menú</span> → <span class="kbd">Instalar UnitVerse</span>';
  } else if (ua.includes('firefox') && !ua.includes('android')) {
    text = '<span class="kbd">Menú</span> → <span class="kbd">Instalar la app</span>';
  } else {
    text = 'Consulta el menú de tu navegador para opciones de instalación';
  }
  
  if (instruction) {
    instruction.innerHTML = text;
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   DESCARGAR COMO APK (Android)
────────────────────────────────────────────────────────────────────────────── */
function downloadAPK() {
  showNotification('⚠️ Para crear un APK necesitas usar PWA Builder', 'info');
  
  const url = 'https://www.pwabuilder.com/';
  setTimeout(() => {
    window.open(url, '_blank');
  }, 1500);
  
  console.log('[UnitVerse] Redirigiendo a PWA Builder para crear APK');
}

/* ──────────────────────────────────────────────────────────────────────────────
   DESCARGAR COMO EXE (Windows)
────────────────────────────────────────────────────────────────────────────── */
function downloadWindowsApp() {
  showNotification('⚠️ Para crear EXE necesitas usar PWA Builder', 'info');
  
  const url = 'https://www.pwabuilder.com/';
  setTimeout(() => {
    window.open(url, '_blank');
  }, 1500);
  
  console.log('[UnitVerse] Redirigiendo a PWA Builder para crear EXE');
}

/* ──────────────────────────────────────────────────────────────────────────────
   DESCARGAR COMO APP (macOS)
────────────────────────────────────────────────────────────────────────────── */
function downloadMacApp() {
  showNotification('⚠️ Para crear APP necesitas usar PWA Builder', 'info');
  
  const url = 'https://www.pwabuilder.com/';
  setTimeout(() => {
    window.open(url, '_blank');
  }, 1500);
  
  console.log('[UnitVerse] Redirigiendo a PWA Builder para crear APP');
}

/* ──────────────────────────────────────────────────────────────────────────────
   NOTIFICACIÓN TOAST
────────────────────────────────────────────────────────────────────────────── */
function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `install-notification install-notification-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: 400px;
    margin: 0 auto;
    padding: 16px;
    background: ${type === 'success' ? '#00e5b0' : type === 'error' ? '#ff6b6b' : '#4a74ff'};
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    animation: slideInUp 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ──────────────────────────────────────────────────────────────────────────────
   VERIFICAR SI LA APP ESTÁ INSTALADA
────────────────────────────────────────────────────────────────────────────── */
window.addEventListener('appinstalled', () => {
  console.log('[UnitVerse] PWA instalada con éxito');
  deferredPrompt = null;
  hideInstallButton();
});

/* ──────────────────────────────────────────────────────────────────────────────
   CERRAR MODAL AL HACER CLICK EN OVERLAY
────────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('install-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeInstallModal);
  }
});

console.log('[UnitVerse] Script install.js cargado');
