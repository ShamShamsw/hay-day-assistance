/**
 * Hay Day Supply Chain Data
 *
 * Each entry in ITEMS describes either a raw resource (crop/animal product)
 * or a crafted product produced in a building.
 *
 * Fields:
 *   name       {string}  Display name
 *   id         {string}  Unique identifier (camelCase)
 *   category   {string}  "crop" | "animal" | "crafted"
 *   building   {string}  Where it is produced / grown
 *   timeMin    {number}  Minutes to produce ONE unit
 *   ingredients {Array<{id: string, qty: number}>}
 *               Empty for raw resources.
 *   icon       {string}  Emoji icon for display
 */

const ITEMS = {
  // ─── Raw Crops ────────────────────────────────────────────────────────────
  wheat: {
    name: "Wheat",
    id: "wheat",
    category: "crop",
    building: "Wheat Field",
    timeMin: 2,
    ingredients: [],
    icon: "🌾",
  },
  corn: {
    name: "Corn",
    id: "corn",
    category: "crop",
    building: "Corn Field",
    timeMin: 5,
    ingredients: [],
    icon: "🌽",
  },
  soybean: {
    name: "Soybean",
    id: "soybean",
    category: "crop",
    building: "Soybean Field",
    timeMin: 5,
    ingredients: [],
    icon: "🫘",
  },
  sugarcane: {
    name: "Sugarcane",
    id: "sugarcane",
    category: "crop",
    building: "Sugarcane Field",
    timeMin: 30,
    ingredients: [],
    icon: "🎋",
  },
  carrot: {
    name: "Carrot",
    id: "carrot",
    category: "crop",
    building: "Carrot Field",
    timeMin: 30,
    ingredients: [],
    icon: "🥕",
  },
  raspberry: {
    name: "Raspberry",
    id: "raspberry",
    category: "crop",
    building: "Raspberry Bush",
    timeMin: 30,
    ingredients: [],
    icon: "🍓",
  },
  blackberry: {
    name: "Blackberry",
    id: "blackberry",
    category: "crop",
    building: "Blackberry Bush",
    timeMin: 60,
    ingredients: [],
    icon: "🫐",
  },
  pumpkin: {
    name: "Pumpkin",
    id: "pumpkin",
    category: "crop",
    building: "Pumpkin Field",
    timeMin: 120,
    ingredients: [],
    icon: "🎃",
  },
  tomato: {
    name: "Tomato",
    id: "tomato",
    category: "crop",
    building: "Tomato Field",
    timeMin: 240,
    ingredients: [],
    icon: "🍅",
  },
  coffeeBeans: {
    name: "Coffee Beans",
    id: "coffeeBeans",
    category: "crop",
    building: "Coffee Plant",
    timeMin: 120,
    ingredients: [],
    icon: "☕",
  },
  // ─── Animal Products ──────────────────────────────────────────────────────
  milk: {
    name: "Milk",
    id: "milk",
    category: "animal",
    building: "Cow",
    timeMin: 5,
    ingredients: [],
    icon: "🥛",
  },
  egg: {
    name: "Egg",
    id: "egg",
    category: "animal",
    building: "Chicken",
    timeMin: 5,
    ingredients: [],
    icon: "🥚",
  },
  bacon: {
    name: "Bacon",
    id: "bacon",
    category: "animal",
    building: "Pig",
    timeMin: 20,
    ingredients: [],
    icon: "🥓",
  },
  wool: {
    name: "Wool",
    id: "wool",
    category: "animal",
    building: "Sheep",
    timeMin: 20,
    ingredients: [],
    icon: "🧶",
  },
  // ─── Crafted – Feed Mill ──────────────────────────────────────────────────
  wheatFeed: {
    name: "Wheat Feed",
    id: "wheatFeed",
    category: "crafted",
    building: "Feed Mill",
    timeMin: 5,
    ingredients: [{ id: "wheat", qty: 3 }],
    icon: "🌾",
  },
  cornFeed: {
    name: "Corn Feed",
    id: "cornFeed",
    category: "crafted",
    building: "Feed Mill",
    timeMin: 5,
    ingredients: [{ id: "corn", qty: 3 }],
    icon: "🌽",
  },
  soybeanFeed: {
    name: "Soybean Feed",
    id: "soybeanFeed",
    category: "crafted",
    building: "Feed Mill",
    timeMin: 5,
    ingredients: [{ id: "soybean", qty: 3 }],
    icon: "🫘",
  },
  // ─── Crafted – Sugar Mill ─────────────────────────────────────────────────
  sugar: {
    name: "Sugar",
    id: "sugar",
    category: "crafted",
    building: "Sugar Mill",
    timeMin: 20,
    ingredients: [{ id: "sugarcane", qty: 3 }],
    icon: "🍬",
  },
  // ─── Crafted – Dairy ─────────────────────────────────────────────────────
  cream: {
    name: "Cream",
    id: "cream",
    category: "crafted",
    building: "Dairy",
    timeMin: 10,
    ingredients: [{ id: "milk", qty: 2 }],
    icon: "🍦",
  },
  butter: {
    name: "Butter",
    id: "butter",
    category: "crafted",
    building: "Dairy",
    timeMin: 10,
    ingredients: [{ id: "cream", qty: 2 }],
    icon: "🧈",
  },
  cheese: {
    name: "Cheese",
    id: "cheese",
    category: "crafted",
    building: "Dairy",
    timeMin: 20,
    ingredients: [{ id: "milk", qty: 3 }],
    icon: "🧀",
  },
  // ─── Crafted – Bakery ─────────────────────────────────────────────────────
  bread: {
    name: "Bread",
    id: "bread",
    category: "crafted",
    building: "Bakery",
    timeMin: 5,
    ingredients: [{ id: "wheat", qty: 3 }],
    icon: "🍞",
  },
  cornBread: {
    name: "Corn Bread",
    id: "cornBread",
    category: "crafted",
    building: "Bakery",
    timeMin: 10,
    ingredients: [
      { id: "corn", qty: 2 },
      { id: "egg", qty: 1 },
    ],
    icon: "🫓",
  },
  cookie: {
    name: "Cookie",
    id: "cookie",
    category: "crafted",
    building: "Bakery",
    timeMin: 10,
    ingredients: [
      { id: "wheat", qty: 2 },
      { id: "sugar", qty: 1 },
      { id: "egg", qty: 1 },
    ],
    icon: "🍪",
  },
  cake: {
    name: "Cake",
    id: "cake",
    category: "crafted",
    building: "Bakery",
    timeMin: 15,
    ingredients: [
      { id: "wheat", qty: 3 },
      { id: "sugar", qty: 2 },
      { id: "butter", qty: 1 },
      { id: "egg", qty: 1 },
    ],
    icon: "🎂",
  },
  pancake: {
    name: "Pancake",
    id: "pancake",
    category: "crafted",
    building: "Bakery",
    timeMin: 15,
    ingredients: [
      { id: "wheat", qty: 1 },
      { id: "egg", qty: 2 },
      { id: "butter", qty: 1 },
      { id: "sugar", qty: 1 },
    ],
    icon: "🥞",
  },
  carrotCake: {
    name: "Carrot Cake",
    id: "carrotCake",
    category: "crafted",
    building: "Bakery",
    timeMin: 20,
    ingredients: [
      { id: "carrot", qty: 3 },
      { id: "sugar", qty: 2 },
      { id: "egg", qty: 1 },
    ],
    icon: "🥕",
  },
  // ─── Crafted – Jam Maker ─────────────────────────────────────────────────
  raspberryJam: {
    name: "Raspberry Jam",
    id: "raspberryJam",
    category: "crafted",
    building: "Jam Maker",
    timeMin: 20,
    ingredients: [
      { id: "raspberry", qty: 3 },
      { id: "sugar", qty: 1 },
    ],
    icon: "🍓",
  },
  blackberryJam: {
    name: "Blackberry Jam",
    id: "blackberryJam",
    category: "crafted",
    building: "Jam Maker",
    timeMin: 20,
    ingredients: [
      { id: "blackberry", qty: 3 },
      { id: "sugar", qty: 1 },
    ],
    icon: "🫐",
  },
  // ─── Crafted – BBQ Grill ─────────────────────────────────────────────────
  baconAndEggs: {
    name: "Bacon & Eggs",
    id: "baconAndEggs",
    category: "crafted",
    building: "BBQ Grill",
    timeMin: 15,
    ingredients: [
      { id: "bacon", qty: 2 },
      { id: "egg", qty: 2 },
    ],
    icon: "🍳",
  },
  // ─── Crafted – Juicer ─────────────────────────────────────────────────────
  carrotJuice: {
    name: "Carrot Juice",
    id: "carrotJuice",
    category: "crafted",
    building: "Juicer",
    timeMin: 15,
    ingredients: [{ id: "carrot", qty: 3 }],
    icon: "🥤",
  },
  tomatoJuice: {
    name: "Tomato Juice",
    id: "tomatoJuice",
    category: "crafted",
    building: "Juicer",
    timeMin: 15,
    ingredients: [{ id: "tomato", qty: 3 }],
    icon: "🍅",
  },
  // ─── Crafted – Coffee Kiosk ──────────────────────────────────────────────
  coffee: {
    name: "Coffee",
    id: "coffee",
    category: "crafted",
    building: "Coffee Kiosk",
    timeMin: 10,
    ingredients: [
      { id: "coffeeBeans", qty: 2 },
      { id: "milk", qty: 1 },
    ],
    icon: "☕",
  },
};

/**
 * Ordered list of product IDs available to select in the UI.
 * Only crafted products appear here (raw resources are intermediate).
 */
const CRAFTABLE_IDS = [
  "bread",
  "cornBread",
  "cookie",
  "cake",
  "pancake",
  "carrotCake",
  "sugar",
  "cream",
  "butter",
  "cheese",
  "wheatFeed",
  "cornFeed",
  "soybeanFeed",
  "raspberryJam",
  "blackberryJam",
  "baconAndEggs",
  "carrotJuice",
  "tomatoJuice",
  "coffee",
];
