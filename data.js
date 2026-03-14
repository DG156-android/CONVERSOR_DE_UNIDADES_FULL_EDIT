/* ═══════════════════════════════════════════════════════════
   UNITVERSE — data.js
   Todos los datos: conversiones, ejemplos, sistemas, uso mundial
═══════════════════════════════════════════════════════════ */

// ── DETALLE DE CADA SISTEMA ──────────────────────────────────────────────────
const SYS_DETAIL = {
  si: {
    title: "Sistema Internacional (SI) — El lenguaje universal de la ciencia",
    cls: "detail-si",
    blocks: [
      { heading: "Historia y origen",
        text: "Adoptado en 1960, el SI es evolución del sistema métrico decimal creado en Francia (1795). Su principio: base 10. Cada unidad es 10 veces la anterior, haciendo las conversiones extremadamente simples."
      },
      { heading: "Dónde se usa",
        type: "world",
        text: "Prácticamente todo el mundo: Europa, América Latina, África, Asia, Oceanía. Sistema oficial de la ciencia, medicina, industria y comercio internacional en 195 países."
      },
      { heading: "Unidades base",
        type: "tags",
        tags: ["metro (m)","kilogramo (kg)","segundo (s)","kelvin (K)","amperio (A)","mol (mol)","candela (cd)"]
      },
      { heading: "Prefijos clave",
        type: "tags",
        tags: ["kilo (×1000)","centi (÷100)","mili (÷1000)","mega (×10⁶)","micro (×10⁻⁶)","nano (×10⁻⁹)"]
      }
    ]
  },
  imp: {
    title: "Sistema Imperial Británico — Historia y tradición",
    cls: "detail-imp",
    blocks: [
      { heading: "Historia y origen",
        text: "Estandarizado en el Reino Unido en 1824. Sus raíces son medievales: la pulgada (ancho del pulgar), el pie (longitud del pie humano), la yarda (brazo extendido). El UK adoptó el SI en 1965 pero muchas unidades persisten."
      },
      { heading: "Dónde se usa hoy",
        type: "world",
        text: "Reino Unido (distancias, velocidad, peso corporal), Irlanda, India (parcialmente), países de la Commonwealth. Las millas en carretera y la pinta de cerveza son íconos culturales que sobreviven al SI."
      },
      { heading: "Unidades características",
        type: "tags",
        tags: ["pulgada (in)","pie (ft)","yarda (yd)","milla (mi)","stone (st)","libra (lb)","galón UK (4.546 L)","pinta UK (568 mL)","tonelada larga (1016 kg)","BTU","furlong"]
      },
      { heading: "Diferencia clave con EE.UU.",
        text: "Las unidades de volumen son distintas: el galón imperial (4.546 L) es un 20% mayor que el galón US (3.785 L). Lo mismo para pintas, cuartos y onzas fluidas. Longitud y masa son iguales en ambos sistemas."
      }
    ]
  },
  us: {
    title: "Sistema Consuetudinario de EE.UU. — La excepción mundial",
    cls: "detail-us",
    blocks: [
      { heading: "Historia y origen",
        text: "EE.UU. adoptó las unidades inglesas antes de la estandarización imperial de 1824. En 1866 se legalizó el SI pero nunca fue obligatorio. En 1975 el Metric Conversion Act no logró completar la transición."
      },
      { heading: "Dónde se usa",
        type: "world",
        text: "EE.UU. (uso cotidiano masivo), Liberia y Myanmar (oficialmente). La aviación y la medicina en EE.UU. usan unidades mixtas. El barril de petróleo (bbl, 158.99 L) es el estándar mundial del mercado energético."
      },
      { heading: "Unidades exclusivas o diferentes",
        type: "tags",
        tags: ["galón US (3.785 L)","pinta US (473 mL)","taza / cup (237 mL)","ton corta (907 kg)","Rankine (°R)","barril petróleo (bbl)","cucharada (14.8 mL)","BTU/h"]
      },
      { heading: "Lo que comparte con Imperial",
        text: "Longitud (pies, millas), masa (libras, onzas) y temperatura (Fahrenheit) son iguales en UK y US. Las diferencias están casi exclusivamente en las unidades de volumen líquido y algunas de masa (toneladas)."
      }
    ]
  }
};

