/* ═══════════════════════════════════════════════════════
   UNITVERSE — activities.js  v2
   Modal flotante de ejercicios de conversión (3 niveles)
═══════════════════════════════════════════════════════ */

// ── BANCO DE EJERCICIOS ───────────────────────────────────────────────────────
const ACT_EXERCISES = {
  basico: [
    { cat:"Longitud", context:"Estás midiendo una pared para comprar pintura.",
      question:"Convierte <b>3 km</b> a metros", valueStr:"3 km",
      exact:3000, toUnit:"m", tol:0.01,
      explain:"De kilómetros a metros siempre multiplicas por 1 000.",
      formula:"3 km × 1 000 = 3 000 m" },
    { cat:"Longitud", context:"Necesitas saber el largo de un clavo en milímetros.",
      question:"Convierte <b>5 cm</b> a milímetros", valueStr:"5 cm",
      exact:50, toUnit:"mm", tol:0.01,
      explain:"1 cm = 10 mm. Multiplica por 10.",
      formula:"5 cm × 10 = 50 mm" },
    { cat:"Masa", context:"Una receta pide ingredientes en gramos pero tienes kilos.",
      question:"Convierte <b>2 kg</b> a gramos", valueStr:"2 kg",
      exact:2000, toUnit:"g", tol:0.01,
      explain:"1 kg = 1 000 g. Multiplica por 1 000.",
      formula:"2 kg × 1 000 = 2 000 g" },
    { cat:"Masa", context:"Compraste 500 g de café. ¿Cuántos kg son?",
      question:"Convierte <b>500 g</b> a kilogramos", valueStr:"500 g",
      exact:0.5, toUnit:"kg", tol:0.5,
      explain:"De gramos a kg divide entre 1 000.",
      formula:"500 g ÷ 1 000 = 0.5 kg" },
    { cat:"Tiempo", context:"Una película dura 3 horas. ¿Cuántos minutos son?",
      question:"Convierte <b>3 horas</b> a minutos", valueStr:"3 h",
      exact:180, toUnit:"min", tol:0.01,
      explain:"1 hora = 60 minutos. Multiplica por 60.",
      formula:"3 h × 60 = 180 min" },
    { cat:"Tiempo", context:"Tu alarma suena en 90 minutos. ¿Cuántas horas son?",
      question:"Convierte <b>90 minutos</b> a horas", valueStr:"90 min",
      exact:1.5, toUnit:"h", tol:0.5,
      explain:"De minutos a horas divide entre 60.",
      formula:"90 min ÷ 60 = 1.5 h" },
    { cat:"Temperatura", context:"El agua hierve a 100 °C. ¿Cuánto es en Fahrenheit?",
      question:"Convierte <b>100 °C</b> a Fahrenheit", valueStr:"100 °C",
      exact:212, toUnit:"°F", tol:0.5,
      explain:"Fórmula: °F = (°C × 9/5) + 32",
      formula:"(100 × 9/5) + 32 = 212 °F" },
    { cat:"Longitud", context:"Mides el pasillo de tu casa: 4.5 metros.",
      question:"Convierte <b>4.5 m</b> a centímetros", valueStr:"4.5 m",
      exact:450, toUnit:"cm", tol:0.01,
      explain:"1 m = 100 cm. Multiplica por 100.",
      formula:"4.5 m × 100 = 450 cm" },
    { cat:"Masa", context:"Un bebé pesa 3 500 gramos al nacer.",
      question:"Convierte <b>3 500 g</b> a kilogramos", valueStr:"3 500 g",
      exact:3.5, toUnit:"kg", tol:0.5,
      explain:"Divide entre 1 000 para pasar de g a kg.",
      formula:"3 500 g ÷ 1 000 = 3.5 kg" },
    { cat:"Temperatura", context:"El cuerpo humano tiene fiebre a 38 °C.",
      question:"Convierte <b>38 °C</b> a Kelvin", valueStr:"38 °C",
      exact:311.15, toUnit:"K", tol:0.5,
      explain:"Para pasar de °C a K, suma 273.15.",
      formula:"38 + 273.15 = 311.15 K" },
  ],
  medio: [
    { cat:"Longitud", context:"Una señal en EE.UU. indica que la ciudad está a 10 millas.",
      question:"Convierte <b>10 millas</b> a kilómetros", valueStr:"10 mi",
      exact:16.0934, toUnit:"km", tol:1,
      explain:"1 milla = 1.60934 km. Multiplica tu valor por ese factor.",
      formula:"10 mi × 1.60934 = 16.09 km" },
    { cat:"Longitud", context:"Una persona mide 6 pies de estatura (EE.UU.).",
      question:"Convierte <b>6 pies</b> a metros", valueStr:"6 ft",
      exact:1.8288, toUnit:"m", tol:1,
      explain:"1 pie = 0.3048 m. Multiplica por ese factor.",
      formula:"6 ft × 0.3048 = 1.8288 m" },
    { cat:"Masa", context:"Tu amigo pesa 154 libras según su pasaporte estadounidense.",
      question:"Convierte <b>154 lb</b> a kilogramos", valueStr:"154 lb",
      exact:69.853, toUnit:"kg", tol:1,
      explain:"1 libra = 0.453592 kg. Truco rápido: divide entre 2.2.",
      formula:"154 lb × 0.453592 = 69.85 kg" },
    { cat:"Temperatura", context:"Una receta americana pide hornear a 350 °F.",
      question:"Convierte <b>350 °F</b> a grados Celsius", valueStr:"350 °F",
      exact:176.67, toUnit:"°C", tol:1.5,
      explain:"Fórmula: °C = (°F − 32) × 5/9",
      formula:"(350 − 32) × 5/9 = 176.7 °C" },
    { cat:"Velocidad", context:"El límite de velocidad en autopistas americanas es 70 mph.",
      question:"Convierte <b>70 mph</b> a km/h", valueStr:"70 mph",
      exact:112.654, toUnit:"km/h", tol:1,
      explain:"1 mph = 1.60934 km/h. Multiplica por ese factor.",
      formula:"70 mph × 1.60934 = 112.65 km/h" },
    { cat:"Velocidad", context:"Un auto circula a 90 km/h en una carretera.",
      question:"Convierte <b>90 km/h</b> a metros por segundo", valueStr:"90 km/h",
      exact:25, toUnit:"m/s", tol:0.5,
      explain:"Divide km/h entre 3.6 para obtener m/s.",
      formula:"90 km/h ÷ 3.6 = 25 m/s" },
    { cat:"Volumen", context:"Compraste 2 galones de leche en EE.UU.",
      question:"Convierte <b>2 galones US</b> a litros", valueStr:"2 gal US",
      exact:7.5708, toUnit:"L", tol:1,
      explain:"1 galón US = 3.78541 L.",
      formula:"2 × 3.78541 = 7.57 L" },
    { cat:"Longitud", context:"Un televisor mide 55 pulgadas en diagonal.",
      question:"Convierte <b>55 pulgadas</b> a centímetros", valueStr:"55 in",
      exact:139.7, toUnit:"cm", tol:0.5,
      explain:"1 pulgada = 2.54 cm. Valor exacto por definición.",
      formula:"55 in × 2.54 = 139.7 cm" },
    { cat:"Masa", context:"Una persona pesa 11 stone (sistema UK).",
      question:"Convierte <b>11 stone</b> a kilogramos", valueStr:"11 st",
      exact:69.853, toUnit:"kg", tol:1,
      explain:"1 stone = 6.35029 kg.",
      formula:"11 st × 6.35029 = 69.85 kg" },
    { cat:"Área", context:"Un campo agrícola mide 5 acres.",
      question:"Convierte <b>5 acres</b> a hectáreas", valueStr:"5 acres",
      exact:2.02343, toUnit:"ha", tol:2,
      explain:"1 acre = 0.404686 ha.",
      formula:"5 acres × 0.404686 = 2.02 ha" },
  ],
  avanzado: [
    { cat:"Energía", context:"Una porción de comida tiene 400 kcal según la etiqueta.",
      question:"Convierte <b>400 kcal</b> a Joules", valueStr:"400 kcal",
      exact:1673600, toUnit:"J", tol:1,
      explain:"1 kcal = 4 184 J. Multiplica directamente.",
      formula:"400 kcal × 4 184 = 1 673 600 J" },
    { cat:"Presión", context:"El manual de tu auto indica inflar las llantas a 35 psi.",
      question:"Convierte <b>35 psi</b> a kilopascales (kPa)", valueStr:"35 psi",
      exact:241.316, toUnit:"kPa", tol:1,
      explain:"1 psi = 6.89476 kPa.",
      formula:"35 psi × 6.89476 = 241.32 kPa" },
    { cat:"Potencia", context:"Un motor de automóvil tiene 200 HP.",
      question:"Convierte <b>200 HP</b> a kilovatios (kW)", valueStr:"200 HP",
      exact:149.14, toUnit:"kW", tol:1,
      explain:"1 HP mecánico = 0.7457 kW.",
      formula:"200 HP × 0.7457 = 149.14 kW" },
    { cat:"Temperatura", context:"El nitrógeno líquido hierve a 77 K.",
      question:"Convierte <b>77 K</b> a grados Celsius", valueStr:"77 K",
      exact:-196.15, toUnit:"°C", tol:1,
      explain:"°C = K − 273.15.",
      formula:"77 − 273.15 = −196.15 °C" },
    { cat:"Velocidad", context:"Un caza supera la barrera del sonido a Mach 1.5.",
      question:"Convierte <b>Mach 1.5</b> a km/h (20°C, nivel del mar)", valueStr:"Mach 1.5",
      exact:1852.2, toUnit:"km/h", tol:1.5,
      explain:"Mach 1 = 343 m/s = 1 234.8 km/h a nivel del mar (20°C).",
      formula:"1.5 × 1 234.8 = 1 852.2 km/h" },
    { cat:"Presión", context:"Un equipo de buceo trabaja a 3 atmósferas de presión.",
      question:"Convierte <b>3 atm</b> a bares", valueStr:"3 atm",
      exact:3.03975, toUnit:"bar", tol:1,
      explain:"1 atm = 1.01325 bar.",
      formula:"3 atm × 1.01325 = 3.04 bar" },
    { cat:"Energía", context:"Tu aire acondicionado consume 12 000 BTU/h.",
      question:"Convierte <b>12 000 BTU</b> a kilojulios (kJ)", valueStr:"12 000 BTU",
      exact:12660.72, toUnit:"kJ", tol:1,
      explain:"1 BTU = 1.05506 kJ.",
      formula:"12 000 BTU × 1.05506 = 12 660.72 kJ" },
    { cat:"Área", context:"Una ciudad ocupa 250 millas cuadradas.",
      question:"Convierte <b>250 millas²</b> a kilómetros²", valueStr:"250 mi²",
      exact:647.497, toUnit:"km²", tol:1,
      explain:"1 mi² = 2.58999 km².",
      formula:"250 mi² × 2.58999 = 647.5 km²" },
    { cat:"Potencia", context:"Una caldera de calefacción entrega 24 000 BTU/h.",
      question:"Convierte <b>24 000 BTU/h</b> a vatios (W)", valueStr:"24 000 BTU/h",
      exact:7033.7, toUnit:"W", tol:1,
      explain:"1 BTU/h = 0.293071 W.",
      formula:"24 000 × 0.293071 = 7 033.7 W" },
    { cat:"Volumen", context:"Un barril de petróleo estándar (bbl) en el mercado internacional.",
      question:"Convierte <b>1 barril (bbl)</b> a litros", valueStr:"1 bbl",
      exact:158.987, toUnit:"L", tol:0.5,
      explain:"1 bbl (oil barrel US) = 158.987 L = 42 galones US.",
      formula:"1 bbl × 158.987 = 158.99 L" },
  ]
};

