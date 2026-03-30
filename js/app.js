/**
 * Hay Day Supply Chain – UI Controller
 *
 * Manages the product selection list, farm-config inputs, and renders
 * the calculation results in the page.
 */

/* ── State ─────────────────────────────────────────────────────────────── */

/** @type {Array<{id: string, qty: number}>} */
let selectedProducts = [];

/* ── Initialise ─────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  buildProductGrid();
  bindEvents();
});

/* ── Build product selection grid ───────────────────────────────────────── */

function buildProductGrid() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  for (const id of CRAFTABLE_IDS) {
    const item = ITEMS[id];
    if (!item) continue;

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = id;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `Select ${item.name}`);
    card.innerHTML = `
      <span class="product-icon">${item.icon}</span>
      <span class="product-name">${item.name}</span>
      <span class="product-building">${item.building}</span>
    `;

    card.addEventListener("click", () => toggleProduct(id, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleProduct(id, card);
      }
    });

    grid.appendChild(card);
  }
}

/* ── Product toggle ─────────────────────────────────────────────────────── */

function toggleProduct(id, card) {
  const existing = selectedProducts.find((p) => p.id === id);
  if (existing) {
    selectedProducts = selectedProducts.filter((p) => p.id !== id);
    card.classList.remove("selected");
    card.setAttribute("aria-pressed", "false");
  } else {
    selectedProducts.push({ id, qty: 1 });
    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");
  }
  renderSelectedList();
  runCalculation();
}

/* ── Selected product list with quantity controls ───────────────────────── */

function renderSelectedList() {
  const container = document.getElementById("selected-list");
  container.innerHTML = "";

  if (selectedProducts.length === 0) {
    container.innerHTML =
      '<p class="empty-hint">Select products above to get started.</p>';
    return;
  }

  for (const product of selectedProducts) {
    const item = ITEMS[product.id];
    const row = document.createElement("div");
    row.className = "selected-row";
    row.innerHTML = `
      <span class="selected-icon">${item.icon}</span>
      <span class="selected-name">${item.name}</span>
      <div class="qty-control">
        <button class="qty-btn" data-id="${product.id}" data-action="dec" aria-label="Decrease quantity">−</button>
        <input
          class="qty-input"
          type="number"
          min="1"
          max="999"
          value="${product.qty}"
          data-id="${product.id}"
          aria-label="Quantity for ${item.name}"
        />
        <button class="qty-btn" data-id="${product.id}" data-action="inc" aria-label="Increase quantity">+</button>
      </div>
      <button class="remove-btn" data-id="${product.id}" aria-label="Remove ${item.name}">✕</button>
    `;
    container.appendChild(row);
  }

  // Bind quantity / remove events
  container.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const p = selectedProducts.find((x) => x.id === id);
      if (!p) return;
      if (action === "inc") p.qty = Math.min(999, p.qty + 1);
      if (action === "dec") p.qty = Math.max(1, p.qty - 1);
      renderSelectedList();
      runCalculation();
    });
  });

  container.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", () => {
      const id = input.dataset.id;
      const p = selectedProducts.find((x) => x.id === id);
      if (!p) return;
      const val = parseInt(input.value, 10);
      p.qty = isNaN(val) || val < 1 ? 1 : Math.min(999, val);
      input.value = p.qty;
      runCalculation();
    });
  });

  container.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      selectedProducts = selectedProducts.filter((p) => p.id !== id);
      const card = document.querySelector(`.product-card[data-id="${id}"]`);
      if (card) {
        card.classList.remove("selected");
        card.setAttribute("aria-pressed", "false");
      }
      renderSelectedList();
      runCalculation();
    });
  });
}

/* ── Farm config ────────────────────────────────────────────────────────── */

function getFarmConfig() {
  const fieldCount =
    parseInt(document.getElementById("field-count").value, 10) || 1;
  const buildingCount =
    parseInt(document.getElementById("building-count").value, 10) || 1;
  return { fieldCount: Math.max(1, fieldCount), buildingCount: Math.max(1, buildingCount) };
}

/* ── Bind global events ─────────────────────────────────────────────────── */

function bindEvents() {
  document
    .getElementById("field-count")
    .addEventListener("input", runCalculation);
  document
    .getElementById("building-count")
    .addEventListener("input", runCalculation);

  document.getElementById("clear-btn").addEventListener("click", () => {
    selectedProducts = [];
    document.querySelectorAll(".product-card.selected").forEach((c) => {
      c.classList.remove("selected");
      c.setAttribute("aria-pressed", "false");
    });
    renderSelectedList();
    runCalculation();
  });

  // Search / filter
  document.getElementById("search-input").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach((card) => {
      const id = card.dataset.id;
      const item = ITEMS[id];
      const match =
        item.name.toLowerCase().includes(q) ||
        item.building.toLowerCase().includes(q);
      card.style.display = match ? "" : "none";
    });
  });

  // Initial render
  renderSelectedList();
  runCalculation();
}

/* ── Run calculation & render results ───────────────────────────────────── */

function runCalculation() {
  const resultsSection = document.getElementById("results-section");

  if (selectedProducts.length === 0) {
    resultsSection.innerHTML =
      '<p class="empty-hint">No products selected yet. Pick something above!</p>';
    return;
  }

  const farmConfig = getFarmConfig();
  const { breakdown, totalMin } = calculateSupplyChain(
    selectedProducts,
    farmConfig
  );

  const rawItems = breakdown.filter((b) => b.type === "raw");
  const craftItems = breakdown.filter((b) => b.type === "crafted");

  resultsSection.innerHTML = `
    <div class="results-grid">
      ${renderSection("🌱 Raw Materials", rawItems)}
      ${renderSection("🏭 Production Steps", craftItems)}
    </div>
    <div class="total-time-box">
      <span class="total-label">⏱ Estimated Total Time</span>
      <span class="total-value">${formatTime(totalMin)}</span>
    </div>
    <p class="time-note">
      * Crops are planted across your ${farmConfig.fieldCount} field(s) (in parallel); animal products each use 1 slot.
      All raw sources run in parallel. Production steps are queued per building (${farmConfig.buildingCount} building(s)).
    </p>
  `;
}

function renderSection(title, items) {
  if (items.length === 0) return "";

  const rows = items
    .map(
      (item) => `
    <tr>
      <td class="cell-icon">${item.icon}</td>
      <td class="cell-name">${item.name}</td>
      <td class="cell-building">${item.building}</td>
      <td class="cell-qty">${item.qty}</td>
      <td class="cell-time">${formatTime(item.timeMin)}</td>
    </tr>`
    )
    .join("");

  return `
    <div class="results-section">
      <h3 class="section-title">${title}</h3>
      <table class="results-table">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Source</th>
            <th>Qty</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}