// ── USO MUNDIAL ──────────────────────────────────────────────────────────────
const USO_MUNDIAL = [
  { flag:"🌎", region:"América Latina", sys:"si",  accentVar:"--si",
    items:["km/h en velocidad de tránsito","Litros en combustible y bebidas","kg y g en mercados y cocina","Hectáreas en agricultura","°C en temperatura cotidiana"] },
  { flag:"🇬🇧", region:"Reino Unido",    sys:"imp", accentVar:"--imp",
    items:["Millas y mph en carreteras","Stone + libras para peso corporal","Pintas en pubs (cerveza)","Pies/pulgadas en estatura","°C en meteorología oficial"] },
  { flag:"🇺🇸", region:"Estados Unidos", sys:"us",  accentVar:"--us",
    items:["Millas y mph en carreteras","Libras y onzas en peso y cocina","Galones en combustible","°F en temperatura cotidiana","Pies/pulgadas en construcción"] },
  { flag:"🇪🇺", region:"Europa continental", sys:"si", accentVar:"--si",
    items:["km/h, metros, kilogramos","Litros en todo tipo de volumen","kW en potencia de motores","°C oficial en toda la UE","Bar en presión de neumáticos"] },
  { flag:"✈️", region:"Aviación mundial", sys:"imp", accentVar:"--imp",
    items:["Pies (ft) en altitud de vuelo","Nudos (kn) en velocidad","Millas náuticas en distancia","Libras en peso de equipaje","inHg en presión barométrica"] },
  { flag:"⚕️", region:"Medicina global",  sys:"si",  accentVar:"--si",
    items:["mg y μg en dosificación","mmHg en presión arterial","mL en líquidos y dosis","kg en peso corporal","°C en temperatura corporal"] },
  { flag:"🛢️", region:"Industria petrolera", sys:"us", accentVar:"--us",
    items:["Barril (bbl) = 158.99 L (global)","psi en presión de ductos","BTU en energía del crudo","°F en procesos de refinería","Galones US en refino"] },
  { flag:"🏗️", region:"Construcción USA/UK", sys:"imp", accentVar:"--imp",
    items:["Pies y pulgadas en planos","Libras por pie cuadrado (psf)","BTU/h en climatización","Galones en pinturas y líquidos","HP en maquinaria"] },
];

// ── MÉTODOS DE CONVERSIÓN ────────────────────────────────────────────────────
const METHODS = {
  factor: {
    steps: [
      { title:"Identifica el factor de conversión",
        desc:"Cada par de unidades tiene un factor exacto. Ej: 1 pulgada = 2.54 cm. Ese 2.54 es el factor. Mayor→menor: multiplica. Menor→mayor: divide." },
      { title:"Aplica la operación",
        desc:"Multiplica o divide tu valor por el factor. Regla: unidad mayor → menor = multiplicar. Unidad menor → mayor = dividir." },
      { title:"Verifica con las unidades",
        desc:"Cancela las unidades como fracciones. Si el resultado tiene la unidad correcta, la conversión es válida." }
    ],
    terminal: [
      { label:"Ejemplo:",   val:"5 millas → km",         cls:"" },
      { label:"Factor:",    val:"1 mi = 1.60934 km",      cls:"blue" },
      { label:"Operación:", val:"5 × 1.60934 = 8.047 km", cls:"amber" }
    ]
  },
  proporcion: {
    steps: [
      { title:"Plantea la proporción",
        desc:"Escribe la relación conocida como fracción: '1 libra / 0.4536 kg'. Luego plantea otra fracción con tu valor desconocido X." },
      { title:"Iguala las proporciones",
        desc:"Si 1 lb = 0.4536 kg, entonces 180 lb = X kg. Multiplica en cruz: X = 180 × 0.4536." },
      { title:"Despeja y calcula",
        desc:"Resuelve la multiplicación: X = 81.65 kg. Siempre verifica que las unidades sean coherentes." }
    ],
    terminal: [
      { label:"Relación:", val:"1 lb / 0.4536 kg = 180 lb / X kg", cls:"" },
      { label:"Despeje:",  val:"X = 180 × 0.4536 ÷ 1",            cls:"blue" },
      { label:"Resultado:",val:"X = 81.65 kg",                      cls:"amber" }
    ]
  },
  cadena: {
    steps: [
      { title:"Cuando no hay un factor directo",
        desc:"A veces necesitas una unidad intermedia. Para km/h a m/s: convierte km a m (×1000) y horas a segundos (÷3600)." },
      { title:"Escribe la cadena de fracciones",
        desc:"Multiplica tu valor por cada fracción de conversión en cadena. Las unidades del numerador y denominador se cancelan." },
      { title:"Cancela y simplifica",
        desc:"Las unidades que aparecen arriba y abajo se eliminan. Solo queda la unidad final deseada." }
    ],
    terminal: [
      { label:"Problema:",  val:"90 km/h → m/s",                      cls:"" },
      { label:"Cadena:",    val:"90 × (1000 m/km) × (1 h/3600 s)",    cls:"blue" },
      { label:"Cancela:",   val:"km y h se eliminan → solo m/s",       cls:"dim" },
      { label:"Resultado:", val:"90 000 ÷ 3600 = 25 m/s",              cls:"amber" }
    ]
  }
};

