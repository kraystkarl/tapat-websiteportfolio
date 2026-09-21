// Custom geometric dot cursor — tracks with eased momentum (Lerp + rAF).
(() => {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pos = { x: mouse.x, y: mouse.y };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  (function loop() {
    pos.x += (mouse.x - pos.x) * 0.2;
    pos.y += (mouse.y - pos.y) * 0.2;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
})();

// Kinetic roles — continuous downward ribbon, one title at a time.
// Outgoing slides down-out while incoming slides down-in, same speed,
// same direction: they never cross. Looping wraps without rewinding.
(() => {
  const items = [...document.querySelectorAll('.roles-item')];
  if (items.length < 2) return;
  const HOLD = 2600;
  let i = 0;
  setInterval(() => {
    const cur = items[i];
    i = (i + 1) % items.length;
    const next = items[i];
    // Ribbon step: current 0 -> +120%, next -120% -> 0, together.
    cur.classList.remove('is-active');
    cur.classList.add('is-below');
    next.classList.add('is-active');
    // Park the departed item back above, instantly and invisibly,
    // ready for its next turn.
    setTimeout(() => {
      cur.classList.add('no-anim');
      cur.classList.remove('is-below');
      void cur.offsetWidth;
      cur.classList.remove('no-anim');
    }, 750);
  }, HOLD);
})();

// Background dynamics — spotlight trails the cursor, grid drifts for depth.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const glow = document.getElementById('glow');
  const grid = document.querySelector('.grid-overlay');
  if (!glow || !grid) return;
  const m = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const g = { x: m.x, y: m.y };
  const d = { x: 0, y: 0 };
  let seen = false;
  window.addEventListener('mousemove', (e) => {
    m.x = e.clientX;
    m.y = e.clientY;
    if (!seen) { seen = true; glow.classList.add('on'); }
  });
  (function loop() {
    g.x += (m.x - g.x) * 0.08;
    g.y += (m.y - g.y) * 0.08;
    glow.style.transform = `translate(${g.x}px, ${g.y}px)`;
    const nx = g.x / window.innerWidth - 0.5;
    const ny = g.y / window.innerHeight - 0.5;
    d.x += (nx * 24 - d.x) * 0.05;
    d.y += (ny * 24 - d.y) * 0.05;
    grid.style.transform = `translate(${-d.x}px, ${-d.y}px)`;
    requestAnimationFrame(loop);
  })();
})();

// Competency bars — fill when the glance section scrolls into view.
(() => {
  const sec = document.querySelector('.glance');
  if (!sec) return;
  if (!('IntersectionObserver' in window)) { sec.classList.add('in'); return; }
  new IntersectionObserver((entries, io) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { sec.classList.add('in'); io.disconnect(); }
    });
  }, { threshold:0.3 }).observe(sec);
})();

// Theme — dark is the exact inverse of the rule palette, persisted.
(() => {
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  try {
    if (localStorage.getItem('ct-theme') === 'light') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'dark'); // dark is the default
  } catch (e) { root.setAttribute('data-theme', 'dark'); }
  if (!btn) return;
  const sync = () => btn.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
  btn.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    if (dark) root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'dark');
    try { localStorage.setItem('ct-theme', dark ? 'light' : 'dark'); } catch (e) { /* ignore */ }
    sync();
  });
  sync();
})();

