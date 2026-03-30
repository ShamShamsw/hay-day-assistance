# 🌾 Hay Day Supply Chain Assistant

A lightweight, browser-based planning tool for the mobile game **Hay Day**.  
Given the products you want to craft and the quantities you need, it instantly tells you:

- every **raw material** (crops, animal products) you must gather
- every **production step** (bakery, dairy, etc.) required
- a realistic **time estimate** that accounts for your farm's field count and building count

No login, no install — just open `index.html` in any modern browser and start planning.

---

## ✨ Features

| Feature | Details |
|---|---|
| Product search | Filter the product grid by name or building |
| Multi-product planning | Select as many products as you want at once |
| Quantity control | Set any quantity (1–999) per product |
| Farm configuration | Enter your actual field and building counts for accurate time estimates |
| Parallel time model | Crops use all your fields in parallel; production buildings queue per type |
| Live results | Results update instantly as you change selections or quantities |
| Accessible UI | Full keyboard navigation and ARIA labels |

---

## 🚀 Getting Started

The tool is a static web page — no server or build step required.

1. Download or clone this repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. Follow the four on-screen steps (see the guide below).

---

## 📖 Step-by-Step Usage Guide

### Step 1 — Choose Products

The **Choose Products** panel displays every craftable item in the game.

1. **Browse** the product grid.  Cards show the item's icon, name, and the building that makes it.
2. **Search** by typing in the search box (e.g. `cake`, `bakery`, `jam`).  The grid filters in real time.
3. **Click a card** to select it.  Selected cards are highlighted.  Click again to deselect.
4. You can select **multiple products** at the same time.

> **Available products:** Bread, Corn Bread, Cookie, Cake, Pancake, Carrot Cake, Sugar, Cream, Butter, Cheese, Wheat Feed, Corn Feed, Soybean Feed, Raspberry Jam, Blackberry Jam, Bacon & Eggs, Carrot Juice, Tomato Juice, Coffee.

---

### Step 2 — Set Quantities

Every product you selected appears in the **Set Quantities** panel.

1. Use the **−** and **+** buttons to adjust the quantity, or type directly into the number field.
2. Valid quantities are **1–999**.
3. Click **✕** next to a product to remove it from the list.
4. Use **Clear All** to start over.

The results panel updates automatically after every change.

---

### Step 3 — Farm Configuration

Tell the tool about your farm so the time estimates reflect your actual capacity.

| Field | What to enter |
|---|---|
| 🌾 **Number of Fields / Plots** | How many crop fields you can plant simultaneously (e.g. `9` if you have 9 wheat fields) |
| 🏭 **Production Buildings per Type** | How many of each production building you operate (e.g. `2` if you have two bakeries) |

> **Tip:** More fields means crops finish faster because they are planted in parallel.  
> More buildings means crafted items queue up across those buildings, reducing wait time.

---

### Step 4 — Results

The **Results** panel is divided into two sections:

#### 🌱 Raw Materials
A table of every base ingredient you need to gather before production can start.

| Column | Meaning |
|---|---|
| Icon | Visual identifier |
| Item | Name of the crop or animal product |
| Source | Where it comes from (field, animal, bush) |
| Qty | Total units required |
| Time | Time to gather that many units given your field/animal count |

#### 🏭 Production Steps
A table of every crafting step required (intermediate and final products).

| Column | Meaning |
|---|---|
| Icon | Visual identifier |
| Item | Name of the crafted product |
| Source | Production building |
| Qty | Total units to craft |
| Time | Time to craft that many units given your building count |

#### ⏱ Estimated Total Time
- **Raw material time** is determined by the *slowest* single ingredient (all sources run in parallel).
- **Production time** is *added on top* because crafted items must wait for their ingredients.
- The grand total combines both phases.

---

## 🕹 Quick Example

**Goal:** craft 5 Cakes and 3 Cookies.

1. Click **Cake** and **Cookie** in the product grid — both cards highlight.
2. Set Cake quantity to **5** and Cookie quantity to **3**.
3. Enter **4** fields and **1** bakery in Farm Configuration.
4. Results show:
   - Raw Materials: Wheat, Sugar, Butter, Egg (with exact counts and times)
   - Production Steps: Cream → Butter → Sugar → Cake, Cookie (in dependency order)
   - Total estimated time based on your 4 fields and 1 bakery

---

## 🗂 Project Structure

```
hay-day-assistance/
├── index.html          # Single-page UI (4-step layout)
├── css/
│   └── styles.css      # All visual styling
└── js/
    ├── data.js         # Item definitions and recipes
    ├── calculator.js   # Supply chain expansion and time calculation logic
    └── app.js          # UI controller (selection, rendering, events)
```

---

## ⚠️ Disclaimer

This is a **fan-made** tool and is not affiliated with, endorsed by, or connected to Supercell.  
Hay Day and all related assets are trademarks of Supercell Oy.