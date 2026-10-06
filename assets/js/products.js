/**
 * Lumiere — PRODUCTS SCRIPTS
 * Catalogue rendering, category + skin-type filtering, search, sort,
 * ingredient transparency accordions, and the enquiry / consultation flow.
 */

// ==========================================
// CATALOGUE
// One shot per product. The grid is rendered from here, so the `img`
// values below are what actually appear on the page.
// ==========================================
const IMG = {
  purifyingGel:    'assets/images/product-cleanser-purifying-gel.jpg',
  oatBalm:         'assets/images/product-cleanser-oat-milk-balm.jpg',
  dewySerum:       'assets/images/product-serum-dewy-hydrating.jpg',
  niacinamide:     'assets/images/product-serum-niacinamide-clarity.jpg',
  barrierCream:    'assets/images/product-cream-barrier-repair.jpg',
  weightlessGel:   'assets/images/product-moisturizer-weightless-gel.jpg',
  invisibleSpf50:  'assets/images/product-sunscreen-invisible-spf50.jpg',
  mineralGlowSpf30:'assets/images/product-sunscreen-mineral-glow-fluid.jpg',
  // TODO: swap for a dedicated retinal shot — this is a spare serum photo
  retinalSerum:    'assets/images/product-dewy-hydrating-serum.jpg'
};