// ── ESTADO ────────────────────────────────────────────────────────────────────
const ACT = {
  level: 'basico',
  answered: new Set(),
  correct: 0,
  total: 0,
  streak: 0,
  queue: [],
};

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pctErr(user, exact) {
  if (exact === 0) return Math.abs(user);
  return Math.abs((user - exact) / exact) * 100;
}

// ── RENDER EJERCICIOS ─────────────────────────────────────────────────────────
function actRender() {
  const body = document.getElementById('act-body');
  const lvl  = ACT.level;
  const exs  = ACT.queue;

  if (!exs || exs.length === 0) {
    body.innerHTML = '<div class="act-complete"><div class="act-complete-icon">🎲</div><div class="act-complete-title">Sin ejercicios</div></div>';
    return;
  }

  // Todos respondidos → pantalla de resultado
  if (ACT.answered.size === exs.length) {
    const pct  = Math.round((ACT.correct / exs.length) * 100);
    const icon = pct === 100 ? '🏆' : pct >= 70 ? '🥈' : '📚';
    const msg  = pct === 100 ? '¡Perfecto! Dominas este nivel.' :
                 pct >= 70   ? 'Buen trabajo. Sigue practicando.' :
                               'Repasa los conceptos e inténtalo de nuevo.';
    body.innerHTML = `
      <div class="act-complete">
        <div class="act-complete-icon">${icon}</div>
        <div class="act-complete-pct">${pct}%</div>
        <div class="act-complete-title">${ACT.correct} de ${exs.length} correctas</div>
        <div class="act-complete-desc">${msg}</div>
        <button class="act-new-btn" onclick="actNewBatch()">▶ NUEVA TANDA</button>
      </div>`;
    actUpdateProgress(1);
    return;
  }

  // Renderizar tarjetas completas
  body.innerHTML = exs.map((ex, i) => {
    const done = ACT.answered.has(i);
    return `
    <div class="ex-exercise-card ${lvl} ${done ? 'answered' : ''}" id="ex-card-${i}">

      <div class="ex-card-head">
        <div class="ex-q-num">${i + 1}</div>
        <div class="ex-q-meta">
          <span class="ex-q-cat">${ex.cat}</span>
          <span class="ex-q-context">${ex.context}</span>
        </div>
      </div>

      <div class="ex-card-body">
        <div class="ex-q-text">¿Cuánto es <span class="ex-val">${ex.valueStr}</span> en ${ex.toUnit}?</div>

        <div class="ex-input-wrap">
          <div class="ex-input-field-wrap">
            <input
              class="ex-input-field"
              id="ex-inp-${i}"
              type="number"
              step="any"
              placeholder="Escribe tu respuesta..."
              ${done ? 'disabled' : ''}
              onkeydown="if(event.key==='Enter') actCheck(${i})"
            />
            <span class="ex-unit-label">${ex.toUnit}</span>
          </div>
          <button
            class="ex-check-btn"
            id="ex-btn-${i}"
            onclick="actCheck(${i})"
            ${done ? 'disabled' : ''}
          >VERIFICAR</button>
        </div>

        <div class="ex-feedback" id="ex-fb-${i}"></div>
      </div>

    </div>`;
  }).join('');

  actUpdateProgress(ACT.answered.size / exs.length);
}