// ── UNIDADES PARA EL CONVERTIDOR ─────────────────────────────────────────────
const CONV_UNITS = {
  "Longitud": [
    { label:"metro (m)",        factor:1 },
    { label:"kilómetro (km)",   factor:1000 },
    { label:"centímetro (cm)",  factor:0.01 },
    { label:"milímetro (mm)",   factor:0.001 },
    { label:"pulgada (in)",     factor:0.0254 },
    { label:"pie (ft)",         factor:0.3048 },
    { label:"yarda (yd)",       factor:0.9144 },
    { label:"milla (mi)",       factor:1609.34 },
    { label:"milla náutica",    factor:1852 },
  ],
  "Masa": [
    { label:"kilogramo (kg)",   factor:1 },
    { label:"gramo (g)",        factor:0.001 },
    { label:"miligramo (mg)",   factor:0.000001 },
    { label:"tonelada (t)",     factor:1000 },
    { label:"libra (lb)",       factor:0.453592 },
    { label:"onza (oz)",        factor:0.0283495 },
    { label:"stone (st)",       factor:6.35029 },
    { label:"ton corta (US)",   factor:907.185 },
    { label:"ton larga (UK)",   factor:1016.05 },
  ],
  "Temperatura": [
    { label:"Celsius (°C)",     factor:1,   special:"C" },
    { label:"Fahrenheit (°F)",  factor:1,   special:"F" },
    { label:"Kelvin (K)",       factor:1,   special:"K" },
  ],
  "Área": [
    { label:"metro² (m²)",      factor:1 },
    { label:"km²",              factor:1e6 },
    { label:"cm²",              factor:0.0001 },
    { label:"hectárea (ha)",    factor:10000 },
    { label:"acre",             factor:4046.86 },
    { label:"pie² (ft²)",       factor:0.092903 },
    { label:"pulgada² (in²)",   factor:0.00064516 },
  ],
  "Volumen": [
    { label:"litro (L)",        factor:1 },
    { label:"mililitro (mL)",   factor:0.001 },
    { label:"m³",               factor:1000 },
    { label:"galón UK",         factor:4.54609 },
    { label:"galón US",         factor:3.78541 },
    { label:"pinta UK",         factor:0.568261 },
    { label:"pinta US",         factor:0.473176 },
    { label:"taza US (cup)",    factor:0.236588 },
    { label:"barril petróleo",  factor:158.987 },
  ],
  "Velocidad": [
    { label:"km/h",             factor:1 },
    { label:"m/s",              factor:3.6 },
    { label:"mph",              factor:1.60934 },
    { label:"nudo (kn)",        factor:1.852 },
    { label:"pie/s (ft/s)",     factor:1.09728 },
  ],
  "Presión": [
    { label:"pascal (Pa)",      factor:1 },
    { label:"kilopascal (kPa)", factor:1000 },
    { label:"bar",              factor:100000 },
    { label:"atm",              factor:101325 },
    { label:"psi",              factor:6894.76 },
    { label:"mmHg",             factor:133.322 },
  ],
  "Tiempo": [
    { label:"segundo (s)",      factor:1 },
    { label:"milisegundo (ms)", factor:0.001 },
    { label:"minuto (min)",     factor:60 },
    { label:"hora (h)",         factor:3600 },
    { label:"día (d)",          factor:86400 },
    { label:"semana",           factor:604800 },
    { label:"año",              factor:31557600 },
  ],
};