const PRODUCTS = [
  {
    id: 'dewy-hydrating-serum',
    name: 'Dewy Hydrating Serum',
    category: 'serums',
    categoryLabel: 'Serums',
    tagline: 'Multi-weight hyaluronic acid that plumps without the sticky finish.',
    size: '30 ml',
    price: 38,
    rating: 4.9,
    reviews: 412,
    badge: 'Bestseller',
    featured: 1,
    skin: ['dry', 'normal', 'sensitive', 'combination'],
    concerns: ['dryness', 'dullness'],
    img: IMG.dewySerum,
    tint: 'rose',
    focus: '50% 45%',
    actives: [
      { name: 'Hyaluronic Acid', pct: '2%', role: 'Pulls water into the upper layers of skin for lasting plumpness.' },
      { name: 'Panthenol (Pro-Vitamin B5)', pct: '1%', role: 'Soothes and supports barrier repair.' },
      { name: 'Glycerin', pct: '5%', role: 'A humectant that holds moisture in place.' }
    ],
    base: 'Aqua, Glycerin, Sodium Hyaluronate, Panthenol, Betaine, Sodium PCA, Allantoin, Citric Acid, Sodium Benzoate.',
    freeFrom: ['Fragrance', 'Essential oils', 'Alcohol denat.'],
    ph: '5.5',
    patch: 'Low irritancy — suitable for daily AM + PM use.'
  },
  {
    id: 'purifying-gel-cleanser',
    name: 'Purifying Gel Cleanser',
    category: 'cleansers',
    categoryLabel: 'Cleansers',
    tagline: 'A low-foam gel that lifts oil and SPF without stripping the barrier.',
    size: '150 ml',
    price: 24,
    rating: 4.7,
    reviews: 286,
    badge: '',
    featured: 3,
    skin: ['oily', 'combination', 'normal'],
    concerns: ['acne', 'oiliness'],
    img: IMG.purifyingGel,
    tint: 'sage',
    focus: '50% 40%',
    actives: [
      { name: 'Salicylic Acid', pct: '0.5%', role: 'Oil-soluble exfoliant that clears the inside of pores.' },
      { name: 'Green Tea Extract', pct: '2%', role: 'Antioxidant that calms post-cleanse tightness.' },
      { name: 'Coco-Glucoside', pct: '—', role: 'Sugar-derived surfactant, gentler than sulfates.' }
    ],
    base: 'Aqua, Coco-Glucoside, Glycerin, Sodium Cocoyl Isethionate, Salicylic Acid, Camellia Sinensis Leaf Extract, Panthenol, Sodium Hydroxide.',
    freeFrom: ['SLS / SLES', 'Fragrance', 'Drying alcohols'],
    ph: '5.0',
    patch: 'Contains BHA — introduce once daily if new to exfoliants.'
  },
  {
    id: 'barrier-repair-cream',
    name: 'Barrier Repair Cream',
    category: 'moisturizers',
    categoryLabel: 'Moisturizers',
    tagline: 'A cushioning ceramide cream for skin that feels tight, red or reactive.',
    size: '50 ml',
    price: 42,
    rating: 4.9,
    reviews: 531,
    badge: 'Editor’s pick',
    featured: 2,
    skin: ['dry', 'sensitive', 'combination'],
    concerns: ['dryness', 'sensitivity', 'redness'],
    img: IMG.barrierCream,
    tint: 'cream',
    focus: '50% 50%',
    actives: [
      { name: 'Ceramides NP, AP, EOP', pct: '3%', role: 'Rebuilds the lipid mortar between skin cells.' },
      { name: 'Centella Asiatica', pct: '2%', role: 'Calms visible redness and speeds recovery.' },
      { name: 'Cholesterol + Fatty Acids', pct: '1%', role: 'Completes the 3:1:1 barrier lipid ratio.' }
    ],
    base: 'Aqua, Caprylic/Capric Triglyceride, Glycerin, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Centella Asiatica Extract, Cholesterol, Squalane, Xanthan Gum.',
    freeFrom: ['Fragrance', 'Essential oils', 'Dyes'],
    ph: '5.5',
    patch: 'Formulated for reactive skin — fragrance-free throughout.'
  },
  {
    id: 'invisible-sunscreen-spf50',
    name: 'Invisible Sunscreen SPF 50',
    category: 'sunscreens',
    categoryLabel: 'Sunscreens',
    tagline: 'Weightless broad-spectrum protection with zero white cast on any tone.',
    size: '50 ml',
    price: 34,
    rating: 4.8,
    reviews: 698,
    badge: 'Daily essential',
    featured: 1,
    skin: ['oily', 'dry', 'normal', 'combination', 'sensitive'],
    concerns: ['pigmentation', 'sensitivity'],
    img: IMG.invisibleSpf50,
    tint: 'amber',
    focus: '50% 45%',
    actives: [
      { name: 'Zinc Oxide (non-nano)', pct: '12%', role: 'Physical filter covering UVA and UVB.' },
      { name: 'Tinosorb S', pct: '3%', role: 'Photostable filter that boosts UVA coverage.' },
      { name: 'Squalane', pct: '4%', role: 'Lightweight moisture that stops the chalky finish.' }
    ],
    base: 'Aqua, Zinc Oxide, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Squalane, Glycerin, Niacinamide, Tocopherol, Silica.',
    freeFrom: ['Oxybenzone', 'Octinoxate', 'Fragrance'],
    ph: '6.0',
    patch: 'Reef-conscious filter system. Reapply every two hours outdoors.'
  },
  {
    id: 'niacinamide-clarity-serum',
    name: '10% Niacinamide Clarity Serum',
    category: 'serums',
    categoryLabel: 'Serums',
    tagline: 'Evens tone, tightens the look of pores and calms oil through the day.',
    size: '30 ml',
    price: 32,
    rating: 4.6,
    reviews: 344,
    badge: '',
    featured: 4,
    skin: ['oily', 'combination', 'normal'],
    concerns: ['acne', 'oiliness', 'pigmentation'],
    img: IMG.niacinamide,
    tint: 'sage',
    focus: '40% 60%',
    actives: [
      { name: 'Niacinamide', pct: '10%', role: 'Regulates sebum and fades post-blemish marks.' },
      { name: 'Zinc PCA', pct: '1%', role: 'Reduces shine and supports clearer skin.' },
      { name: 'Liquorice Root Extract', pct: '0.5%', role: 'Brightens uneven patches gently.' }
    ],
    base: 'Aqua, Niacinamide, Glycerin, Zinc PCA, Glycyrrhiza Glabra Root Extract, Pentylene Glycol, Xanthan Gum, Citric Acid.',
    freeFrom: ['Fragrance', 'Silicones', 'Alcohol denat.'],
    ph: '5.7',
    patch: 'High-strength niacinamide — start every other night if sensitive.'
  },
  {
    id: 'oat-cleansing-balm',
    name: 'Oat Milk Cleansing Balm',
    category: 'cleansers',
    categoryLabel: 'Cleansers',
    tagline: 'Melts makeup and sunscreen into a milk that rinses clean, never greasy.',
    size: '100 ml',
    price: 28,
    rating: 4.8,
    reviews: 209,
    badge: 'New',
    featured: 5,
    skin: ['dry', 'sensitive', 'normal', 'combination'],
    concerns: ['dryness', 'sensitivity'],
    img: IMG.oatBalm,
    tint: 'cream',
    focus: '55% 55%',
    actives: [
      { name: 'Colloidal Oat', pct: '3%', role: 'Classic soother for itchy, tight skin.' },
      { name: 'Squalane', pct: '10%', role: 'Dissolves oil-based makeup and SPF.' },
      { name: 'Vitamin E', pct: '0.5%', role: 'Antioxidant that keeps the oils stable.' }
    ],
    base: 'Caprylic/Capric Triglyceride, Squalane, Avena Sativa Kernel Flour, Polyglyceryl-4 Laurate, Cetyl Alcohol, Tocopherol.',
    freeFrom: ['Mineral oil', 'Fragrance', 'Dyes'],
    ph: 'n/a (anhydrous)',
    patch: 'First-cleanse step. Follow with a gentle gel if you wear heavy SPF.'
  },
  {
    id: 'weightless-gel-moisturizer',
    name: 'Weightless Gel Moisturizer',
    category: 'moisturizers',
    categoryLabel: 'Moisturizers',
    tagline: 'Oil-free hydration that disappears into skin and sits well under SPF.',
    size: '50 ml',
    price: 36,
    rating: 4.5,
    reviews: 178,
    badge: '',
    featured: 6,
    skin: ['oily', 'combination', 'normal'],
    concerns: ['oiliness', 'dryness'],
    img: IMG.weightlessGel,
    tint: 'rose',
    focus: '45% 35%',
    actives: [
      { name: 'Sodium Hyaluronate', pct: '1%', role: 'Light, fast-absorbing hydration.' },
      { name: 'Niacinamide', pct: '4%', role: 'Balances oil and strengthens the barrier.' },
      { name: 'Allantoin', pct: '0.5%', role: 'Softens and soothes rough patches.' }
    ],
    base: 'Aqua, Glycerin, Niacinamide, Sodium Hyaluronate, Dimethicone-free Polymer Blend, Allantoin, Panthenol, Carbomer.',
    freeFrom: ['Oils', 'Fragrance', 'Comedogenic esters'],
    ph: '5.5',
    patch: 'Non-comedogenic tested. Layer over serum, under sunscreen.'
  },
  {
    id: 'mineral-glow-fluid-spf30',
    name: 'Mineral Glow Fluid SPF 30',
    category: 'sunscreens',
    categoryLabel: 'Sunscreens',
    tagline: 'A tinted mineral fluid that evens tone while it protects.',
    size: '40 ml',
    price: 30,
    rating: 4.6,
    reviews: 152,
    badge: '',
    featured: 7,
    skin: ['dry', 'normal', 'sensitive'],
    concerns: ['pigmentation', 'dullness', 'sensitivity'],
    img: IMG.mineralGlowSpf30,
    tint: 'amber',
    focus: '55% 60%',
    actives: [
      { name: 'Zinc Oxide (non-nano)', pct: '9%', role: 'Mineral-only broad-spectrum defence.' },
      { name: 'Iron Oxides', pct: '1%', role: 'Adds sheer tint and screens visible light.' },
      { name: 'Vitamin E', pct: '0.5%', role: 'Antioxidant support against daily exposure.' }
    ],
    base: 'Aqua, Zinc Oxide, Caprylic/Capric Triglyceride, Glycerin, Iron Oxides, Tocopherol, Silica, Sodium Citrate.',
    freeFrom: ['Chemical filters', 'Fragrance', 'Nano particles'],
    ph: '6.2',
    patch: 'Mineral-only — a good match for reactive or post-procedure skin.'
  },
  {
    id: 'retinal-renewal-night-serum',
    name: 'Retinal Renewal Night Serum',
    category: 'serums',
    categoryLabel: 'Serums',
    tagline: 'A low-dose retinal that softens fine lines and texture while you sleep.',
    size: '30 ml',
    price: 46,
    rating: 4.7,
    reviews: 238,
    badge: 'New',
    featured: 3,
    skin: ['normal', 'combination', 'oily', 'dry'],
    concerns: ['texture', 'pigmentation', 'acne'],
    img: IMG.retinalSerum,
    tint: 'rose',
    focus: '50% 42%',
    actives: [
      { name: 'Retinaldehyde', pct: '0.05%', role: 'Converts to retinoic acid faster than retinol, with less sting.' },
      { name: 'Bisabolol', pct: '1%', role: 'Chamomile-derived calmer that offsets retinoid dryness.' },
      { name: 'Squalane', pct: '8%', role: 'Cushions the actives so the barrier stays intact.' }
    ],
    base: 'Aqua, Squalane, Glycerin, Retinaldehyde, Bisabolol, Tocopherol, Panthenol, Hydroxyethylcellulose, Sodium Benzoate.',
    freeFrom: ['Fragrance', 'Essential oils', 'Alcohol denat.'],
    ph: '5.8',
    patch: 'PM only. Start twice weekly, and wear SPF every morning alongside it.'
  }
];

