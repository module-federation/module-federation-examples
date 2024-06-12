import { h } from "preact";
import { src, srcset } from "../utils.js";
import c from "./Recommendation.module.css";

export default ({ image, url, name }) => {
  return (
    <li class={c.recommendation}>
      <a class={c.link} href={url}>
        <img
          class={c.image}
          src={src(image, 200)}
          srcet={srcset(image, [200, 400])}
          sizes="200px"
          width="200"
          height="200"
        />
        <span class={c.name}>{name}</span>
      </a>
    </li>
  );
};
