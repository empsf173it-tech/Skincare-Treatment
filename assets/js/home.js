/**
 * Lumiere — HOME PAGE
 * Interactive routine finder: pick a skin type and a concern, and the
 * catalogue is scored live to build a four-step routine.
 */

const ROUTINE_CATALOGUE = [
  {
    name: 'Purifying Gel Cleanser',
    step: 'Cleanse',
    category: 'cleansers',
    price: 24,
    hero: '0.5% Salicylic Acid',
    skin: ['oily', 'combination', 'normal'],
    concerns: ['acne', 'oiliness'],
    why: 'Clears the inside of pores without stripping your barrier.'
  },
  {
    name: 'Oat Milk Cleansing Balm',
    step: 'Cleanse',
    category: 'cleansers',
    price: 28,
    hero: '3% Colloidal Oat',
    skin: ['dry', 'sensitive', 'normal', 'combination'],
    concerns: ['dryness', 'redness'],
    why: 'Melts away SPF and makeup while leaving skin comfortable.'
  },
  {
    name: '10% Niacinamide Clarity Serum',
    step: 'Treat',
    category: 'serums',
    price: 32,
    hero: '10% Niacinamide',
    skin: ['oily', 'combination', 'normal'],
    concerns: ['acne', 'oiliness', 'pigmentation'],
    why: 'Balances oil and fades the marks breakouts leave behind.'
  },
  {
    name: 'Dewy Hydrating Serum',
    step: 'Treat',
    category: 'serums',
    price: 38,
    hero: '2% Hyaluronic Acid',
    skin: ['dry', 'normal', 'sensitive', 'combination'],
    concerns: ['dryness', 'dullness'],
    why: 'Layers of hydration that plump skin without any tackiness.'
  },
  {
    name: 'Weightless Gel Moisturizer',
    step: 'Moisturize',
    category: 'moisturizers',
    price: 36,
    hero: '4% Niacinamide',
    skin: ['oily', 'combination', 'normal'],
    concerns: ['oiliness', 'acne'],
    why: 'Oil-free hydration that sits invisibly under sunscreen.'
  },
  {
    name: 'Barrier Repair Cream',
    step: 'Moisturize',
    category: 'moisturizers',
    price: 42,
    hero: '3% Ceramide Complex',
    skin: ['dry', 'sensitive', 'combination'],
    concerns: ['dryness', 'redness', 'sensitivity'],
    why: 'Rebuilds the barrier so skin stops feeling tight and reactive.'
  },
  {
    name: 'Invisible Sunscreen SPF 50',
    step: 'Protect',
    category: 'sunscreens',
    price: 34,
    hero: '12% Zinc Oxide',
    skin: ['oily', 'dry', 'normal', 'combination', 'sensitive'],
    concerns: ['acne', 'oiliness', 'pigmentation'],
    why: 'The highest protection here, with no cast on any skin tone.'
  },
  {
    name: 'Mineral Glow Fluid SPF 30',
    step: 'Protect',
    category: 'sunscreens',
    price: 30,
    hero: '9% Zinc Oxide + Iron Oxides',
    skin: ['dry', 'normal', 'sensitive'],
    concerns: ['pigmentation', 'dullness', 'redness'],
    why: 'A sheer tint that screens visible light and evens tone.'
  }
];

const STEP_ORDER = ['Cleanse', 'Treat', 'Moisturize', 'Protect'];

const STEP_ICONS = {
  Cleanse: 'ph-drop',
  Treat: 'ph-sparkle',
  Moisturize: 'ph-cloud',
  Protect: 'ph-sun'
};

const CONCERN_LABELS = {
  acne: 'breakouts',
  dryness: 'dryness',
  oiliness: 'excess oil',
  pigmentation: 'dark spots',
  redness: 'redness',
  dullness: 'dullness'
};

document.addEventListener('DOMContentLoaded', () => {
  const finder = document.getElementById('routineFinder');
  if (!finder) return;

  const state = { skin: 'combination', concern: 'dryness' };

  finder.querySelectorAll('input[name="rfSkin"]').forEach(input => {
    input.addEventListener('change', () => {
      state.skin = input.value;
      buildRoutine(state);
    });
  });

  finder.querySelectorAll('input[name="rfConcern"]').forEach(input => {
    input.addEventListener('change', () => {
      state.concern = input.value;
      buildRoutine(state);
    });
  });

  buildRoutine(state);
});

// Score every product, then take the winner of each of the four steps.
function buildRoutine(state) {
  const picks = STEP_ORDER.map(step => {
    const candidates = ROUTINE_CATALOGUE
      .filter(p => p.step === step)
      .map(p => ({ product: p, score: scoreProduct(p, state) }))
      .sort((a, b) => b.score - a.score);

    return candidates[0].product;
  });

  renderRoutine(picks, state);
}

function scoreProduct(product, state) {
  let score = 0;
  if (product.skin.includes(state.skin)) score += 3;
  if (product.concerns.includes(state.concern)) score += 2;
  return score;
}

function renderRoutine(picks, state) {
  const grid = document.getElementById('routineResult');
  const total = document.getElementById('routineTotal');
  const summary = document.getElementById('routineSummary');
  const shopLink = document.getElementById('routineShopLink');
  if (!grid) return;

  grid.innerHTML = picks.map((p, i) => `
    <div class="routine-card" style="--card-delay: ${i * 60}ms">
      <div class="routine-card-head">
        <span class="routine-step-icon"><i class="ph ${STEP_ICONS[p.step]}"></i></span>
        <span class="routine-step-name">Step ${i + 1} — ${p.step}</span>
      </div>
      <h4>${p.name}</h4>
      <span class="badge">${p.hero}</span>
      <p>${p.why}</p>
      <div class="routine-card-foot">
        <span class="routine-price">$${p.price}</span>
        <a href="products.html?category=${p.category}" class="link-arrow">View</a>
      </div>
    </div>`).join('');

  // Re-trigger the entrance animation on every rebuild
  grid.querySelectorAll('.routine-card').forEach(card => {
    card.classList.remove('pop-in');
    void card.offsetWidth;
    card.classList.add('pop-in');
  });

  const sum = picks.reduce((acc, p) => acc + p.price, 0);
  if (total) total.textContent = `$${sum}`;

  if (summary) {
    summary.innerHTML = `A four-step routine for <strong>${state.skin}</strong> skin,
      focused on <strong>${CONCERN_LABELS[state.concern]}</strong>.`;
  }

  if (shopLink) {
    shopLink.href = `products.html?skin=${state.skin}`;
  }
}

