import data from "../database";

/**
 * Product Page
 */
export function productPageData({ id, sku }) {
  const {
    name,
    variants,
    highlights = [],
  } = data.products.find((p) => p.id === id);
  const variant = variants.find((v) => v.sku === sku) || variants[0];
  return { id, name, variant, variants, highlights };
}
