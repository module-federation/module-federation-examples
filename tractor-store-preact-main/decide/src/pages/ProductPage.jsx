import { h } from "preact";
import c from "./ProductPage.module.css";
import VariantOption from "../components/VariantOption";
import Fragment from "../components/Fragment";
import { src, srcset, navigate } from "../utils";

const ProductPage = ({ id, name, highlights, variants, variant }) => {
  return (
    <main class={c.root}>
      <div class={c.details}>
        <img
          class={c.productImage}
          src={src(variant.image, 400)}
          srcset={srcset(variant.image, [400, 800])}
          sizes="400px"
          width="400"
          height="400"
        />
        <div class={c.productInformation}>
          <h2 class={c.title}>{name}</h2>
          <ul class={c.highlights}>
            {highlights.map((highlight) => (
              <li>{highlight}</li>
            ))}
          </ul>
          <ul class={c.variants}>
            {variants.map((v) =>
              VariantOption({ id, ...v, selected: v.sku === variant.sku })
            )}
          </ul>
          <Fragment team="checkout" name="addtocart" sku={variant.sku} />
        </div>
      </div>
      <Fragment
        team="explore"
        name="recommendations"
        skus={variant.sku}
        onClick={navigate}
      />
    </main>
  );
};

ProductPage.api = "/product";

export default ProductPage;