const SKIN_LABELS = {
  all: 'All skin types',
  oily: 'Oily',
  dry: 'Dry',
  combination: 'Combination',
  sensitive: 'Sensitive',
  normal: 'Normal'
};

// Current view state
const state = {
  category: 'all',
  skin: 'all',
  concern: 'all',
  sort: 'featured',
  search: ''
};

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('productsGrid')) return;
  bindControls();
  applyFilters();
  initEnquiryModal();
  initConsultForm();
  readQueryParams();
});

// ==========================================
// RENDERING
// ==========================================
function starMarkup(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let out = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) out += '<i class="ph-fill ph-star"></i>';
    else if (i === full && half) out += '<i class="ph-fill ph-star-half"></i>';
    else out += '<i class="ph ph-star"></i>';
  }
  return out;
}

function productCard(p, index) {
  const skinChips = p.skin
    .map(s => `<span class="skin-pill">${SKIN_LABELS[s] || s}</span>`)
    .join('');

  const actives = p.actives.map(a => `
        <li class="ingredient-row">
          <div class="ingredient-head">
            <span class="ingredient-name">${a.name}</span>
            <span class="ingredient-pct">${a.pct}</span>
          </div>
          <span class="ingredient-desc">${a.role}</span>
        </li>`).join('');

  const freeFrom = p.freeFrom
    .map(f => `<span class="free-chip"><i class="ph ph-prohibit"></i>${f}</span>`)
    .join('');

  const delay = `delay-${(index % 4) + 1}`;

  return `
  <article class="product-card animate-on-scroll ${delay}" data-id="${p.id}" data-category="${p.category}"
           data-skin-types="${p.skin.join(',')}" data-concerns="${p.concerns.join(',')}">
    <div class="product-img-wrapper tint-${p.tint}">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      <span class="product-size">${p.size}</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy" style="object-position:${p.focus}">
    </div>

    <span class="product-tag">${p.categoryLabel}</span>
    <h3 class="product-title">${p.name}</h3>

    <div class="product-rating">
      <span class="stars">${starMarkup(p.rating)}</span>
      <span>${p.rating.toFixed(1)} <span class="text-faint">(${p.reviews})</span></span>
    </div>

    <p class="product-desc">${p.tagline}</p>

    <div class="skin-pill-row" aria-label="Suits these skin types">${skinChips}</div>

    <div class="product-foot">
      <span class="product-price">$${p.price}</span>
      <button class="btn btn-primary btn-sm enquire-btn" data-product="${p.name}">Enquire</button>
    </div>

    <div class="ingredient-accordion">
      <button class="accordion-toggle" aria-expanded="false">
        <span><i class="ph ph-flask"></i> What's inside</span>
        <i class="ph ph-caret-down"></i>
      </button>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p class="ingredient-label">Key actives</p>
          <ul class="ingredient-list">${actives}</ul>

          <p class="ingredient-label">Free from</p>
          <div class="free-row">${freeFrom}</div>

          <div class="ingredient-meta">
            <span><i class="ph ph-drop-half"></i> pH ${p.ph}</span>
            <span><i class="ph ph-shield-check"></i> ${p.patch}</span>
          </div>

          <p class="ingredient-label">Full INCI</p>
          <p class="inci-text">${p.base}</p>
        </div>
      </div>
    </div>
  </article>`;
}

