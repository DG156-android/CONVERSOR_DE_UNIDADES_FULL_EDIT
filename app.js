/* ═══════════════════════════════════════════════════
   UNITVERSE — app.js  v5
   En móvil: cada sección abre un modal idéntico al de
   Actividades. En desktop: navegación de paneles normal.
═══════════════════════════════════════════════════ */

// ── PARTICLES ─────────────────────────────────────────────────────────────────
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

// ── HELPERS ───────────────────────────────────────────────────────────────────
function isMobile() { return window.innerWidth <= 768; }

// ── LABELS ────────────────────────────────────────────────────────────────────
const PANEL_LABELS = {
  home:'Inicio', sistemas:'Sistemas', uso:'Uso Mundial',
  metodo:'Método', convertidor:'Convertidor', ejemplos:'Ejemplos', tabla:'Tabla'
};
const PANEL_EYEBROWS = {
  sistemas:    '// LOS TRES SISTEMAS',
  uso:         '// USO POR REGIONES',
  metodo:      '// METODOLOGÍA',
  convertidor: '// HERRAMIENTA INTERACTIVA',
  ejemplos:    '// APRENDE PASO A PASO',
  tabla:       '// REFERENCIA COMPLETA'
};

// ── PANEL NAVIGATION (desktop) ────────────────────────────────────────────────
let currentPanel = 'home';

function openPanel(id) {
  if (isMobile()) {
    if (id === 'home') { sectionModalClose(); return; }
    sectionModalOpen(id);
    return;
  }
  // Desktop original
  if (id === currentPanel) return;
  const prev = document.getElementById('panel-' + currentPanel);
  if (prev) { prev.classList.remove('active'); prev.classList.add('exit'); setTimeout(() => prev.classList.remove('exit'), 350); }
  const next = document.getElementById('panel-' + id);
  if (next) { next.classList.add('active'); next.scrollTop = 0; }
  document.querySelectorAll('.mn-btn').forEach(b => b.classList.toggle('active', b.dataset.panel === id));
  const bc = document.getElementById('bc-current');
  if (bc) bc.textContent = PANEL_LABELS[id] || id;
  currentPanel = id;
}