// ── VERIFICAR RESPUESTA ────────────────────────────────────────────────────────
function actCheck(idx) {
  if (ACT.answered.has(idx)) return;

  const ex  = ACT.queue[idx];
  const inp = document.getElementById(`ex-inp-${idx}`);
  const fb  = document.getElementById(`ex-fb-${idx}`);
  const btn = document.getElementById(`ex-btn-${idx}`);

  const val = parseFloat(inp.value);
  if (isNaN(val)) {
    inp.style.borderColor = 'rgba(255,184,0,.7)';
    inp.placeholder = '⚠ Ingresa un número';
    setTimeout(() => { inp.style.borderColor = ''; inp.placeholder = 'Escribe tu respuesta...'; }, 1400);
    return;
  }

  ACT.answered.add(idx);
  ACT.total++;

  const ok = pctErr(val, ex.exact) <= ex.tol;

  inp.classList.add(ok ? 'correct' : 'wrong');
  inp.disabled = true;
  btn.disabled = true;
  document.getElementById(`ex-card-${idx}`).classList.add('answered');

  if (ok) {
    ACT.correct++;
    ACT.streak++;
    fb.innerHTML = `
      <div class="ex-fb-result">✅ ¡Correcto!</div>
      <div class="ex-explain">${ex.explain}</div>
      <span class="ex-formula">${ex.formula}</span>`;
    fb.className = 'ex-feedback correct-fb';
    actPopScore(inp, '+1', 'correct');
  } else {
    ACT.streak = 0;
    const ans = (Math.abs(ex.exact) < 0.01 || Math.abs(ex.exact) > 999999)
      ? ex.exact.toExponential(3)
      : parseFloat(ex.exact.toPrecision(6));
    fb.innerHTML = `
      <div class="ex-fb-result">❌ Incorrecto — la respuesta es <strong>${ans} ${ex.toUnit}</strong></div>
      <div class="ex-explain">${ex.explain}</div>
      <span class="ex-formula">${ex.formula}</span>`;
    fb.className = 'ex-feedback wrong-fb';
    actPopScore(inp, '✗', 'wrong');
  }

  // Mostrar feedback con animación
  requestAnimationFrame(() => {
    fb.style.display = 'block';
    requestAnimationFrame(() => fb.classList.add('show'));
  });

  actUpdateStats();

  if (ACT.answered.size === ACT.queue.length) {
    setTimeout(() => actRender(), 900);
  }
}