function render(list) {
  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');

  grid.innerHTML = list.map(productCard).join('');

  if (count) {
    count.textContent = list.length === 1
      ? '1 product'
      : `${list.length} products`;
  }

  if (empty) empty.style.display = list.length ? 'none' : 'block';

  initAccordions();
  revealCards();
}

// Cards are injected after the global observer has run, so reveal them here.
function revealCards() {
  const cards = document.querySelectorAll('#productsGrid .animate-on-scroll');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('fade-in-up'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(c => io.observe(c));
}

// ==========================================
// FILTER / SORT
// ==========================================
function applyFilters() {
  const term = state.search.trim().toLowerCase();

  let list = PRODUCTS.filter(p => {
    if (state.category !== 'all' && p.category !== state.category) return false;
    if (state.skin !== 'all' && !p.skin.includes(state.skin)) return false;
    if (state.concern !== 'all' && !p.concerns.includes(state.concern)) return false;

    if (term) {
      const haystack = [
        p.name, p.tagline, p.categoryLabel, p.base,
        p.actives.map(a => a.name).join(' ')
      ].join(' ').toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    default:           list.sort((a, b) => a.featured - b.featured);
  }

  render(list);
  updateActiveSummary();
}

function updateActiveSummary() {
  const el = document.getElementById('activeFilters');
  if (!el) return;

  const bits = [];
  if (state.category !== 'all') {
    const cat = PRODUCTS.find(p => p.category === state.category);
    bits.push({ key: 'category', label: cat ? cat.categoryLabel : state.category });
  }
  if (state.skin !== 'all') bits.push({ key: 'skin', label: SKIN_LABELS[state.skin] + ' skin' });
  if (state.concern !== 'all') bits.push({ key: 'concern', label: titleCase(state.concern) });
  if (state.search.trim()) bits.push({ key: 'search', label: `“${state.search.trim()}”` });

  el.innerHTML = bits.length
    ? bits.map(b => `<button class="active-filter" data-clear="${b.key}">${b.label} <i class="ph ph-x"></i></button>`).join('') +
      `<button class="active-filter clear-all" data-clear="all">Clear all</button>`
    : '';

  el.querySelectorAll('[data-clear]').forEach(btn => {
    btn.addEventListener('click', () => clearFilter(btn.dataset.clear));
  });
}

function clearFilter(key) {
  if (key === 'all') {
    state.category = 'all';
    state.skin = 'all';
    state.concern = 'all';
    state.search = '';
  } else if (key === 'search') {
    state.search = '';
  } else {
    state[key] = 'all';
  }
  syncControls();
  applyFilters();
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Push state back into the visible controls
function syncControls() {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === state.skin);
  });
  document.querySelectorAll('.category-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.category === state.category);
  });
  const concern = document.getElementById('concernSelect');
  if (concern) concern.value = state.concern;
  const sort = document.getElementById('sortSelect');
  if (sort) sort.value = state.sort;
  const search = document.getElementById('productSearch');
  if (search) search.value = state.search;
}