// Nav — hidden on the landing, reveals on first scroll down.
// Pages with .nav-lock (About) keep the header pinned instead.
(() => {
  if (document.body.classList.contains('nav-lock')) {
    document.body.classList.add('nav-on');
    return;
  }
  const y = () => Math.max(
    window.scrollY || 0,
    (document.documentElement && document.documentElement.scrollTop) || 0,
    (document.body && document.body.scrollTop) || 0
  );
  let last = 0;
  const onScroll = () => {
    const v = y();
    // show on first downward scroll, hide back at the very top
    if (v > last && v > 8) document.body.classList.add('nav-on');
    else if (v <= 8) document.body.classList.remove('nav-on');
    last = v;
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// Tools expand/collapse — works for every VIEW ALL card (glance + about).
(() => {
  document.querySelectorAll('.tools-card').forEach((card) => {
    const btn = card.querySelector('.view-all');
    if (!btn) return;
    const label = btn.querySelector('.va-label');
    const arrow = btn.querySelector('.va-arrow');
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'SHOW LESS' : 'VIEW ALL';
      if (arrow) arrow.textContent = open ? '⌃' : '⌄';
    });
  });
})();

// About — trainings collapse toggle.
(() => {
  const card = document.getElementById('trainCard');
  const btn = document.getElementById('trainToggle');
  if (!card || !btn) return;
  const label = btn.querySelector('.va-label');
  const arrow = btn.querySelector('.va-arrow');
  btn.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (label) label.textContent = open ? 'SHOW LESS' : 'VIEW ALL';
    if (arrow) arrow.textContent = open ? '⌃' : '⌄';
  });
})();

// About — experience company tabs.
(() => {
  const tabs = [...document.querySelectorAll('.exp-tab')];
  const panels = [...document.querySelectorAll('.exp-panel')];
  if (!tabs.length || !panels.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      panels.forEach((p) => {
        p.hidden = p.dataset.panel !== tab.dataset.co;
      });
    });
  });
})();

// About — personal vault modal (sample content, replace with yours).
(() => {
  const modal = document.getElementById('vaultModal');
  const openBtn = document.getElementById('vaultOpen');
  const closeBtn = document.getElementById('vaultClose');
  if (!modal || !openBtn) return;
  let savedY = 0;
  const open = () => {
    savedY = window.scrollY || document.documentElement.scrollTop || 0;
    modal.classList.add('on');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    startShow();
    if (closeBtn) {
      try { closeBtn.focus({ preventScroll: true }); }
      catch (e) { closeBtn.focus(); }
    }
  };
  const close = () => {
    stopShow();
    modal.classList.remove('on');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.scrollTo(0, savedY);
    if (openBtn) {
      try { openBtn.focus({ preventScroll: true }); }
      catch (e) { /* keep restored scroll */ }
    }
  };
  openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.querySelector('[data-vault-close]').addEventListener('click', close);
  // Vault photo slideshow — add more { src, alt } entries below as photos arrive.
  const VAULT_SHOTS = [
    { src: './assets/IMG_2080-web.jpg', alt: 'Sample personal photo 1 — more of yours coming soon' },
    { src: './assets/about-photo.jpg', alt: 'Sample personal photo 2 — more of yours coming soon' }
  ];
  const vImg = document.getElementById('vaultHeroImg');
  const vCount = document.getElementById('vaultCount');
  let vIdx = 0;
  const vRender = () => {
    if (!vImg) return;
    vImg.src = VAULT_SHOTS[vIdx].src;
    vImg.alt = VAULT_SHOTS[vIdx].alt;
    vImg.classList.remove('vswap');
    void vImg.offsetWidth;
    vImg.classList.add('vswap');
    if (vCount) vCount.textContent = (vIdx + 1) + ' / ' + VAULT_SHOTS.length;
  };
  const vStep = (d) => {
    vIdx = (vIdx + d + VAULT_SHOTS.length) % VAULT_SHOTS.length;
    vRender();
  };
  // Auto-shuffle every 4.5s while open, pauses while hovered.
  let vTimer = null;
  const vHero = vImg ? vImg.closest('.vault-hero') : null;
  const stopShow = () => {
    if (vTimer) { clearInterval(vTimer); vTimer = null; }
  };
  const startShow = () => {
    stopShow();
    vTimer = setInterval(() => vStep(1), 4500);
  };
  if (vHero) {
    vHero.addEventListener('mouseenter', stopShow);
    vHero.addEventListener('mouseleave', () => {
      if (modal.classList.contains('on')) startShow();
    });
  }
  vRender();
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('on') && e.key === 'Escape') close();
  });
})();