// ── SCORE POP ─────────────────────────────────────────────────────────────────
function actPopScore(anchor, text, type) {
  const rect = anchor.getBoundingClientRect();
  const el   = document.createElement('div');
  el.className = `act-score-pop ${type}`;
  el.textContent = text;
  el.style.cssText = `left:${rect.left + rect.width / 2}px;top:${rect.top}px;transform:translateX(-50%)`;
  document.body.appendChild(el);
  el.style.animation = 'scorePop .9s ease forwards';
  el.addEventListener('animationend', () => el.remove());
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function actUpdateStats() {
  const pct = ACT.total > 0 ? Math.round((ACT.correct / ACT.total) * 100) : 0;
  document.getElementById('act-stat-score').textContent  = `${ACT.correct}/${ACT.total}`;
  document.getElementById('act-stat-streak').textContent = ACT.streak;
  document.getElementById('act-stat-acc').textContent    = ACT.total > 0 ? `${pct}%` : '—';

  // badge eliminado (FAB removido) — sin referencia al DOM
}

function actUpdateProgress(fraction) {
  const fill = document.getElementById('act-progress-fill');
  if (fill) fill.style.width = `${Math.min(fraction * 100, 100)}%`;
}

// ── NUEVA TANDA ────────────────────────────────────────────────────────────────
function actNewBatch() {
  ACT.answered.clear();
  ACT.correct = 0;
  ACT.total   = 0;
  ACT.streak  = 0;
  ACT.queue   = shuffleArr(ACT_EXERCISES[ACT.level]);
  actUpdateStats();
  actUpdateProgress(0);
  actRender();
}

// ── CAMBIAR NIVEL ─────────────────────────────────────────────────────────────
function actSetLevel(lvl, btn) {
  ACT.level = lvl;
  document.querySelectorAll('.act-lvl-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  actNewBatch();
}

// ── ABRIR / CERRAR ────────────────────────────────────────────────────────────
function actOpen() {
  const overlay = document.getElementById('act-overlay');
  const modal   = document.getElementById('act-modal');
  overlay.style.pointerEvents = '';
  modal.style.pointerEvents   = '';
  overlay.classList.add('open');
  modal.classList.add('open');
  if (ACT.queue.length === 0) actNewBatch();
}

function actClose() {
  const overlay = document.getElementById('act-overlay');
  const modal   = document.getElementById('act-modal');
  overlay.classList.remove('open');
  modal.classList.remove('open');
  overlay.style.pointerEvents = 'none';
  modal.style.pointerEvents   = 'none';
  // Volver al panel principal al cerrar
  if (typeof openPanel === 'function') openPanel('home');
}

// ── INIT ──────────────────────────────────────────────────────────────────────
(function initActivities() {
  // Escape: solo cerrar si el modal de actividades está abierto
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('act-modal');
      if (modal && modal.classList.contains('open')) actClose();
    }
  });
  const overlay = document.getElementById('act-overlay');
  if (overlay) overlay.addEventListener('click', actClose);
})();