// ── TABLA DE CONVERSIONES ────────────────────────────────────────────────────
// [nombre, de, a, fórmula, sistema, categoría, nota]
const CONV_DATA = [
  ["km → m","km","m","× 1 000","SI","Longitud",""],
  ["m → cm","m","cm","× 100","SI","Longitud",""],
  ["m → mm","m","mm","× 1 000","SI","Longitud",""],
  ["cm → mm","cm","mm","× 10","SI","Longitud",""],
  ["m → km","m","km","÷ 1 000","SI","Longitud",""],
  ["milla → km","mi","km","× 1.60934","SI-IMP","Longitud","Milla terrestre"],
  ["km → milla","km","mi","÷ 1.60934","SI-IMP","Longitud",""],
  ["pulgada → cm","in","cm","× 2.54","SI-IMP","Longitud","Exacto por definición"],
  ["cm → pulgada","cm","in","÷ 2.54","SI-IMP","Longitud",""],
  ["pie → m","ft","m","× 0.3048","SI-IMP","Longitud",""],
  ["m → pie","m","ft","× 3.28084","SI-IMP","Longitud",""],
  ["yarda → m","yd","m","× 0.9144","SI-IMP","Longitud",""],
  ["milla náutica → km","nmi","km","× 1.852","SI-IMP","Longitud","Igual en UK y US"],
  ["furlong → m","fur","m","× 201.168","IMP","Longitud","Solo Imperial UK"],
  ["pie → pulgada","ft","in","× 12","IMP","Longitud","Interna imperial"],
  ["yarda → pie","yd","ft","× 3","IMP","Longitud","Interna imperial"],
  ["milla → yarda","mi","yd","× 1 760","IMP","Longitud","Interna imperial"],
  ["pulgada → mm","in","mm","× 25.4","SI-IMP","Longitud",""],
  ["pie → cm","ft","cm","× 30.48","SI-IMP","Longitud",""],
  ["kg → g","kg","g","× 1 000","SI","Masa",""],
  ["g → mg","g","mg","× 1 000","SI","Masa",""],
  ["t → kg","t","kg","× 1 000","SI","Masa","Tonelada métrica"],
  ["libra → kg","lb","kg","× 0.453592","SI-IMP","Masa","Igual en UK y US"],
  ["kg → libra","kg","lb","× 2.20462","SI-IMP","Masa",""],
  ["onza → g","oz","g","× 28.3495","SI-IMP","Masa","Onza avoirdupois"],
  ["g → onza","g","oz","÷ 28.3495","SI-IMP","Masa",""],
  ["stone → kg","st","kg","× 6.35029","IMP","Masa","Solo Imperial UK"],
  ["stone → libra","st","lb","× 14","IMP","Masa","Interna imperial"],
  ["libra → onza","lb","oz","× 16","IMP","Masa","Interna imperial"],
  ["ton corta → kg","ton","kg","× 907.185","US","Masa","Ton US = 2 000 lb"],
  ["ton larga → kg","LT","kg","× 1 016.05","IMP","Masa","Ton UK = 2 240 lb"],
  ["onza troy → g","oz t","g","× 31.1035","IMP","Masa","Metales preciosos"],
  ["quintal → kg","q","kg","× 100","SI","Masa",""],
  ["°C → °F","°C","°F","(× 9/5) + 32","SI-IMP","Temperatura",""],
  ["°F → °C","°F","°C","(- 32) × 5/9","SI-IMP","Temperatura",""],
  ["°C → K","°C","K","+ 273.15","SI","Temperatura",""],
  ["K → °C","K","°C","- 273.15","SI","Temperatura",""],
  ["°F → K","°F","K","(°F-32)×5/9 + 273.15","SI-IMP","Temperatura",""],
  ["°C → Rankine","°C","°R","(°C+273.15)×9/5","SI-US","Temperatura",""],
  ["°F → Rankine","°F","°R","°F + 459.67","US","Temperatura","Rankine = base US"],
  ["m² → cm²","m²","cm²","× 10 000","SI","Área",""],
  ["km² → m²","km²","m²","× 1 000 000","SI","Área",""],
  ["ha → m²","ha","m²","× 10 000","SI","Área",""],
  ["km² → ha","km²","ha","× 100","SI","Área",""],
  ["acre → m²","ac","m²","× 4 046.86","SI-IMP","Área","Igual en UK y US"],
  ["acre → ha","ac","ha","× 0.404686","SI-IMP","Área",""],
  ["ha → acre","ha","ac","× 2.47105","SI-IMP","Área",""],
  ["milla² → km²","mi²","km²","× 2.58999","SI-IMP","Área",""],
  ["pie² → m²","ft²","m²","× 0.092903","SI-IMP","Área",""],
  ["pulgada² → cm²","in²","cm²","× 6.4516","SI-IMP","Área",""],
  ["m³ → L","m³","L","× 1 000","SI","Volumen",""],
  ["L → mL","L","mL","× 1 000","SI","Volumen",""],
  ["galón UK → L","gal UK","L","× 4.54609","SI-IMP","Volumen","Imperial gallon"],
  ["galón US → L","gal US","L","× 3.78541","SI-US","Volumen","US liquid gallon"],
  ["galón UK → galón US","gal UK","gal US","× 1.20095","IMP-US","Volumen","Diferencia clave"],
  ["galón US → galón UK","gal US","gal UK","÷ 1.20095","IMP-US","Volumen",""],
  ["pinta UK → L","pt UK","L","× 0.568261","SI-IMP","Volumen",""],
  ["pinta US → L","pt US","L","× 0.473176","SI-US","Volumen",""],
  ["pinta UK → pinta US","pt UK","pt US","× 1.20095","IMP-US","Volumen",""],
  ["oz fluida UK → mL","fl oz UK","mL","× 28.4131","SI-IMP","Volumen",""],
  ["oz fluida US → mL","fl oz US","mL","× 29.5735","SI-US","Volumen",""],
  ["taza US → mL","cup US","mL","× 236.588","SI-US","Volumen","Cocina US"],
  ["pie³ → L","ft³","L","× 28.3168","SI-IMP","Volumen",""],
  ["barril petróleo → L","bbl","L","× 158.987","US","Volumen","Oil barrel US"],
  ["barril UK → L","bbl UK","L","× 163.659","IMP","Volumen","Imperial barrel"],
  ["m/s → km/h","m/s","km/h","× 3.6","SI","Velocidad",""],
  ["km/h → m/s","km/h","m/s","÷ 3.6","SI","Velocidad",""],
  ["km/h → mph","km/h","mph","÷ 1.60934","SI-IMP","Velocidad",""],
  ["mph → km/h","mph","km/h","× 1.60934","SI-IMP","Velocidad",""],
  ["nudo → km/h","kn","km/h","× 1.852","SI-IMP","Velocidad",""],
  ["pie/s → m/s","ft/s","m/s","× 0.3048","SI-IMP","Velocidad",""],
  ["Mach → km/h","Ma","km/h","× 1 234.8","SI","Velocidad","A 20°C"],
  ["Pa → kPa","Pa","kPa","÷ 1 000","SI","Presión",""],
  ["bar → Pa","bar","Pa","× 100 000","SI","Presión",""],
  ["atm → Pa","atm","Pa","× 101 325","SI","Presión",""],
  ["psi → kPa","psi","kPa","× 6.89476","SI-IMP","Presión","psi = lb/in²"],
  ["psi → bar","psi","bar","× 0.0689476","SI-IMP","Presión",""],
  ["kPa → psi","kPa","psi","÷ 6.89476","SI-IMP","Presión",""],
  ["mmHg → Pa","mmHg","Pa","× 133.322","SI","Presión","Torr ≈ mmHg"],
  ["inHg → kPa","inHg","kPa","× 3.38639","SI-IMP","Presión","Meteorología"],
  ["J → cal","J","cal","÷ 4.184","SI","Energía",""],
  ["cal → J","cal","J","× 4.184","SI","Energía",""],
  ["kcal → J","kcal","J","× 4 184","SI","Energía","1 kcal = 1 Cal alimentaria"],
  ["kWh → J","kWh","J","× 3 600 000","SI","Energía",""],
  ["BTU → J","BTU","J","× 1 055.06","SI-IMP","Energía","British Thermal Unit"],
  ["BTU → kcal","BTU","kcal","× 0.251996","SI-IMP","Energía",""],
  ["kWh → BTU","kWh","BTU","× 3 412.14","SI-IMP","Energía",""],
  ["W → kW","W","kW","÷ 1 000","SI","Potencia",""],
  ["HP → W","hp","W","× 745.7","SI-IMP","Potencia","HP mecánico"],
  ["kW → HP","kW","hp","× 1.34102","SI-IMP","Potencia",""],
  ["CV → kW","CV","kW","× 0.7355","SI-IMP","Potencia","Caballo de vapor"],
  ["BTU/h → W","BTU/h","W","× 0.293071","SI-IMP","Potencia","Climatización"],
  ["s → ms","s","ms","× 1 000","SI","Tiempo",""],
  ["min → s","min","s","× 60","SI","Tiempo",""],
  ["h → s","h","s","× 3 600","SI","Tiempo",""],
  ["h → min","h","min","× 60","SI","Tiempo",""],
  ["d → h","d","h","× 24","SI","Tiempo",""],
  ["semana → d","sem","d","× 7","SI","Tiempo",""],
  ["año → d","año","d","× 365.25","SI","Tiempo","Año juliano"],
  ["B → bit","B","bit","× 8","SI","Datos",""],
  ["kB → B","kB","B","× 1 024","SI","Datos",""],
  ["MB → kB","MB","kB","× 1 024","SI","Datos",""],
  ["GB → MB","GB","MB","× 1 024","SI","Datos",""],
  ["TB → GB","TB","GB","× 1 024","SI","Datos",""],
  ["MB → Mbit","MB","Mbit","× 8","SI","Datos",""],
];

