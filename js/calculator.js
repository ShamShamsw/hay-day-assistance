/**
 * Hay Day Supply Chain Calculator
 *
 * Provides functions to recursively expand a list of desired products into
 * their raw material requirements and production-time estimates.
 */

/**
 * Recursively calculate all raw materials (leaves of the recipe tree) needed
 * to produce `qty` units of `itemId`, as well as the crafting-step totals.
 *
 * @param {string} itemId   - ID of the item to produce.
 * @param {number} qty      - Number of units required.
 * @param {Object} rawTotals    - Accumulator for raw material quantities  {id → qty}
 * @param {Object} craftTotals  - Accumulator for crafted-step quantities  {id → qty}
 */
function expandRecipe(itemId, qty, rawTotals, craftTotals) {
  const item = ITEMS[itemId];
  if (!item) return;

  if (item.ingredients.length === 0) {
    // Raw resource – just accumulate
    rawTotals[itemId] = (rawTotals[itemId] || 0) + qty;
  } else {
    // Crafted item – record the craft step and recurse into ingredients
    craftTotals[itemId] = (craftTotals[itemId] || 0) + qty;
    for (const ing of item.ingredients) {
      expandRecipe(ing.id, ing.qty * qty, rawTotals, craftTotals);
    }
  }
}

/**
 * Calculate the minimum time (in minutes) needed to produce all items in
 * `rawTotals` and `craftTotals`, assuming a single unit of each building /
 * field at a time (sequential production per resource type).
 *
 * Also returns a per-item time breakdown for display.
 *
 * @param {Object} rawTotals   - {itemId → qty} raw materials needed
 * @param {Object} craftTotals - {itemId → qty} crafted items needed
 * @param {Object} farmConfig  - {fieldCount, buildingCount} parallelism config
 * @returns {{ breakdown: Array, totalMin: number }}
 */
function calculateTime(rawTotals, craftTotals, farmConfig) {
  const { fieldCount = 1, buildingCount = 1 } = farmConfig;
  const breakdown = [];
  let totalMin = 0;

  // Raw materials – crops are planted in parallel up to fieldCount; animal
  // products come from individual animals so each type is independent (1 slot).
  // Both categories run in parallel with each other.
  for (const [id, qty] of Object.entries(rawTotals)) {
    const item = ITEMS[id];
    if (!item) continue;
    const parallelSlots = item.category === "crop" ? fieldCount : 1;
    const cycles = Math.ceil(qty / parallelSlots);
    const timeMin = cycles * item.timeMin;
    breakdown.push({
      id,
      name: item.name,
      icon: item.icon,
      building: item.building,
      qty,
      timeMin,
      type: "raw",
    });
    // All raw sources run in parallel; the slowest one is the bottleneck.
    totalMin = Math.max(totalMin, timeMin);
  }

  // Crafted items – production buildings run in parallel up to buildingCount
  for (const [id, qty] of Object.entries(craftTotals)) {
    const item = ITEMS[id];
    if (!item) continue;
    const cycles = Math.ceil(qty / buildingCount);
    const timeMin = cycles * item.timeMin;
    breakdown.push({
      id,
      name: item.name,
      icon: item.icon,
      building: item.building,
      qty,
      timeMin,
      type: "crafted",
    });
    totalMin += timeMin; // crafted steps are sequential (need ingredients first)
  }

  // Sort: raw first, then crafted
  breakdown.sort((a, b) => {
    if (a.type !== b.type) return a.type === "raw" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return { breakdown, totalMin };
}

/**
 * Main entry point.
 *
 * @param {Array<{id: string, qty: number}>} desiredProducts
 * @param {{ fieldCount: number, buildingCount: number }} farmConfig
 * @returns {{
 *   rawTotals: Object,
 *   craftTotals: Object,
 *   breakdown: Array,
 *   totalMin: number
 * }}
 */
function calculateSupplyChain(desiredProducts, farmConfig) {
  const rawTotals = {};
  const craftTotals = {};

  for (const { id, qty } of desiredProducts) {
    if (qty > 0) {
      expandRecipe(id, qty, rawTotals, craftTotals);
    }
  }

  const { breakdown, totalMin } = calculateTime(
    rawTotals,
    craftTotals,
    farmConfig
  );

  return { rawTotals, craftTotals, breakdown, totalMin };
}

/**
 * Format a duration in minutes into a human-readable string.
 * @param {number} minutes
 * @returns {string}
 */
function formatTime(minutes) {
  if (minutes === 0) return "0 min";
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  return parts.join(" ");
}
