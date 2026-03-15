/* ═══════════════════════════════════════════════════
   UNITVERSE — app.js  v3  (panel-folder navigation)
═══════════════════════════════════════════════════ */

// ── PARTICLES ────────────────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function rp() {
    return { x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.1+.3, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
      a:Math.random()*.5+.15,
      color:['#00e5b0','#00b4ff','#ffb800'][Math.floor(Math.random()*3)] };
  }
  function init() { resize(); particles = Array.from({length:80},rp); }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color; ctx.globalAlpha=p.a; ctx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
    });
    ctx.globalAlpha=1; requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize); init(); draw();
})();

// ── PANEL NAVIGATION ─────────────────────────────────────────────────────────
const PANEL_LABELS = {
  home:'Inicio', sistemas:'Sistemas', uso:'Uso Mundial',
  metodo:'Método', convertidor:'Convertidor', ejemplos:'Ejemplos', tabla:'Tabla'
};

let currentPanel = 'home';

function openPanel(id) {
  if (id === currentPanel) return;

  const prev = document.getElementById('panel-' + currentPanel);
  if (prev) {
    prev.classList.remove('active');
    prev.classList.add('exit');
    setTimeout(() => prev.classList.remove('exit'), 350);
  }

  const next = document.getElementById('panel-' + id);
  if (next) { next.classList.add('active'); next.scrollTop = 0; }

  // mobile nav
  document.querySelectorAll('.mn-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.panel === id));

  // breadcrumb
  const bc = document.getElementById('bc-current');
  if (bc) bc.textContent = PANEL_LABELS[id] || id;

  currentPanel = id;
}

// Quick-access cards en home — esperar a que el DOM esté listo
function initCardListeners() {
  document.querySelectorAll('.hq-card').forEach(card => {
    card.addEventListener('click', () => {
      const panel = card.dataset.panel;
      if (panel) openPanel(panel);
      // Si no tiene data-panel (ej: tarjeta Actividades), no hacer nada aquí
      // Su onclick="actOpen()" ya lo maneja
    });
  });

  // Mobile nav buttons
  document.querySelectorAll('.mn-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      if (panel) openPanel(panel);
    });
  });
}

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardListeners);
} else {
  initCardListeners();
}

// ── SISTEMAS ──────────────────────────────────────────────────────────────────
let activeSysCard = null;