function bindControls() {
  // Skin-type chips
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.skin = btn.dataset.filter;
      syncControls();
      applyFilters();
    });
  });

  // Category tabs + category cards
  document.querySelectorAll('.category-tab, .category-jump').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      state.category = btn.dataset.category;
      syncControls();
      applyFilters();
      const grid = document.getElementById('catalogue');
      if (grid && btn.classList.contains('category-jump')) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const concern = document.getElementById('concernSelect');
  if (concern) concern.addEventListener('change', () => {
    state.concern = concern.value;
    applyFilters();
  });

  const sort = document.getElementById('sortSelect');
  if (sort) sort.addEventListener('change', () => {
    state.sort = sort.value;
    applyFilters();
  });

  const search = document.getElementById('productSearch');
  if (search) {
    let t;
    search.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        state.search = search.value;
        applyFilters();
      }, 200);
    });
  }

  const reset = document.getElementById('resetFilters');
  if (reset) reset.addEventListener('click', () => clearFilter('all'));
}

// Allow deep links like products.html?category=serums&skin=dry
function readQueryParams() {
  const params = new URLSearchParams(window.location.search);
  let touched = false;

  const cat = params.get('category');
  if (cat && PRODUCTS.some(p => p.category === cat)) { state.category = cat; touched = true; }

  const skin = params.get('skin');
  if (skin && SKIN_LABELS[skin]) { state.skin = skin; touched = true; }

  if (touched) {
    syncControls();
    applyFilters();
  }
}