function initCardListeners() {
  document.querySelectorAll('.hq-card[data-panel]').forEach(card => {
    card.addEventListener('click', () => openPanel(card.dataset.panel));
  });
  document.querySelectorAll('.mn-btn[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => openPanel(btn.dataset.panel));
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardListeners);
} else {
  initCardListeners();
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION MODAL — idéntico al de Actividades
   Solo en móvil. Renderiza contenido fresco en cada apertura.
═══════════════════════════════════════════════════════════════════════════ */

function sectionModalOpen(id) {
  const overlay = document.getElementById('sec-modal-overlay');
  const modal   = document.getElementById('sec-modal');
  const title   = document.getElementById('sec-modal-title');
  const eyebrow = document.getElementById('sec-modal-eyebrow');
  const body    = document.getElementById('sec-modal-body');

  title.textContent   = PANEL_LABELS[id]   || id;
  eyebrow.textContent = PANEL_EYEBROWS[id] || '//';
  body.innerHTML = '';
  body.scrollTop = 0;

  switch (id) {
    case 'sistemas':    body.appendChild(buildSistemas());     break;
    case 'uso':         body.appendChild(buildUsoModal());     break;
    case 'metodo':      body.appendChild(buildMetodoModal());  break;
    case 'convertidor': body.appendChild(buildConvModal());    break;
    case 'ejemplos':    body.appendChild(buildEjemplosModal());break;
    case 'tabla':       body.appendChild(buildTablaModal());   break;
    default: body.innerHTML = '<p style="color:#5a7a9a;text-align:center;padding:40px">Sección en desarrollo</p>';
  }

  overlay.style.pointerEvents = '';
  modal.style.pointerEvents   = '';
  overlay.classList.add('open');
  modal.classList.add('open');

  document.querySelectorAll('.mn-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.panel === id));
  currentPanel = id;
}

function sectionModalClose() {
  const overlay = document.getElementById('sec-modal-overlay');
  const modal   = document.getElementById('sec-modal');
  overlay.classList.remove('open');
  modal.classList.remove('open');
  overlay.style.pointerEvents = 'none';
  modal.style.pointerEvents   = 'none';
  document.querySelectorAll('.mn-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.panel === 'home'));
  currentPanel = 'home';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const m = document.getElementById('sec-modal');
    if (m && m.classList.contains('open')) sectionModalClose();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const ov = document.getElementById('sec-modal-overlay');
  if (ov) ov.addEventListener('click', sectionModalClose);
});

/* ───────────────────────────────────────────────────────────────────────────
   BUILDERS — cada función devuelve un nodo con el contenido
─────────────────────────────────────────────────────────────────────────── */

// ── SISTEMAS ─────────────────────────────────────────────────────────────────
let activeSysCard = null;

function buildSistemas() {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="sys-cards-grid">
      <div class="sys-card si"  onclick="modalToggleSys('si',this)">
        <div class="card-glow"></div><div class="card-icon">🌍</div>
        <div class="card-tag si">SI</div>
        <h3 class="card-name">Sistema Internacional</h3>
        <p class="card-short">Usado por más de 195 países. Basado en potencias de 10. Estándar científico universal desde 1960.</p>
        <div class="card-footer"><span class="card-btn si">VER DETALLE ›</span></div>
      </div>
      <div class="sys-card imp" onclick="modalToggleSys('imp',this)">
        <div class="card-glow"></div><div class="card-icon">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
        <div class="card-tag imp">IMPERIAL</div>
        <h3 class="card-name">Imperial UK</h3>
        <p class="card-short">Sistema histórico británico estandarizado en 1824. Millas, pintas y stones aún dominan la vida cotidiana.</p>
        <div class="card-footer"><span class="card-btn imp">VER DETALLE ›</span></div>
      </div>
      <div class="sys-card us"  onclick="modalToggleSys('us',this)">
        <div class="card-glow"></div><div class="card-icon">🇺🇸</div>
        <div class="card-tag us">EE.UU.</div>
        <h3 class="card-name">EE.UU. Consuetudinario</h3>
        <p class="card-short">Similar al imperial pero con diferencias clave en volumen. Uno de los únicos países sin SI oficial.</p>
        <div class="card-footer"><span class="card-btn us">VER DETALLE ›</span></div>
      </div>
    </div>
    <div class="sys-detail-panel" id="sec-sys-detail">
      <button class="detail-close" onclick="modalCloseSys()">✕ CERRAR</button>
      <div class="detail-content" id="sec-sys-content"></div>
    </div>`;
  return wrap;
}

function modalToggleSys(key, cardEl) {
  const panel   = document.getElementById('sec-sys-detail');
  const content = document.getElementById('sec-sys-content');
  if (!panel || !content) return;
  if (activeSysCard === key && panel.classList.contains('open')) { modalCloseSys(); return; }
  activeSysCard = key;
  document.querySelectorAll('#sec-modal .sys-card').forEach(c => c.classList.remove('active'));
  cardEl.classList.add('active');
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
  setTimeout(() => panel.scrollIntoView({behavior:'smooth', block:'nearest'}), 50);
}

function modalCloseSys() {
  const panel = document.getElementById('sec-sys-detail');
  if (panel) panel.classList.remove('open');
  document.querySelectorAll('#sec-modal .sys-card').forEach(c => c.classList.remove('active'));
  activeSysCard = null;
}

// Desktop toggleSys original
function toggleSys(key) {
  const panel   = document.getElementById('sys-detail-panel');
  const content = document.getElementById('detail-content');
  if (!panel) return;
  if (activeSysCard === key && panel.classList.contains('open')) { closeSys(); return; }
  activeSysCard = key;
  document.querySelectorAll('#panel-sistemas .sys-card').forEach(c => c.classList.remove('active'));
  const card = document.querySelector('#panel-sistemas .sys-card.' + key);
  if (card) card.classList.add('active');
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
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeSys() {
  const p = document.getElementById('sys-detail-panel');
  if (p) p.classList.remove('open');
  document.querySelectorAll('#panel-sistemas .sys-card').forEach(c => c.classList.remove('active'));
  activeSysCard = null;
}

// ── USO MUNDIAL ───────────────────────────────────────────────────────────────
function usoHTML() {
  return USO_MUNDIAL.map(u => `
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
}
(function() { const g=document.getElementById('uso-grid'); if(g) g.innerHTML=usoHTML(); })();

function buildUsoModal() {
  const wrap = document.createElement('div');
  wrap.className = 'uso-grid';
  wrap.innerHTML = usoHTML();
  return wrap;
}

// ── MÉTODO ────────────────────────────────────────────────────────────────────
function methodsHTML(prefix) {
  return Object.entries(METHODS).map(([k,m],i) => `
    <div class="method-panel ${i===0?'active':''}" id="${prefix}-method-${k}">
      <div class="method-steps">
        ${m.steps.map((s,si)=>`
          <div class="mstep">
            <div class="mstep-num">${si+1}</div>
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
}
(function() {
  const c=document.getElementById('method-panels');
  if(c) c.innerHTML=methodsHTML('desk');
})();

function buildMetodoModal() {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="method-tabs" id="sec-mtabs">
      ${Object.keys(METHODS).map((k,i)=>`
        <button class="mtab ${i===0?'active':''}"
          onclick="secShowMethod('${k}',this)">${k==='factor'?'Factor de conversión':k==='proporcion'?'Regla de tres':'Cadena de unidades'}</button>`).join('')}
    </div>
    <div id="sec-mpanels">${methodsHTML('sec')}</div>`;
  return wrap;
}

function secShowMethod(id, btn) {
  document.querySelectorAll('#sec-mpanels .method-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#sec-mtabs .mtab').forEach(t=>t.classList.remove('active'));
  const p=document.getElementById('sec-method-'+id); if(p) p.classList.add('active');
  btn.classList.add('active');
}
function showMethod(id, btn) {
  document.querySelectorAll('#method-panels .method-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#panel-metodo .mtab').forEach(t=>t.classList.remove('active'));
  const p=document.getElementById('desk-method-'+id); if(p) p.classList.add('active');
  btn.classList.add('active');
}

// ── CONVERTIDOR ───────────────────────────────────────────────────────────────
let activeConvCat='Longitud', secActiveConvCat='Longitud';

(function(){
  const s=document.getElementById('conv-cats'); if(!s) return;
  s.innerHTML=Object.keys(CONV_UNITS).map(cat=>
    `<button class="cctab ${cat===activeConvCat?'active':''}"
      onclick="setConvCat('${cat}',this)">${cat}</button>`).join('');
  buildConvSelects();
})();

function calcConvert(val,fi,ti,units,cat) {
  if(cat==='Temperatura'){
    const f=units[fi].special,t=units[ti].special;
    if(f===t) return val;
    if(f==='C'&&t==='F') return val*9/5+32;
    if(f==='F'&&t==='C') return (val-32)*5/9;
    if(f==='C'&&t==='K') return val+273.15;
    if(f==='K'&&t==='C') return val-273.15;
    if(f==='F'&&t==='K') return (val-32)*5/9+273.15;
    if(f==='K'&&t==='F') return (val-273.15)*9/5+32;
    return val;
  }
  return (val*units[fi].factor)/units[ti].factor;
}
function formatNum(n) {
  return (Math.abs(n)<.0001||Math.abs(n)>9999999)?n.toExponential(4):parseFloat(n.toPrecision(7)).toString();
}

function setConvCat(cat,btn) {
  activeConvCat=cat;
  document.querySelectorAll('#panel-convertidor .cctab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); buildConvSelects();
}
function buildConvSelects() {
  const units=CONV_UNITS[activeConvCat];
  document.getElementById('cv-from').innerHTML=units.map((u,i)=>`<option value="${i}">${u.label}</option>`).join('');
  document.getElementById('cv-to').innerHTML=units.map((u,i)=>`<option value="${i}" ${i===1?'selected':''}>${u.label}</option>`).join('');
  doConvert();
}
function doConvert() {
  const val=parseFloat(document.getElementById('cv-input').value);
  const fi=parseInt(document.getElementById('cv-from').value);
  const ti=parseInt(document.getElementById('cv-to').value);
  const units=CONV_UNITS[activeConvCat]; if(isNaN(val)||!units) return;
  const result=calcConvert(val,fi,ti,units,activeConvCat);
  const disp=formatNum(result);
  const fl=units[fi].label.replace(/\(.*\)/,'').trim();
  const tl=units[ti].label.replace(/\(.*\)/,'').trim();
  document.getElementById('cv-val').textContent=`${disp} ${tl}`;
  document.getElementById('cv-formula').textContent=`${val} ${fl} = ${disp} ${tl}`;
}

function buildConvModal() {
  secActiveConvCat='Longitud';
  const wrap=document.createElement('div');
  wrap.className='conv-box';
  wrap.style.cssText='max-width:100%;box-shadow:none;border:none;padding:0;background:transparent';
  wrap.innerHTML=`
    <div class="conv-cat-strip" id="sec-conv-cats">
      ${Object.keys(CONV_UNITS).map(cat=>
        `<button class="cctab ${cat===secActiveConvCat?'active':''}"
          onclick="secSetConvCat('${cat}',this)">${cat}</button>`).join('')}
    </div>
    <div class="conv-inputs" style="grid-template-columns:1fr">
      <div class="conv-field"><label>VALOR</label><input type="number" id="sec-cv-input" value="1" oninput="secDoConvert()"/></div>
      <div class="conv-field"><label>DE</label><select id="sec-cv-from" onchange="secDoConvert()"></select></div>
      <div class="conv-field"><label>A</label><select id="sec-cv-to" onchange="secDoConvert()"></select></div>
    </div>
    <div class="conv-result-panel">
      <div class="conv-result-label">RESULTADO</div>
      <div class="conv-result-value" id="sec-cv-val">—</div>
      <div class="conv-result-formula" id="sec-cv-formula"></div>
    </div>`;
  setTimeout(()=>secBuildConvSelects(),0);
  return wrap;
}
function secSetConvCat(cat,btn) {
  secActiveConvCat=cat;
  document.querySelectorAll('#sec-conv-cats .cctab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); secBuildConvSelects();
}
function secBuildConvSelects() {
  const units=CONV_UNITS[secActiveConvCat];
  const f=document.getElementById('sec-cv-from'), t=document.getElementById('sec-cv-to');
  if(!f||!t||!units) return;
  f.innerHTML=units.map((u,i)=>`<option value="${i}">${u.label}</option>`).join('');
  t.innerHTML=units.map((u,i)=>`<option value="${i}" ${i===1?'selected':''}>${u.label}</option>`).join('');
  secDoConvert();
}
function secDoConvert() {
  const inp=document.getElementById('sec-cv-input');
  const f=document.getElementById('sec-cv-from'), t=document.getElementById('sec-cv-to');
  const vEl=document.getElementById('sec-cv-val'), fEl=document.getElementById('sec-cv-formula');
  if(!inp||!f||!t) return;
  const val=parseFloat(inp.value), fi=parseInt(f.value), ti=parseInt(t.value);
  const units=CONV_UNITS[secActiveConvCat]; if(isNaN(val)||!units) return;
  const result=calcConvert(val,fi,ti,units,secActiveConvCat);
  const disp=formatNum(result);
  const fl=units[fi].label.replace(/\(.*\)/,'').trim();
  const tl=units[ti].label.replace(/\(.*\)/,'').trim();
  vEl.textContent=`${disp} ${tl}`;
  fEl.textContent=`${val} ${fl} = ${disp} ${tl}`;
}

// ── EJEMPLOS ──────────────────────────────────────────────────────────────────
let activeLevel='basico', secActiveLevel='basico';

function exCardHTML(ex,i,level,lvlLabel) {
  return `
  <div class="ex-card ${level}" onclick="openExModal('${level}',${i})" style="cursor:pointer">
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
        ${ex.steps.map((s,si)=>`
          <div class="ex-step">
            <div class="ex-step-n">${si+1}</div>
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
  </div>`;
}

function renderExamples() {
  const lbl={basico:'BÁSICO',medio:'MEDIO',avanzado:'AVANZADO'}[activeLevel];
  const g=document.getElementById('ex-grid'); if(!g) return;
  g.innerHTML=EXAMPLES[activeLevel].map((ex,i)=>exCardHTML(ex,i,activeLevel,lbl)).join('');
}
function showLevel(level,btn) {
  activeLevel=level;
  document.querySelectorAll('#panel-ejemplos .lvl-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); renderExamples();
}

function buildEjemplosModal() {
  const wrap=document.createElement('div');
  wrap.innerHTML=`
    <div class="level-tabs" id="sec-lvl-tabs">
      <button class="lvl-tab basico active" onclick="secShowLevel('basico',this)"><span class="lvl-dot"></span>BÁSICO</button>
      <button class="lvl-tab medio"         onclick="secShowLevel('medio',this)"><span class="lvl-dot"></span>MEDIO</button>
      <button class="lvl-tab avanzado"      onclick="secShowLevel('avanzado',this)"><span class="lvl-dot"></span>AVANZADO</button>
    </div>
    <div class="ex-grid" id="sec-ex-grid"></div>`;
  setTimeout(()=>secRenderExamples(),0);
  return wrap;
}
function secShowLevel(level,btn) {
  secActiveLevel=level;
  document.querySelectorAll('#sec-lvl-tabs .lvl-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); secRenderExamples();
}
function secRenderExamples() {
  const lbl={basico:'BÁSICO',medio:'MEDIO',avanzado:'AVANZADO'}[secActiveLevel];
  const g=document.getElementById('sec-ex-grid'); if(!g) return;
  g.innerHTML=EXAMPLES[secActiveLevel].map((ex,i)=>exCardHTML(ex,i,secActiveLevel,lbl)).join('');
}
renderExamples();

// ── TABLA ─────────────────────────────────────────────────────────────────────
let tblSys='TODOS', tblCat='Todas', secTblSys='TODOS', secTblCat='Todas';

function tableRowHTML(r,cols) {
  return `<tr>
    <td>${r[0]}</td>
    <td style="font-weight:600;color:#fff">${r[1]}</td>
    <td style="font-weight:600;color:#fff">${r[2]}</td>
    <td class="td-mono">${r[3]}</td>
    <td><span class="sys-pill ${r[4]}">${SYS_LABELS[r[4]]||r[4]}</span></td>
    <td style="font-size:11px;color:#5a7a9a">${r[5]}</td>
    ${cols===7?`<td style="font-size:11px;color:#5a7a9a;font-style:italic">${r[6]}</td>`:''}
  </tr>`;
}
function noResultsHTML() {
  return `<tr><td colspan="7" style="text-align:center;padding:26px;color:#5a7a9a">Sin resultados</td></tr>`;
}

(function(){
  const cats=['Todas',...new Set(CONV_DATA.map(r=>r[5]))];
  const s=document.getElementById('tbl-cats'); if(!s) return;
  s.innerHTML=cats.map(c=>`<button class="tcatbtn ${c===tblCat?'active':''}"
    onclick="setTblCat('${c}',this)">${c}</button>`).join('');
})();

function setSys(val,btn) {
  tblSys=val; document.querySelectorAll('#panel-tabla .tsb').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderTable();
}
function setTblCat(val,btn) {
  tblCat=val; document.querySelectorAll('#panel-tabla .tcatbtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderTable();
}
function renderTable() {
  const q=(document.getElementById('tbl-q').value||'').toLowerCase();
  const rows=CONV_DATA.filter(r=>{
    const sys=r[4],ok=tblSys==='TODOS'||sys===tblSys||(tblSys==='CROSS'&&sys.includes('-'));
    return ok&&(tblCat==='Todas'||r[5]===tblCat)&&(!q||r.join(' ').toLowerCase().includes(q));
  });
  document.getElementById('tbl-count').textContent=`${rows.length} conversiones encontradas`;
  document.getElementById('tbl-body').innerHTML=rows.length?rows.map(r=>tableRowHTML(r,7)).join(''):noResultsHTML();
}
renderTable();

function buildTablaModal() {
  secTblSys='TODOS'; secTblCat='Todas';
  const cats=['Todas',...new Set(CONV_DATA.map(r=>r[5]))];
  const wrap=document.createElement('div');
  wrap.innerHTML=`
    <div class="tbl-controls">
      <input class="tbl-search" id="sec-tbl-q" type="text"
        placeholder="🔍  Buscar: pulgada, galón, BTU..." oninput="secRenderTable()"/>
      <div class="tbl-sys-btns">
        <button class="tsb all active" onclick="secSetSys('TODOS',this)">TODOS</button>
        <button class="tsb si"         onclick="secSetSys('SI',this)">SI</button>
        <button class="tsb imp"        onclick="secSetSys('IMP',this)">IMPERIAL</button>
        <button class="tsb us"         onclick="secSetSys('US',this)">EE.UU.</button>
        <button class="tsb cross"      onclick="secSetSys('CROSS',this)">CRUZADAS</button>
      </div>
    </div>
    <div class="tbl-cat-strip" id="sec-tbl-cats">
      ${cats.map(c=>`<button class="tcatbtn ${c==='Todas'?'active':''}"
        onclick="secSetTblCat('${c}',this)">${c}</button>`).join('')}
    </div>
    <div class="tbl-count" id="sec-tbl-count"></div>
    <div class="tbl-wrap">
      <table id="sec-main-table">
        <thead><tr>
          <th>Conversión</th><th>De</th><th>A</th>
          <th>Fórmula</th><th>Sistema</th><th>Categoría</th>
        </tr></thead>
        <tbody id="sec-tbl-body"></tbody>
      </table>
    </div>`;
  setTimeout(()=>secRenderTable(),0);
  return wrap;
}
function secSetSys(val,btn) {
  secTblSys=val; document.querySelectorAll('#sec-modal .tsb').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); secRenderTable();
}
function secSetTblCat(val,btn) {
  secTblCat=val; document.querySelectorAll('#sec-modal .tcatbtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); secRenderTable();
}
function secRenderTable() {
  const q=(document.getElementById('sec-tbl-q').value||'').toLowerCase();
  const rows=CONV_DATA.filter(r=>{
    const sys=r[4],ok=secTblSys==='TODOS'||sys===secTblSys||(secTblSys==='CROSS'&&sys.includes('-'));
    return ok&&(secTblCat==='Todas'||r[5]===secTblCat)&&(!q||r.join(' ').toLowerCase().includes(q));
  });
  const cnt=document.getElementById('sec-tbl-count');
  const body=document.getElementById('sec-tbl-body');
  if(cnt) cnt.textContent=`${rows.length} conversiones encontradas`;
  if(body) body.innerHTML=rows.length?rows.map(r=>tableRowHTML(r,6)).join(''):noResultsHTML();
}

// ── MODAL DETALLE EJEMPLO ─────────────────────────────────────────────────────
function openExModal(level,idx) {
  const ex=EXAMPLES[level][idx];
  const lbl={basico:'BÁSICO',medio:'MEDIO',avanzado:'AVANZADO'}[level];
  document.getElementById('exm-cat').textContent     = ex.cat.toUpperCase();
  document.getElementById('exm-lvl').textContent     = lbl;
  document.getElementById('exm-lvl').className       = `exm-lvl-tag ${level}`;
  document.getElementById('exm-title').textContent   = ex.title;
  document.getElementById('exm-context').textContent = ex.context;
  document.getElementById('exm-steps').innerHTML = ex.steps.map((s,i)=>`
    <div class="exm-step ${level}">
      <div class="exm-step-num ${level}">${i+1}</div>
      <div class="exm-step-body">
        <span class="exm-step-label">${s[0]}</span>
        <code class="exm-step-code">${s[1]}</code>
      </div>
    </div>`).join('');
  document.getElementById('exm-result').className      = `exm-result ${level}`;
  document.getElementById('exm-result-val').textContent = ex.result;
  document.getElementById('exm-tip').innerHTML          = `<b>💡 Truco:</b> ${ex.tip}`;
  document.getElementById('exm-bar').className          = `exm-top-bar ${level}`;
  document.getElementById('ex-modal-overlay').classList.add('open');
  document.getElementById('ex-modal').classList.add('open');
}
function closeExModal() {
  const o=document.getElementById('ex-modal-overlay');
  const m=document.getElementById('ex-modal');
  if(o){o.classList.remove('open');o.style.pointerEvents='none';}
  if(m){m.classList.remove('open');m.style.pointerEvents='none';}
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    const m=document.getElementById('ex-modal');
    if(m&&m.classList.contains('open')) closeExModal();
  }
});
document.addEventListener('DOMContentLoaded',()=>{
  const o=document.getElementById('ex-modal-overlay');
  if(o) o.addEventListener('click',closeExModal);
});