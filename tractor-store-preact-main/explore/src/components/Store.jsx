import { h } from "preact";
import { src, srcset } from "../utils.js";

export default ({ name, image, street, city }) => {
  return (
    <li class="e_Store">
      <div class="e_Store_content">
        <img
          class="e_Store_image"
          src={src(image, 200)}
          srcset={srcset(image, [200, 400])}
          width="200"
          height="200"
        />
        <p class="e_Store_address">
          {name}
          <br />
          {street}
          <br />
          {city}
        </p>
      </div>
    </li>
  );
};
