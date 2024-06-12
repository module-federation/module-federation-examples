import { h } from "preact";
import { src, srcset, fmtprice } from "../utils.js";
import c from "./Product.module.css";

export default ({ name, url, image, startPrice }) => {
  return (
    <li class={c.product}>
      <a class={c.link} href={url} data-native>
        <img
          class={c.image}
          src={src(image, 200)}
          srcset={srcset(image, [200, 400, 800])}
          sizes="300px"
          width="200"
          height="200"
        />
        <span class={c.name}>{name}</span>
        <span class={c.price}>{fmtprice(startPrice)}</span>
      </a>
    </li>
  );
};
