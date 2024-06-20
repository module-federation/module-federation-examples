/**
 * @typedef {object} Variant
 * @property {string} name - The variant name.
 * @property {string} image - The URL to the variant's image.
 * @property {string} sku - The stock keeping unit.
 * @property {string} color - The color code in hexadecimal.
 * @property {number} price - The price of the variant.
 */

/**
 * @typedef {object} Product
 * @property {string} name - The product name.
 * @property {string} id - The product ID.
 * @property {string} category - The product category.
 * @property {string[]} highlights - List of product highlights.
 * @property {Variant[]} variants - Available variants of the product.
 */

/**
 * @type {Product[]}
 */
export default [
  {
    name: "TerraFirma AutoCultivator T-300",
    id: "AU-01",
    category: "autonomous",
    highlightsa: [
      "Precision GPS mapping optimizes field coverage.",
      "Hybrid engine ensures eco-friendly extended operation.",
      "Fully autonomous with smart obstacle detection and terrain adaptation.",
    ],
    variants: [
      {
        name: "Silver",
        image: "/cdn/img/product/[size]/AU-01-SI.webp",
        sku: "AU-01-SI",
        color: "#C0C0C0", // Silver
        price: 1000,
      },
    ],
  },
  {
    name: "SmartFarm Titan",
    id: "AU-02",
    category: "autonomous",
    highlights: [
      "Advanced autopilot technology for precise farming operations.",
      "Eco-friendly solar-assisted power system for sustainable use.",
      "Intelligent AI for real-time field analysis and automated adjustments.",
    ],
    variants: [
      {
        name: "Sunset Copper",
        image: "/cdn/img/product/[size]/AU-02-OG.webp",
        sku: "AU-02-OG",
        color: "#dd5219", // Sunset Copper:
        price: 4100,
      },
      {
        name: "Cosmic Sapphire",
        image: "/cdn/img/product/[size]/AU-02-BL.webp",
        sku: "AU-02-BL",
        color: "#2A52BE", // Cosmic Sapphire:
        price: 4000,
      },
      {
        name: "Verdant Shadow",
        image: "/cdn/img/product/[size]/AU-02-GG.webp",
        sku: "AU-02-GG",
        color: "#005A04",
        price: 4000,
      },
    ],
  },
  {
    name: "FutureHarvest Navigator",
    id: "AU-03",
    category: "autonomous",
    highlights: [
      "Autonomous navigation with sub-inch accuracy",
      "Solar-enhanced hybrid powertrain for extended operation",
      "Real-time crop and soil health analytics",
    ],
    variants: [
      {
        name: "Turquoise Titan",
        image: "/cdn/img/product/[size]/AU-03-TQ.webp",
        sku: "AU-03-TQ",
        color: "#169fb8", // Turquoise Titan:
        price: 1600,
      },
      {
        name: "Majestic Violet",
        image: "/cdn/img/product/[size]/AU-03-PL.webp",
        sku: "AU-03-PL",
        color: "#9B5FC0", // Majestic Violet:
        price: 1700,
      },
      {
        name: "Scarlet Dynamo",
        image: "/cdn/img/product/[size]/AU-03-RD.webp",
        sku: "AU-03-RD",
        color: "#FF2400", // Scarlet Dynamo:
        price: 1900,
      },
      {
        name: "Sunbeam Yellow",
        image: "/cdn/img/product/[size]/AU-03-YE.webp",
        sku: "AU-03-YE",
        color: "#faad00", // Sunbeam Yellow:
        price: 1800,
      },
    ],
  },
  {
    name: "Sapphire Sunworker 460R",
    id: "AU-04",
    category: "autonomous",
    highlights: [
      "Next-generation autonomous guidance system for seamless operation",
      "High-capacity energy storage for all-day work without recharge",
      "Advanced analytics suite for precision soil and plant health management",
    ],
    variants: [
      {
        name: "Ruby Red",
        image: "/cdn/img/product/[size]/AU-04-RD.webp",
        sku: "AU-04-RD",
        color: "#9B111E", // Ruby Red:
        price: 8700,
      },
      {
        name: "Midnight Onyx",
        image: "/cdn/img/product/[size]/AU-04-BK.webp",
        sku: "AU-04-BK",
        color: "#353839", // Midnight Onyx:
        price: 8500,
      },
    ],
  },
  {
    name: "EcoGrow Crop Commander",
    id: "AU-05",
    category: "autonomous",
    highlights: [
      "Ultra-precise field navigation technology",
      "Dual-mode power system for maximum uptime",
      "On-the-go field data analysis for smart farming decisions",
    ],
    variants: [
      {
        name: "Zestful Horizon",
        image: "/cdn/img/product/[size]/AU-05-ZH.webp",
        sku: "AU-05-ZH",
        color: "#FFA07A", // Zestful Horizon:
        price: 3400,
      },
    ],
  },
  {
    name: "FarmFleet Sovereign",
    id: "AU-06",
    category: "autonomous",
    highlights: [
      "Robust all-terrain adaptability for diverse farm landscapes",
      "High-efficiency energy matrix for longer field endurance",
      "Integrated crop management system with advanced diagnostics",
    ],
    variants: [
      {
        name: "Canary Zenith",
        image: "/cdn/img/product/[size]/AU-06-CZ.webp",
        sku: "AU-06-CZ",
        color: "#FFD700", // Canary Zenith:
        price: 2200,
      },
      {
        name: "Minted Jade",
        color: "#628882", // Minted Jade:
        image: "/cdn/img/product/[size]/AU-06-MT.webp",
        sku: "AU-06-MT",
        price: 2100,
      },
    ],
  },
  {
    name: "Verde Voyager",
    id: "AU-07",
    category: "autonomous",
    highlights: [
      "Adaptive drive system intelligently navigates through diverse field conditions",
      "Clean energy operation with advanced solar battery technology",
      "High-resolution field scanners for precise agronomy insights",
    ],
    variants: [
      {
        name: "Glacial Mint",
        image: "/cdn/img/product/[size]/AU-07-MT.webp",
        sku: "AU-07-MT",
        color: "#AFDBD2", // Glacial Mint:
        price: 4000,
      },
      {
        name: "Sunbeam Yellow",
        image: "/cdn/img/product/[size]/AU-07-YE.webp",
        sku: "AU-07-YE",
        color: "#FFDA03", // Sunbeam Yellow:
        price: 5000,
      },
    ],
  },
  {
    name: "Field Pioneer",
    id: "AU-08",
    category: "autonomous",
    highlights: [
      "Automated field traversal with intelligent pathfinding algorithms",
      "Eco-friendly electric motors paired with high-capacity batteries",
      "Real-time environmental monitoring for optimal crop growth",
    ],
    variants: [
      {
        name: "Polar White",
        image: "/cdn/img/product/[size]/AU-08-WH.webp",
        sku: "AU-08-WH",
        color: "#E8E8E8", // Polar White:
        price: 4500,
      },
    ],
  },
  {
    name: "Heritage Workhorse",
    id: "CL-01",
    category: "classic",
    highlights: [
      "Proven reliability with a touch of modern reliability enhancements",
      "Robust construction equipped to withstand decades of labor",
      "User-friendly operation with traditional manual controls",
    ],
    variants: [
      {
        name: "Verdant Field",
        image: "/cdn/img/product/[size]/CL-01-GR.webp",
        sku: "CL-01-GR",
        color: "#6B8E23", // Verdant Field:
        price: 5700,
      },
      {
        name: "Stormy Sky",
        image: "/cdn/img/product/[size]/CL-01-GY.webp",
        sku: "CL-01-GY",
        color: "#708090", // Stormy Sky:
        price: 6200,
      },
    ],
  },
  {
    name: "Falcon Crest Farm",
    id: "CL-02",
    category: "classic",
    highlights: [
      "Rugged simplicity meets classic design",
      "Built-to-last machinery for reliable fieldwork",
      "Ease of control with straightforward mechanical systems",
    ],
    variants: [
      {
        name: "Cerulean Classic",
        image: "/cdn/img/product/[size]/CL-02-BL.webp",
        sku: "CL-02-BL",
        color: "#007BA7", // Cerulean Classic:
        price: 2600,
      },
    ],
  },
  {
    name: "Falcon Crest Work",
    id: "CL-03",
    category: "classic",
    highlights: [
      "Vintage engineering with a legacy of durability",
      "Powerful yet simple mechanics for easy operation and repair",
      "Classic aesthetics with a robust body, built to last",
    ],
    variants: [
      {
        name: "Meadow Green",
        image: "/cdn/img/product/[size]/CL-03-GR.webp",
        sku: "CL-03-GR",
        color: "#7CFC00", // Meadow Green:
        price: 2300,
      },
      {
        name: "Rustic Rose",
        image: "/cdn/img/product/[size]/CL-03-PI.webp",
        sku: "CL-03-PI",
        color: "#b50018", // Rustic Rose:
        price: 2300,
      },
      {
        name: "Harvest Gold",
        image: "/cdn/img/product/[size]/CL-03-YE.webp",
        sku: "CL-03-YE",
        color: "#DA9100", // Harvest Gold:
        price: 2300,
      },
    ],
  },
  {
    name: "Broadfield Majestic",
    id: "CL-04",
    category: "classic",
    highlights: [
      "Built with the robust heart of early industrial workhorses",
      "Simplified mechanics for unparalleled ease of use and maintenance",
      "A testament to early agricultural machinery with a dependable engine",
    ],
    variants: [
      {
        name: "Oceanic Blue",
        image: "/cdn/img/product/[size]/CL-04-BL.webp",
        sku: "CL-04-BL",
        color: "#0040a6", // Oceanic Blue:
        price: 2200,
      },
      {
        name: "Rustic Crimson",
        image: "/cdn/img/product/[size]/CL-04-RD.webp",
        sku: "CL-04-RD",
        color: "#7B3F00", // Rustic Crimson:
        price: 2200,
      },
      {
        name: "Aqua Green",
        image: "/cdn/img/product/[size]/CL-04-TQ.webp",
        sku: "CL-04-TQ",
        color: "#00b298", // Aqua Green:
        price: 2200,
      },
    ],
  },
  {
    name: "Countryside Commander",
    id: "CL-05",
    category: "classic",
    highlights: [
      "Reliable performance with time-tested engineering",
      "Rugged design for efficient operation across all types of terrain",
      "Classic operator comfort with modern ergonomic enhancements",
    ],
    variants: [
      {
        name: "Pacific Teal",
        image: "/cdn/img/product/[size]/CL-05-PT.webp",
        sku: "CL-05-PT",
        color: "#479da8", // Pacific Teal:
        price: 2700,
      },
      {
        name: "Barn Red",
        image: "/cdn/img/product/[size]/CL-05-RD.webp",
        sku: "CL-05-RD",
        color: "#7C0A02", // Barn Red:
        price: 2700,
      },
    ],
  },
  {
    name: "Danamark Steadfast",
    id: "CL-06",
    category: "classic",
    highlights: [
      "Engineered for the meticulous demands of Danish agriculture",
      "Sturdy chassis and reliable mechanics for longevity",
      "Utilitarian design with practical functionality and comfort",
    ],
    variants: [
      {
        name: "Emerald Forest",
        image: "/cdn/img/product/[size]/CL-06-MT.webp",
        sku: "CL-06-MT",
        color: "#46f5bb", // Emerald Forest:
        price: 2800,
      },
      {
        name: "Golden Wheat",
        image: "/cdn/img/product/[size]/CL-06-YE.webp",
        sku: "CL-06-YE",
        color: "#faaf3f", // Golden Wheat:
        price: 2800,
      },
    ],
  },
  {
    name: "Greenland Rover",
    id: "CL-07",
    category: "classic",
    highlights: [
      "Engineered to tackle the diverse European terrain with ease",
      "Sturdy and reliable mechanics known for their longevity",
      "Ergonomically designed for comfort during long working hours",
    ],
    variants: [
      {
        name: "Forest Fern",
        image: "/cdn/img/product/[size]/CL-07-GR.webp",
        sku: "CL-07-GR",
        color: "#2ea250", // Forest Fern:
        price: 2900,
      },
      {
        name: "Autumn Amber",
        image: "/cdn/img/product/[size]/CL-07-YE.webp",
        sku: "CL-07-YE",
        color: "#FFBF00", // Autumn Amber:
        price: 2900,
      },
    ],
  },
  {
    name: "Holland Hamster",
    id: "CL-08",
    category: "classic",
    highlights: [
      "Dutch craftsmanship for precision and quality",
      "Optimized for tulip fields and versatile European landscapes",
      "Ergonomic design with a focus on operator comfort and efficiency",
    ],
    variants: [
      {
        name: "Polder Green",
        image: "/cdn/img/product/[size]/CL-08-GR.webp",
        sku: "CL-08-GR",
        color: "#C2B280", // Polder Green:
        price: 7750,
      },
      {
        name: "Tulip Magenta",
        image: "/cdn/img/product/[size]/CL-08-PI.webp",
        sku: "CL-08-PI",
        color: "#D65282", // Tulip Magenta:
        price: 7900,
      },
    ],
  },
  {
    name: "TerraFirma Veneto",
    id: "CL-09",
    category: "classic",
    highlights: [
      "Elegant Italian design with sleek lines and a vibrant aesthetic",
      "Precision mechanics for vineyard and orchard maneuverability",
      "Comfort-focused design with a flair for the dramatic",
    ],
    variants: [
      {
        name: "Adriatic Blue",
        image: "/cdn/img/product/[size]/CL-09-BL.webp",
        sku: "CL-09-BL",
        color: "#2f6ea3", // Adriatic Blue:
        price: 2950,
      },
      {
        name: "Tuscan Green",
        image: "/cdn/img/product/[size]/CL-09-GR.webp",
        sku: "CL-09-GR",
        color: "#518b2b", // Tuscan Green:
        price: 2950,
      },
    ],
  },
  {
    name: "Global Gallant",
    id: "CL-10",
    category: "classic",
    highlights: [
      "Retro design with a nod to the golden era of farming",
      "Engine robustness that stands the test of time",
      "Functional simplicity for ease of operation in any region",
    ],
    variants: [
      {
        name: "Sahara Dawn",
        image: "/cdn/img/product/[size]/CL-10-SD.webp",
        sku: "CL-10-SD",
        color: "#b8a875", // Sahara Dawn:
        price: 2600,
      },
      {
        name: "Violet Vintage",
        image: "/cdn/img/product/[size]/CL-10-VI.webp",
        sku: "CL-10-VI",
        color: "#8A2BE2", // Violet Vintage:
        price: 2600,
      },
    ],
  },
  {
    name: "Scandinavia Sower",
    id: "CL-11",
    category: "classic",
    highlights: [
      "Authentic Swedish engineering for optimal cold-climate performance",
      "Sturdy build and mechanics for lifelong reliability",
      "Iconic design reflecting the simplicity and efficiency of Scandinavian style",
    ],
    variants: [
      {
        name: "Baltic Blue",
        image: "/cdn/img/product/[size]/CL-11-SK.webp",
        sku: "CL-11-SK",
        color: "#95c1f4", // Baltic Blue:
        price: 3100,
      },
      {
        name: "Nordic Gold",
        image: "/cdn/img/product/[size]/CL-11-YE.webp",
        sku: "CL-11-YE",
        color: "#FFD700", // Nordic Gold:
        price: 3100,
      },
    ],
  },
  {
    name: "Celerity Cruiser",
    id: "CL-12",
    category: "classic",
    highlights: [
      "A speedster in the classic tractor segment, unparalleled in quick task completion",
      "Sleek design with aerodynamic contours for reduced drag",
      "Enhanced gearbox for smooth acceleration and nimble handling",
    ],
    variants: [
      {
        name: "Velocity Blue",
        image: "/cdn/img/product/[size]/CL-12-BL.webp",
        sku: "CL-12-BL",
        color: "#1E90FF", // Velocity Blue:
        price: 3200,
      },
      {
        name: "Rally Red",
        image: "/cdn/img/product/[size]/CL-12-RD.webp",
        sku: "CL-12-RD",
        color: "#ED2939", // Rally Red:
        price: 3200,
      },
    ],
  },
  {
    name: "Rapid Racer",
    id: "CL-13",
    category: "classic",
    highlights: [
      "Streamlined design for faster field operations",
      "Optimized gear ratios for efficient power transmission",
      "Advanced air flow system for superior engine cooling",
    ],
    variants: [
      {
        name: "Speedway Blue",
        image: "/cdn/img/product/[size]/CL-13-BL.webp",
        sku: "CL-13-BL",
        color: "#2679a6", // Speedway Blue:
        price: 7500,
      },
      {
        name: "Raceway Red",
        image: "/cdn/img/product/[size]/CL-13-RD.webp",
        sku: "CL-13-RD",
        color: "#CF1020", // Raceway Red:
        price: 7500,
      },
    ],
  },
  {
    name: "Caribbean Cruiser",
    id: "CL-14",
    category: "classic",
    highlights: [
      "Robust construction for enduring performance",
      "Time-tested design with a proven track record",
      "Easy-to-service mechanics for long-term reliability",
    ],
    variants: [
      {
        name: "Emerald Grove",
        image: "/cdn/img/product/[size]/CL-14-GR.webp",
        sku: "CL-14-GR",
        color: "#57ae13", // Emerald Grove:
        price: 2300,
      },
      {
        name: "Ruby Fields",
        image: "/cdn/img/product/[size]/CL-14-RD.webp",
        sku: "CL-14-RD",
        color: "#cd2b1e", // Ruby Fields:
        price: 2300,
      },
    ],
  },
  {
    name: "Fieldmaster Classic",
    id: "CL-15",
    category: "classic",
    highlights: [
      "Timeless design with a focus on comfort and control",
      "Efficient fuel consumption with a powerful engine",
      "Versatile functionality for all types of agricultural work",
    ],
    variants: [
      {
        name: "Vintage Pink",
        image: "/cdn/img/product/[size]/CL-15-PI.webp",
        sku: "CL-15-PI",
        color: "#e1949e", // Vintage Pink:
        price: 6200,
      },
      {
        name: "Sahara Dust",
        image: "/cdn/img/product/[size]/CL-15-SD.webp",
        sku: "CL-15-SD",
        color: "#dec78c", // Sahara Dust:
        price: 6200,
      },
    ],
  },
];
