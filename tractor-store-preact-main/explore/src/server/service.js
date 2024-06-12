import data from "../database";

/**
 * Recommendations
 */

const recos = data.recommendations;

function averageColor(colors) {
  const total = colors.reduce(
    (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
    [0, 0, 0]
  );
  return total.map((c) => Math.round(c / colors.length));
}

function skusToColors(skus) {
  return skus.filter((sku) => recos[sku]).map((sku) => recos[sku].rgb);
}

function colorDistance(rgb1, rgb2) {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  );
}

function recosForSkus(skus = [], length = 4) {
  const targetRgb = averageColor(skusToColors(skus));
  let distances = [];

  for (let sku in recos) {
    if (!skus.includes(sku)) {
      const distance = colorDistance(targetRgb, recos[sku].rgb);
      distances.push({ sku, distance });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, length).map((d) => recos[d.sku]);
}

/**
 * Recommendations Fragment
 */
export function recommendationsFragmentData(skusString) {
  return {
    recommendations: recosForSkus(skusString.split(",")),
  };
}

/**
 * Category Page
 */
function categoryFilter(cat, filter) {
  return [
    { url: "/products", name: "All", active: !cat },
    ...data.categories.map((c) => ({
      url: `/products/${c.key}`,
      name: c.name,
      active: c.key === filter,
    })),
  ];
}

function categoryTitle(cat) {
  return cat ? cat.name : "All Machines";
}

function categoryProducs(cat) {
  const products = cat
    ? cat.products
    : data.categories.flatMap((c) => c.products);
  // sort products by price descending
  products.sort((a, b) => b.startPrice - a.startPrice);
  return products;
}

export function categoryPageData(filter) {
  const category = filter
    ? data.categories.find((c) => c.key === filter)
    : null;
  return {
    title: categoryTitle(category),
    products: categoryProducs(category),
    filters: categoryFilter(category, filter),
  };
}

/**
 * Home Page
 */
export function homePageData() {
  return {
    teaser: data.teaser,
  };
}

/**
 * Stores Page
 */
export function storesPageData() {
  return {
    stores: data.stores,
  };
}