// Nav services dropdown — click toggles for touch, hover/focus open via CSS.
(() => {
  const drop = document.querySelector('.nav-drop');
  const toggle = document.getElementById('svcToggle');
  if (!drop || !toggle) return;
  const close = () => {
    drop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', (e) => {
    if (drop.classList.contains('open')) { close(); }
    else {
      drop.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      e.preventDefault();
    }
  });
  document.addEventListener('click', (e) => {
    if (!drop.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// Featured works — project detail modal (EDIT : replace copy + shots with final content).
const PROJECTS = [
  {
    tag: 'Construction Estimator',
    title: 'AU Timber Frame Architectural Estimating',
    role: 'Role: Construction Estimator',
    overview: 'Complete architectural estimate for a timber-frame build — takeoffs, BOQ, and cost breakdown delivered in one coordinated package.',
    highlights: ['Full quantity takeoff from drawings', 'BOQ with traced cost breakdown', 'Reviewed quantities ready for bid'],
    tools: ['PlanSwift', 'Bluebeam Revu', 'Excel'],
    shots: [
      { src: './work/roofing-take-off.jpg', alt: 'Roofing quantity takeoff for a timber-frame build' },
      { src: './work/area-takeoff-landscape.jpg', alt: 'Landscape area takeoff for a timber-frame build' }
    ]
  },
  {
    tag: 'Take-off Specialist',
    title: 'AU Structural Estimating',
    role: 'Role: Take-off Specialist',
    overview: 'Structural quantity takeoff with BOQ-ready quantities verified line by line against the construction drawings.',
    highlights: ['Ceiling and floor area takeoffs', 'Calibrated plans before measuring', 'Evidence-indexed quantities'],
    tools: ['AutoCAD', 'PlanSwift', 'Excel'],
    shots: [
      { src: './work/area-takeoff-ceiling-floor.jpg', alt: 'Ceiling and floor area takeoff for structural works' },
      { src: './work/plan-calibration.jpg', alt: 'Plan calibration before structural takeoff' }
    ]
  },
  {
    tag: 'Project Coordinator',
    title: 'PH Residential House Take-off',
    role: 'Role: Project Coordinator',
    overview: 'Full residential takeoff coordinated from plans to final quantities, schedules, and documentation.',
    highlights: ['Door and window count takeoff', 'Coordinated plans and documents', 'Handover-ready quantity pack'],
    tools: ['Bluebeam Revu', 'Workspace', 'M365'],
    shots: [
      { src: './work/count-takeoff-doors-windows.jpg', alt: 'Door and window count takeoff for a residential house' },
      { src: './work/area-takeoff-landscape.jpg', alt: 'Landscape area takeoff for a residential house' }
    ]
  }
];

// AU Timber Frame case file — verbatim proof content, shown only in its popup.
const CASE_STEPS = [
  {
    n: '01', name: 'TAKE-OFF', tool: 'Bluebeam Revu',
    title: 'Plan Calibration & Digital Quantity Take-Offs',
    desc: 'Scale verification across architectural sheets and digital polygon take-offs for landscape areas, floor/ceiling finishes, door/window counts, roofing pitch, and linear perimeters.',
    goal: 'Calibrate drawing scale accurately and measure all architectural components directly from vectorized PDF sheets.',
    action: 'Set calibrated dimensions on plan views; generated dedicated subject layers for landscape areas, door/window counts, ceiling/floor finishes, roof geometry, and cornice perimeters.',
    outcome: 'Precision quantities captured in Bluebeam Markups List ready for export with exact measurement types and visual redline boundaries.',
    images: [
      { src: './work/plan-calibration.jpg', title: 'Plan Calibration Verification', cat: 'Bluebeam Revu · Scale Setting', desc: 'Verifying known dimension scale before measuring to guarantee 100% geometric accuracy.' },
      { src: './work/area-takeoff-landscape.jpg', title: 'Landscape & External Area Take-Off', cat: 'Bluebeam Revu · Area Polygon', desc: 'Color-coded area markups for softscape, hardscape, pavements, and garden boundaries.' },
      { src: './work/area-takeoff-ceiling-floor.jpg', title: 'Ceiling & Floor Finishes Area Take-Off', cat: 'Bluebeam Revu · Area Measurements', desc: 'Room-by-room area take-offs for ceramic tile, timber flooring, and plasterboard ceiling linings.' },
      { src: './work/count-takeoff-doors-windows.jpg', title: 'Door & Window Count Take-Off', cat: 'Bluebeam Revu · Count Markups', desc: 'Exact itemized schedule counting for internal/external doors, aluminium windows, and glazing.' },
      { src: './work/roofing-take-off.jpg', title: 'Roofing Geometry & Pitch Take-Off', cat: 'Bluebeam Revu · Rafter & Sheeting', desc: 'Calculating plan roof areas and applying slope pitch multipliers for roof sheeting and insulation.' }
    ]
  },
  {
    n: '02', name: 'CALCULATION', tool: 'Microsoft Excel',
    title: 'Quantity Derivation & Formula Calculations',
    desc: 'Translating raw measured values into true purchase and installation quantities by applying slope multipliers, pitch factors, and standard material waste percentages.',
    goal: 'Plan measurements represent flat nominal dimensions; actual material procurement requires slope adjustments and waste factors.',
    action: 'Built dynamic Excel formulas converting measured Bluebeam markup areas into derived quantities (e.g. Roof Area x Pitch Factor 1.05 + 8% Waste).',
    outcome: 'Transparent, formula-linked lineage from raw drawing measurement to calculated trade quantity.',
    images: [
      { src: './work/csv-p1.jpg', tab: 'Page 1', title: 'Formula Derivation & Quantity Calculations', cat: 'Excel Pack · Calculation Lineage', desc: 'Direct CSV takeoff support and formula derivation tracing raw Bluebeam export rows (lengths, areas, counts) into intermediate computation roles and final BOQ quantities with zero variance.' }
    ]
  },
  {
    n: '03', name: 'BOQ', tool: 'Microsoft Excel',
    title: 'Bill of Quantities (BOQ - Reviewed)',
    desc: 'Structured, trade-by-trade BOQ organizing quantities into standardized line items, clear work descriptions, measurement units, unit rates, and total amounts.',
    goal: 'Transform derived quantities into an industry-standard format ready for pricing, contractor bidding, and client review.',
    action: 'Formatted quantities into itemized trade divisions (Demolition, Concrete, Carpentry, Finishes, Doors/Windows) with standardized descriptions and units.',
    outcome: 'A comprehensive, reviewed Bill of Quantities providing full transparency for tenders and budget approvals.',
    images: [
      { src: './work/boq-p1.jpg', tab: 'Page 1', title: 'BOQ Reviewed · Main Bill of Quantities', cat: 'Excel Pack · Trade BOQ', desc: 'Complete 3-page audited Bill of Quantities covering 11 architectural trade divisions with source lineage formulas and verification audit statuses.' },
      { src: './work/boq-p2.jpg', tab: 'Page 2', title: 'BOQ Reviewed · Main Bill of Quantities', cat: 'Excel Pack · Trade BOQ', desc: 'Complete 3-page audited Bill of Quantities covering 11 architectural trade divisions with source lineage formulas and verification audit statuses.' },
      { src: './work/boq-p3.jpg', tab: 'Page 3', title: 'BOQ Reviewed · Main Bill of Quantities', cat: 'Excel Pack · Trade BOQ', desc: 'Complete 3-page audited Bill of Quantities covering 11 architectural trade divisions with source lineage formulas and verification audit statuses.' }
    ]
  },
  {
    n: '04', name: 'RFI', tool: 'Microsoft Excel',
    title: 'Request for Information (RFI - Demonstration)',
    desc: 'Documenting plan queries and schedule discrepancies (e.g. door schedule contradictions between architectural floor plan and door schedule notes) to eliminate estimating ambiguity.',
    goal: 'Floor plan callouts indicated 900mm wide doors, while the door schedule specified 800mm leaf dimensions.',
    action: 'Logged an itemized RFI referencing drawing sheet numbers, pinpointing the contradiction, and proposing a documented basis of estimate pending clarification.',
    outcome: 'Preconstruction risk mitigated by eliminating guesswork before tender finalization.',
    images: [
      { src: './work/rfi-p1.jpg', tab: 'Page 1', title: 'RFI Demonstration · Door Schedule Discrepancy', cat: 'Excel Pack · Preconstruction RFI', desc: 'Itemized formal Request for Information highlighting conflicting architectural plan callouts vs door schedule dimensions.' }
    ]
  },
  {
    n: '05', name: 'QC', tool: 'Microsoft Excel',
    title: 'Quality Control Reconciliation Matrix',
    desc: 'Side-by-side reconciliation table verifying that all raw take-off quantities match the final BOQ totals with zero variance.',
    goal: 'Ensure no quantity was omitted, doubled, or miscalculated during the transfer from digital markup to pricing spreadsheet.',
    action: 'Created a cross-checking reconciliation matrix comparing raw Bluebeam layer totals against final BOQ line quantities with automated variance flags.',
    outcome: 'Zero-variance confirmation and verified audit trail before tender submission.',
    images: [
      { src: './work/qc-p1.jpg', tab: 'Page 1', title: 'QC Reconciliation Matrix · Zero Variance Audit', cat: 'Excel Pack · Quality Assurance', desc: 'Side-by-side audit matrix reconciling raw takeoff sums against final BOQ line item quantities.' }
    ]
  },
  {
    n: '06', name: 'TRACEABILITY', tool: 'Microsoft Excel / CSV',
    title: 'CSV Takeoff Support & Audit Lineage',
    desc: 'Direct mapping showing how every single Bluebeam markup row maps to its corresponding row in the pricing sheet.',
    goal: 'Provide an unbreakable audit trail so any client or commercial director can trace every penny back to a specific vector polygon.',
    action: 'Exported structured CSV markups data, maintaining unique Bluebeam Markup IDs and linking them directly into the Excel workbook columns.',
    outcome: 'Complete mathematical transparency and instant auditability for every single line item in the tender.',
    images: [
      { src: './work/csv-p1.jpg', tab: 'Page 1', title: 'CSV Takeoff Support · Full Traceability Audit', cat: 'Excel Pack · Audit Trail', desc: 'Direct CSV takeoff support mapping individual Bluebeam markup IDs directly into pricing workbook columns.' }
    ]
  }
];

(() => {
  const modal = document.getElementById('projModal');
  const card = modal && modal.querySelector('.proj-card');
  const closeBtn = document.getElementById('projClose');
  const heroImg = document.getElementById('projHeroImg');
  const thumbs = document.getElementById('projThumbs');
  const count = document.getElementById('projCount');
  const bar = document.getElementById('projBar');
  if (!modal || !card) return;

  let data = null;
  let idx = 0;
  let lastCard = null;
  let savedY = 0;
  let caseStep = 0;
  let casePlate = 0;

  const render = () => {
    const shots = data.shots;
    const shot = shots[idx];
    heroImg.src = shot.src;
    heroImg.alt = shot.alt;
    count.textContent = (idx + 1) + ' / ' + shots.length;
    bar.style.width = ((idx + 1) / shots.length * 100) + '%';
    [...thumbs.children].forEach((t, i) => {
      t.classList.toggle('is-active', i === idx);
    });
  };

  const open = (i, el) => {
    data = PROJECTS[i];
    if (!data) return;
    idx = 0;
    lastCard = el || null;
    caseStep = 0;
    casePlate = 0;
    const cols = card.querySelector('.proj-cols');
    const head = card.querySelector('.proj-head');
    const caseWrap = document.getElementById('caseWrap');
    const lockedWrap = document.getElementById('lockedWrap');
    const isCase = (i === 0);
    const isLocked = (i === 1 || i === 2);
    if (cols) cols.hidden = (isCase || isLocked);
    if (head) head.hidden = (isCase || isLocked);
    if (caseWrap) caseWrap.hidden = !isCase;
    if (lockedWrap) lockedWrap.hidden = !isLocked;
    modal.querySelector('#projTag').textContent = data.tag;
    modal.querySelector('#projTitle').textContent = data.title;
    modal.querySelector('#projRole').textContent = data.role;
    modal.querySelector('#projOverview').textContent = data.overview;
    modal.querySelector('#projHighs').innerHTML =
      data.highlights.map((h) => '<li>' + h + '</li>').join('');
    modal.querySelector('#projTools').innerHTML =
      data.tools.map((t) => '<li>' + t + '</li>').join('');
    thumbs.innerHTML = data.shots.map((s, i) =>
      '<button class="proj-thumb" data-i="' + i + '" aria-label="View image ' + (i + 1) + '"><img src="' + s.src + '" alt="" loading="lazy" draggable="false"></button>'
    ).join('');
    thumbs.querySelectorAll('.proj-thumb').forEach((t) => {
      t.addEventListener('click', () => { idx = +t.dataset.i; render(); });
    });
    if (isCase) renderCaseStep();
    else if (!isLocked) render();
    modal.classList.add('on');
    modal.setAttribute('aria-hidden', 'false');
    savedY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.overflow = 'hidden';
    if (closeBtn) {
      try { closeBtn.focus({ preventScroll: true }); }
      catch (e) { closeBtn.focus(); }
    }
  };

  const close = () => {
    modal.classList.remove('on');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Force the page back to the exact pre-popup position, then hand
    // focus to the clicked card without scrolling anywhere.
    window.scrollTo(0, savedY);
    if (lastCard && lastCard.focus) {
      try { lastCard.focus({ preventScroll: true }); }
      catch (e) { /* keep scroll as restored above */ }
    }
  };

  function renderCaseStep() {
    const wrap = document.getElementById('caseWrap');
    if (!wrap) return;
    const st = CASE_STEPS[caseStep];
    const plates = ['Plan Calibration', 'Landscape Area', 'Floor & Ceilings', 'Doors & Windows', 'Roof Geometry'];
    let ev = '';
    if (st.images) {
      const sh = st.images[casePlate];
      ev = '<div class="case-subtabs" role="tablist" aria-label="Take-off plates">' +
        st.images.map((im, k) => '<button class="case-subtab' + (k === casePlate ? ' is-active' : '') + '" data-plate="' + k + '" role="tab" aria-selected="' + (k === casePlate) + '">' + (im.tab || plates[k]) + '</button>').join('') +
        '</div>' +
        '<div class="case-view"><img src="' + sh.src + '" alt="' + sh.title + '" draggable="false" loading="lazy">' +
        '<button class="proj-expand case-zoom" aria-label="View plate full size">⤢</button></div>' +
        '<p class="case-shot-title">' + sh.title + '</p>' +
        '<p class="case-shot-cat">' + sh.cat + '</p>' +
        '<p class="case-shot-desc">' + sh.desc + '</p>';
    } else {
      const d = st.docs[0];
      ev = '<div class="case-doc"><p class="case-doc-tag">Protected document · ' + d.pages + ' page' + (d.pages > 1 ? 's' : '') + '</p>' +
        '<p class="case-doc-title">' + d.title + '</p>' +
        '<p class="case-doc-cat">' + d.cat + '</p>' +
        '<p class="case-doc-desc">' + d.desc + '</p>' +
        '<div class="case-pdf" data-pdf="' + d.src + '" data-title="' + d.title + '"><p class="pdf-loading">Loading document…</p></div></div>';
    }
    wrap.innerHTML =
      '<div class="case-head">' +
      '<h4>AU Timber Frame Architectural Estimating</h4>' +
      '<p class="case-role">Role: Construction Estimator</p></div>' +
      '<div class="case-meta"><span>6-step audit trail</span><span>5 take-off plates</span><span>5 audit PDFs</span><span>Zero variance</span></div>' +
      '<div class="case-steps" role="tablist" aria-label="Case steps">' +
      CASE_STEPS.map((s, k) => '<button class="case-step' + (k === caseStep ? ' is-active' : '') + '" data-step="' + k + '" role="tab" aria-selected="' + (k === caseStep) + '"><span class="case-step-no">0' + (k + 1) + '</span><span class="case-step-name">' + s.name + '</span><span class="case-step-tool">' + s.tool + '</span></button>').join('') +
      '</div>' +
      '<div class="case-body"><div class="case-narr">' +
      '<p class="proj-label">Case-file record ' + st.n + ' of 06 · ' + st.tool + '</p>' +
      '<h4>' + st.title + '</h4>' +
      '<p class="case-desc">' + st.desc + '</p>' +
      '<div class="case-trio">' +
      '<div><p class="proj-label">01 · Goal</p><p>' + st.goal + '</p></div>' +
      '<div><p class="proj-label">02 · Action</p><p>' + st.action + '</p></div>' +
      '<div><p class="proj-label">03 · Outcome</p><p>' + st.outcome + '</p></div>' +
      '</div>' +
      '<div class="case-spec"><div><span>Software</span><strong>' + st.tool + '</strong></div><div><span>Audit result</span><strong class="ok">Zero variance</strong></div></div>' +
      '</div><div class="case-ev">' + ev + '</div></div>';
    wrap.querySelectorAll('[data-step]').forEach((b) => {
      b.addEventListener('click', () => { caseStep = +b.dataset.step; casePlate = 0; renderCaseStep(); });
    });
    wrap.querySelectorAll('[data-plate]').forEach((b) => {
      b.addEventListener('click', () => { casePlate = +b.dataset.plate; renderCaseStep(); });
    });
    const goFull = () => {
      if (st.images) openEvidence(st.images.map((x) => ({ src: x.src, alt: x.title })), casePlate);
    };
    const zv = wrap.querySelector('.case-zoom');
    const zim = wrap.querySelector('.case-view img');
    if (zv) zv.addEventListener('click', (e) => { e.stopPropagation(); goFull(); });
    if (zim) zim.addEventListener('click', goFull);
  }

  function openEvidence(list, i) {
    evid = { list: list, i: i };
    zpaint();
    zoom.classList.add('on');
    zoom.setAttribute('aria-hidden', 'false');
  }

  // Protected PDF rendering — pages become plain canvas images
  // (no toolbar, no file buttons). Click a page to expand it.
  function renderPdf(box) {
    const url = box.getAttribute('data-pdf');
    const title = box.getAttribute('data-title') || 'Document';
    const fallback = () => {
      box.innerHTML = '<embed class="pdf-fallback" src="' + url + '" type="application/pdf" title="' + title + '">';
    };
    // Local file:// pages cannot fetch PDFs via script — use the native
    // viewer there; locked-down canvas rendering applies when hosted.
    if (location.protocol === 'file:' || typeof pdfjsLib === 'undefined') { fallback(); return; }
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.min.js';
    } catch (e) { /* ignore */ }
    pdfjsLib.getDocument(url).promise.then((pdf) => {
      box.innerHTML = '';
      const shots = [];
      const jobs = [];
      for (let p = 1; p <= pdf.numPages; p++) {
        jobs.push(pdf.getPage(p).then((page) => {
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.setAttribute('aria-label', title + ' — page ' + p);
          canvas.setAttribute('draggable', 'false');
          return page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise.then(() => {
            const holder = document.createElement('div');
            holder.className = 'pdf-page';
            holder.appendChild(canvas);
            const tag = document.createElement('p');
            tag.className = 'pdf-pageno';
            tag.textContent = 'Page ' + p + ' of ' + pdf.numPages;
            holder.appendChild(tag);
            box.appendChild(holder);
            shots[p - 1] = { src: canvas.toDataURL('image/png'), alt: title + ' — page ' + p };
            holder.addEventListener('click', () => {
              const ready = shots.filter(Boolean);
              const at = ready.indexOf(shots[p - 1]);
              if (at > -1) openEvidence(ready, at);
            });
          });
        }));
      }
      return Promise.all(jobs);
    }).catch(() => {
      fallback();
    });
  }

  document.querySelectorAll('.feat-card').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(+el.dataset.project || 0, el);
    });
  });

  document.getElementById('projPrev').addEventListener('click', () => {
    idx = (idx - 1 + data.shots.length) % data.shots.length;
    render();
  });
  document.getElementById('projNext').addEventListener('click', () => {
    idx = (idx + 1) % data.shots.length;
    render();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('on')) return;
    if (typeof zoom !== 'undefined' && zoom.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') document.getElementById('projPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('projNext').click();
  });

  // Full-size viewer — native-quality image, save-restricted.
  const zoom = document.getElementById('zoomModal');
  const zoomImg = document.getElementById('zoomImg');
  const zoomCount = document.getElementById('zoomCount');
  let evid = null;
  const zpaint = () => {
    const list = evid ? evid.list : data.shots;
    const at = evid ? evid.i : idx;
    const s = list[at];
    if (!s) return;
    zoomImg.src = s.src;
    zoomImg.alt = s.alt;
    zoomCount.textContent = (at + 1) + ' / ' + list.length;
  };
  const zopen = () => {
    if (!data) return;
    zpaint();
    zoom.classList.add('on');
    zoom.setAttribute('aria-hidden', 'false');
  };
  const zclose = () => {
    evid = null;
    zoom.classList.remove('on');
    zoom.setAttribute('aria-hidden', 'true');
  };
  const zstep = (d) => {
    if (evid) {
      evid.i = (evid.i + d + evid.list.length) % evid.list.length;
      zpaint();
      return;
    }
    idx = (idx + d + data.shots.length) % data.shots.length;
    render();
    zpaint();
  };
  document.getElementById('projExpand').addEventListener('click', (e) => {
    e.stopPropagation();
    zopen();
  });
  heroImg.addEventListener('click', zopen);
  document.getElementById('zoomClose').addEventListener('click', zclose);
  zoom.querySelector('[data-zoom-close]').addEventListener('click', zclose);
  document.getElementById('zoomPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    zstep(-1);
  });
  document.getElementById('zoomNext').addEventListener('click', (e) => {
    e.stopPropagation();
    zstep(1);
  });
  // Deter casual saving: no right-click menu, no drag-out on viewer images.
  zoom.addEventListener('contextmenu', (e) => e.preventDefault());
  modal.addEventListener('contextmenu', (e) => {
    if (e.target.closest('img,canvas')) e.preventDefault();
  });
  document.addEventListener('keydown', (e) => {
    if (!zoom.classList.contains('on')) return;
    if (e.key === 'Escape') zclose();
    if (e.key === 'ArrowLeft') zstep(-1);
    if (e.key === 'ArrowRight') zstep(1);
  });
})();

// Contact form — composes a pre-addressed email to engr.christcarl@gmail.com.
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const v = (id) => document.getElementById(id).value.trim();
    const subject = 'Project inquiry from ' + v('cfName');
    const body = [
      'Name: ' + v('cfName'),
      'Email: ' + v('cfEmail'),
      'Business / Company: ' + (v('cfCompany') || '—'),
      'Phone: ' + (v('cfPhone') || '—'),
      '',
      'Message / Project role:',
      v('cfMsg')
    ].join('\n');
    window.location.href = 'mailto:engr.christcarl@gmail.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
})();

// Live Philippine time for the availability card.
(() => {
  const el = document.getElementById('phTime');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 1000);
})();

// Refresh always returns to the landing top — popups never persist,
// a reloaded page never resumes mid-scroll, and About reloads to index.
(() => {
  try {
    history.scrollRestoration = 'manual';
    const navType = (performance.getEntriesByType('navigation')[0] || {}).type;
    if (navType === 'reload') {
      if (/about\.html?$/i.test(location.pathname)) {
        location.replace('index.html');
        return;
      }
      history.replaceState(null, '', location.pathname);
    }
    if (!location.hash) window.scrollTo(0, 0);
  } catch (e) { /* ignore */ }
})();