// ==========================================
// INGREDIENT ACCORDIONS
// ==========================================
function initAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach(acc => {
    if (acc.dataset.bound) return;
    acc.dataset.bound = 'true';

    acc.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isOpen = this.classList.toggle('active');
      this.setAttribute('aria-expanded', String(isOpen));
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : null;
    });
  });
}

// ==========================================
// ENQUIRY MODAL
// ==========================================
function initEnquiryModal() {
  const overlay = document.getElementById('enquiryModal');
  if (!overlay) return;

  const closeEls = overlay.querySelectorAll('[data-close-modal]');
  const productField = document.getElementById('enquiryProduct');
  const note = document.getElementById('enquiryNote');
  const form = document.getElementById('enquiryForm');

  function open(productName) {
    if (productField) productField.value = productName || 'General enquiry';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const first = overlay.querySelector('input:not([readonly]), textarea');
    if (first) setTimeout(() => first.focus(), 260);
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (note) note.classList.remove('show');
    if (form) form.reset();
    form && form.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
    form && form.querySelectorAll('.form-control').forEach(c => c.classList.remove('form-error'));
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.enquire-btn');
    if (btn) open(btn.dataset.product);
  });

  closeEls.forEach(el => el.addEventListener('click', close));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(form)) return;
      if (note) {
        note.innerHTML = '<i class="ph ph-check-circle"></i> Thanks — our skin team will reply within one working day.';
        note.classList.add('show');
      }
      form.reset();
      if (productField) productField.value = productField.defaultValue;
      setTimeout(close, 2600);
    });
  }
}

// ==========================================
// CONSULTATION FORM
// ==========================================
function initConsultForm() {
  const form = document.getElementById('consultForm');
  if (!form) return;

  const note = document.getElementById('consultNote');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    if (note) {
      note.innerHTML = '<i class="ph ph-check-circle"></i> Your consultation request is in. We’ll email a routine within 48 hours.';
      note.classList.add('show');
      note.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.reset();
  });

  // Clear the error state as soon as the field looks right
  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', () => {
      if (field.classList.contains('form-error') && fieldIsValid(field)) {
        field.classList.remove('form-error');
        field.closest('.form-group').classList.remove('invalid');
      }
    });
  });
}

// ==========================================
// SHARED VALIDATION
// ==========================================
function fieldIsValid(field) {
  const value = field.value.trim();
  if (field.hasAttribute('required') && !value) return false;
  if (field.type === 'email' && value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }
  return true;
}

function validateForm(form) {
  let ok = true;

  form.querySelectorAll('.form-control[required], .form-control[type="email"]').forEach(field => {
    const group = field.closest('.form-group');
    if (fieldIsValid(field)) {
      field.classList.remove('form-error');
      group && group.classList.remove('invalid');
    } else {
      field.classList.add('form-error');
      group && group.classList.add('invalid');
      if (ok) field.focus();
      ok = false;
    }
  });

  return ok;
}