function toggleSys(key) {
  const panel  = document.getElementById('sys-detail-panel');
  const content= document.getElementById('detail-content');

  if (activeSysCard === key && panel.classList.contains('open')) {
    closeSys(); return;
  }
  activeSysCard = key;
  document.querySelectorAll('.sys-card').forEach(c => c.classList.remove('active'));
  document.querySelector('.sys-card.' + key).classList.add('active');

  const d = SYS_DETAIL[key];
  let html = `<h3>${d.title}</h3>`;
  d.blocks.forEach(b => {
    html += `<div class="detail-block ${d.cls}"><h4>${b.heading}</h4>`;
    if      (b.type==='world') html += `<div class="world-use-box">${b.text}</div>`;
    else if (b.type==='tags')  html += `<div class="unit-tags">${b.tags.map(t=>`<span class="unit-tag">${t}</span>`).join('')}</div>`;
    else                       html += `<p>${b.text}</p>`;
    html += `</div>`;
  });
  content.innerHTML = html;
  panel.classList.add('open');
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function closeSys() {
  document.getElementById('sys-detail-panel').classList.remove('open');
  document.querySelectorAll('.sys-card').forEach(c=>c.classList.remove('active'));
  activeSysCard = null;
}

// ── USO MUNDIAL ───────────────────────────────────────────────────────────────
(function buildUso() {
  document.getElementById('uso-grid').innerHTML = USO_MUNDIAL.map(u => `
    <div class="uso-card">
      <div class="uso-header">
        <span class="uso-flag">${u.flag}</span>
        <span class="uso-region">${u.region}</span>
        <span class="uso-sys-pill ${u.sys}">${u.sys.toUpperCase()}</span>
      </div>
      <ul class="uso-list">
        ${u.items.map(i=>`<li style="color:var(${u.accentVar})">${i}</li>`).join('')}
      </ul>
    </div>`).join('');
})();

// ── MÉTODOS ───────────────────────────────────────────────────────────────────
(function buildMethods() {
  const container = document.getElementById('method-panels');
  container.innerHTML = Object.entries(METHODS).map(([k,m]) => `
    <div class="method-panel ${k==='factor'?'active':''}" id="method-${k}">
      <div class="method-steps">
        ${m.steps.map((s,i)=>`
          <div class="mstep">
            <div class="mstep-num">${i+1}</div>
            <div class="mstep-body"><h4>${s.title}</h4><p>${s.desc}</p></div>
          </div>`).join('')}
      </div>
      <div class="formula-terminal">
        ${m.terminal.map(l=>`
          <div class="fline">
            <span class="flabel">${l.label}</span>
            <span class="fval ${l.cls}">${l.val}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
})();

function showMethod(id, btn) {
  document.querySelectorAll('.method-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
  document.getElementById('method-'+id).classList.add('active');
  btn.classList.add('active');
}

// ── CONVERTIDOR ───────────────────────────────────────────────────────────────
let activeConvCat = 'Longitud';

(function buildConverter() {
  const strip = document.getElementById('conv-cats');
  strip.innerHTML = Object.keys(CONV_UNITS).map(cat =>
    `<button class="cctab ${cat===activeConvCat?'active':''}"
       onclick="setConvCat('${cat}',this)">${cat}</button>`).join('');
  buildConvSelects();
})();

function setConvCat(cat, btn) {
  activeConvCat = cat;
  document.querySelectorAll('.cctab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  buildConvSelects();
}

function buildConvSelects() {
  const units = CONV_UNITS[activeConvCat];
  document.getElementById('cv-from').innerHTML =
    units.map((u,i)=>`<option value="${i}">${u.label}</option>`).join('');
  document.getElementById('cv-to').innerHTML =
    units.map((u,i)=>`<option value="${i}" ${i===1?'selected':''}>${u.label}</option>`).join('');
  doConvert();
}

function doConvert() {
  const val   = parseFloat(document.getElementById('cv-input').value);
  const fi    = parseInt(document.getElementById('cv-from').value);
  const ti    = parseInt(document.getElementById('cv-to').value);
  const units = CONV_UNITS[activeConvCat];
  if (isNaN(val)||!units) return;
  let result;
  if (activeConvCat==='Temperatura') {
    const from=units[fi].special, to=units[ti].special;
    if(from===to) result=val;
    else if(from==='C'&&to==='F') result=val*9/5+32;
    else if(from==='F'&&to==='C') result=(val-32)*5/9;
    else if(from==='C'&&to==='K') result=val+273.15;
    else if(from==='K'&&to==='C') result=val-273.15;
    else if(from==='F'&&to==='K') result=(val-32)*5/9+273.15;
    else if(from==='K'&&to==='F') result=(val-273.15)*9/5+32;
    else result=val;
  } else {
    result = (val * units[fi].factor) / units[ti].factor;
  }
  const disp = (Math.abs(result)<.0001||Math.abs(result)>9999999)
    ? result.toExponential(4) : parseFloat(result.toPrecision(7)).toString();
  const fl = units[fi].label.replace(/\(.*\)/,'').trim();
  const tl = units[ti].label.replace(/\(.*\)/,'').trim();
  document.getElementById('cv-val').textContent    = `${disp} ${tl}`;
  document.getElementById('cv-formula').textContent = `${val} ${fl} = ${disp} ${tl}`;
}

// ── EJEMPLOS ──────────────────────────────────────────────────────────────────
let activeLevel = 'basico';

function showLevel(level, btn) {
  activeLevel = level;
  document.querySelectorAll('.lvl-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderExamples();
}

function renderExamples() {
  const lvlLabel = {basico:'BÁSICO',medio:'MEDIO',avanzado:'AVANZADO'}[activeLevel];
  document.getElementById('ex-grid').innerHTML = EXAMPLES[activeLevel].map((ex, i) => `
    <div class="ex-card ${activeLevel}" onclick="openExModal('${activeLevel}', ${i})" style="cursor:pointer">
      <div class="ex-card-top-bar"></div>
      <div class="ex-head">
        <div class="ex-head-row">
          <span class="ex-cat-tag">${ex.cat.toUpperCase()}</span>
          <span class="ex-lvl-tag">${lvlLabel}</span>
        </div>
        <div class="ex-title">${ex.title}</div>
        <div class="ex-context">${ex.context}</div>
      </div>
      <div class="ex-body">
        <div class="ex-steps">
          ${ex.steps.map((s,i)=>`
            <div class="ex-step">
              <div class="ex-step-n">${i+1}</div>
              <div class="ex-step-txt"><b>${s[0]}:</b> <code>${s[1]}</code></div>
            </div>`).join('')}
        </div>
        <div class="ex-result-row">
          <span class="ex-result-lbl">RESULTADO</span>
          <span class="ex-result-val">${ex.result}</span>
        </div>
        <div class="ex-tip"><b>Truco:</b> ${ex.tip}</div>
      </div>
      <div class="ex-card-hint">👁 Ver detalle</div>
    </div>`).join('');
}

// ── MODAL DE EJEMPLO DETALLADO ────────────────────────────────────────────────
function openExModal(level, idx) {
  const ex = EXAMPLES[level][idx];
  const lvlLabel = {basico:'BÁSICO', medio:'MEDIO', avanzado:'AVANZADO'}[level];
  const lvlColors = { basico:'--si', medio:'--us', avanzado:'--cross' };
  const col = lvlColors[level];

  document.getElementById('exm-cat').textContent   = ex.cat.toUpperCase();
  document.getElementById('exm-lvl').textContent   = lvlLabel;
  document.getElementById('exm-lvl').className     = `exm-lvl-tag ${level}`;
  document.getElementById('exm-title').textContent = ex.title;
  document.getElementById('exm-context').textContent = ex.context;

  // Pasos
  document.getElementById('exm-steps').innerHTML = ex.steps.map((s, i) => `
    <div class="exm-step ${level}">
      <div class="exm-step-num ${level}">${i + 1}</div>
      <div class="exm-step-body">
        <span class="exm-step-label">${s[0]}</span>
        <code class="exm-step-code">${s[1]}</code>
      </div>
    </div>`).join('');

  // Resultado
  document.getElementById('exm-result').className    = `exm-result ${level}`;
  document.getElementById('exm-result-val').textContent = ex.result;

  // Truco
  document.getElementById('exm-tip').innerHTML = `<b>💡 Truco:</b> ${ex.tip}`;

  // Línea de color en el header
  document.getElementById('exm-bar').className = `exm-top-bar ${level}`;

  // Mostrar
  document.getElementById('ex-modal-overlay').classList.add('open');
  document.getElementById('ex-modal').classList.add('open');
}

function closeExModal() {
  const overlay = document.getElementById('ex-modal-overlay');
  const modal   = document.getElementById('ex-modal');
  if (overlay) { overlay.classList.remove('open'); overlay.style.pointerEvents = 'none'; }
  if (modal)   { modal.classList.remove('open');   modal.style.pointerEvents   = 'none'; }
}
renderExamples();

// ── TABLA ─────────────────────────────────────────────────────────────────────
let tblSys = 'TODOS', tblCat = 'Todas';

(function buildTblCats() {
  const cats = ['Todas',...new Set(CONV_DATA.map(r=>r[5]))];
  document.getElementById('tbl-cats').innerHTML = cats.map(c =>
    `<button class="tcatbtn ${c===tblCat?'active':''}"
       onclick="setTblCat('${c}',this)">${c}</button>`).join('');
})();

function setSys(val, btn) {
  tblSys = val;
  document.querySelectorAll('.tsb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}
function setTblCat(val, btn) {
  tblCat = val;
  document.querySelectorAll('.tcatbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}
function renderTable() {
  const q = (document.getElementById('tbl-q').value||'').toLowerCase();
  const rows = CONV_DATA.filter(r => {
    const sys = r[4];
    const sysOk = tblSys==='TODOS' || sys===tblSys || (tblSys==='CROSS' && sys.includes('-'));
    return sysOk && (tblCat==='Todas'||r[5]===tblCat) && (!q||r.join(' ').toLowerCase().includes(q));
  });
  document.getElementById('tbl-count').textContent = `${rows.length} conversiones encontradas`;
  document.getElementById('tbl-body').innerHTML = rows.length
    ? rows.map(r=>`<tr>
        <td>${r[0]}</td>
        <td style="font-weight:600;color:#fff">${r[1]}</td>
        <td style="font-weight:600;color:#fff">${r[2]}</td>
        <td class="td-mono">${r[3]}</td>
        <td><span class="sys-pill ${r[4]}">${SYS_LABELS[r[4]]||r[4]}</span></td>
        <td style="font-size:11.5px;color:#5a7a9a">${r[5]}</td>
        <td style="font-size:11.5px;color:#5a7a9a;font-style:italic">${r[6]}</td>
      </tr>`).join('')
    : `<tr><td colspan="7" style="text-align:center;padding:26px;color:#5a7a9a">Sin resultados</td></tr>`;
}
renderTable();


// ── MODAL EJEMPLO — cerrar con Escape y overlay ───────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const exModal = document.getElementById('ex-modal');
    if (exModal && exModal.classList.contains('open')) closeExModal();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('ex-modal-overlay');
  if (overlay) overlay.addEventListener('click', closeExModal);
});