const SYS_LABELS = {
  "SI":"SI (métrico)", "IMP":"Imperial UK", "US":"EE.UU.",
  "SI-IMP":"SI ↔ Imperial", "SI-US":"SI ↔ US", "IMP-US":"Imperial ↔ US"
};

// ── EJEMPLOS DIDÁCTICOS ──────────────────────────────────────────────────────
const EXAMPLES = {
  basico: [
    { cat:"Longitud", title:"5 km a metros",
      context:"Quieres saber cuántos metros hay en 5 km para una carrera.",
      steps:[["Fórmula","km × 1 000 = m"],["Sustituye","5 × 1 000"],["Resultado","= 5 000 m"]],
      result:"5 km = 5 000 m",
      tip:"De mayor a menor siempre multiplicas. km → m multiplica por 1 000." },
    { cat:"Masa", title:"3 kg a gramos",
      context:"Una receta pide 3 kg de harina pero la balanza mide en gramos.",
      steps:[["Fórmula","kg × 1 000 = g"],["Sustituye","3 × 1 000"],["Resultado","= 3 000 g"]],
      result:"3 kg = 3 000 g",
      tip:"kg a g siempre multiplica por 1 000. Esencial en cocina." },
    { cat:"Temperatura", title:"100 °C a Fahrenheit",
      context:"El agua hierve a 100 °C. ¿Cuánto es en Fahrenheit?",
      steps:[["Fórmula","°F = (°C × 9/5) + 32"],["Multiplica","100 × 9/5 = 180"],["Suma 32","180 + 32 = 212 °F"]],
      result:"100 °C = 212 °F",
      tip:"El punto de ebullición es exactamente 212 °F — fácil de recordar." },
    { cat:"Tiempo", title:"2 horas a minutos",
      context:"Una película dura 2 horas. ¿Cuántos minutos son?",
      steps:[["Fórmula","h × 60 = min"],["Sustituye","2 × 60"],["Resultado","= 120 min"]],
      result:"2 h = 120 min",
      tip:"1 hora = 60 min. 1 día = 1 440 min." },
  ],
  medio: [
    { cat:"Longitud", title:"1.5 millas a km",
      context:"Una señal en EE.UU. dice '1.5 miles'. ¿Cuántos km son?",
      steps:[["Fórmula","mi × 1.60934 = km"],["Sustituye","1.5 × 1.60934"],["Calcula","= 2.414 km"],["Redondea","≈ 2.41 km"]],
      result:"1.5 mi ≈ 2.41 km",
      tip:"Truco rápido: millas × 1.6 para estimación precisa." },
    { cat:"Masa", title:"180 libras a kg",
      context:"Un amigo pesa 180 lb. ¿Cuántos kg son?",
      steps:[["Fórmula","lb × 0.453592 = kg"],["Sustituye","180 × 0.453592"],["Calcula","= 81.65 kg"]],
      result:"180 lb ≈ 81.6 kg",
      tip:"Truco: divide libras entre 2.2. Ej: 180 ÷ 2.2 ≈ 81.8 kg." },
    { cat:"Temperatura", title:"350 °F a °C (horno)",
      context:"Una receta dice hornear a 350 °F. ¿A cuántos °C?",
      steps:[["Fórmula","°C = (°F - 32) × 5/9"],["Resta 32","350 - 32 = 318"],["× 5/9","318 × 5 ÷ 9 = 176.7 °C"]],
      result:"350 °F ≈ 177 °C",
      tip:"175 °C es la referencia práctica más cercana en hornos domésticos." },
    { cat:"Volumen", title:"Galón UK vs galón US",
      context:"El galón no es igual en UK y EE.UU. ¿Cuánto difieren?",
      steps:[["Galón UK → L","1 × 4.54609 = 4.546 L"],["Galón US → L","1 × 3.78541 = 3.785 L"],["Diferencia","4.546 - 3.785 = 0.761 L"]],
      result:"1 gal UK = 1.201 gal US",
      tip:"El galón UK es ~20% mayor. Crítico en recetas y combustible." },
    { cat:"Velocidad", title:"90 km/h a m/s",
      context:"Un auto va a 90 km/h. ¿Cuántos metros por segundo?",
      steps:[["Fórmula","m/s = km/h ÷ 3.6"],["Sustituye","90 ÷ 3.6"],["Resultado","= 25 m/s"]],
      result:"90 km/h = 25 m/s",
      tip:"÷ 3.6 convierte siempre km/h a m/s. Factor clave en física." },
  ],
  avanzado: [
    { cat:"Energía", title:"250 kcal a Joules",
      context:"Un alimento tiene 250 kcal. ¿Cuántos Joules contiene?",
      steps:[["1 kcal = 1 000 cal","250 kcal = 250 000 cal"],["Fórmula","cal × 4.184 = J"],["Aplica","250 000 × 4.184 = 1 046 000 J"],["A kJ","÷ 1 000 = 1 046 kJ"]],
      result:"250 kcal = 1 046 kJ",
      tip:"En etiquetas europeas verás kcal y kJ juntos. 1 kcal = 4.184 kJ." },
    { cat:"Presión", title:"32 psi a bar y kPa",
      context:"Manual de auto pide 32 psi en llantas. Expresarlo en bar y kPa.",
      steps:[["psi → bar","32 × 0.0689476 = 2.206 bar"],["psi → kPa","32 × 6.89476 = 220.6 kPa"],["Resumen","32 psi = 2.21 bar = 220.6 kPa"]],
      result:"32 psi = 2.21 bar = 220.6 kPa",
      tip:"Europa usa bar; Latinoamérica usa kPa. Saber ambas evita errores." },
    { cat:"Velocidad", title:"Mach 2 a km/h y m/s",
      context:"Un avión supera Mach 2. ¿Cuánto es en km/h y m/s?",
      steps:[["Mach 1 = 343 m/s","Mach 2 = 2 × 343 = 686 m/s"],["m/s → km/h","686 × 3.6 = 2 469.6 km/h"],["Verificación","Mach 2 × 1 234.8 = 2 469.6 km/h ✓"]],
      result:"Mach 2 = 686 m/s = 2 469.6 km/h",
      tip:"A 10 000 m de altitud Mach 1 ≈ 295 m/s. Varía con la temperatura." },
    { cat:"Temperatura", title:"-40 °C = -40 °F",
      context:"El único punto donde Celsius y Fahrenheit coinciden exactamente.",
      steps:[["Verifica","(-40 × 9/5) + 32 = -72 + 32 = -40 °F ✓"],["°C → K","-40 + 273.15 = 233.15 K"],["°F → K","(-40-32)×5/9+273.15 = 233.15 K ✓"]],
      result:"-40 °C = -40 °F = 233.15 K",
      tip:"Es el único cruce de las escalas. Úsalo para verificar fórmulas." },
    { cat:"Potencia", title:"150 HP a kW y W",
      context:"Motor de 150 HP. Conversión completa al sistema SI.",
      steps:[["HP → kW","150 × 0.7457 = 111.86 kW"],["kW → W","111.86 × 1 000 = 111 860 W"],["Redondea","≈ 111.9 kW"]],
      result:"150 HP ≈ 111.9 kW = 111 900 W",
      tip:"Europa usa kW; EE.UU. usa HP. Divide HP entre 1.341 para invertir." },
  ]
};
