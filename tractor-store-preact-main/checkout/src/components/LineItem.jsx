import { h } from "preact";
import { src, srcset, fmtprice } from "../utils.js";
import Button from "./Button.jsx";
import c from "./LineItem.module.css";

export default ({ sku, id, name, quantity, total, image, handleDelete }) => {
  const url = `/product/${id}?sku=${sku}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleDelete(sku);
  };

  return (
    <li class={c.root}>
      <a href={url} class={c.image}>
        <img
          src={src(image, 200)}
          srcset={srcset(image, [200, 400])}
          sizes="200px"
          alt={name}
          width="200"
          height="200"
        />
      </a>
      <div class={c.details}>
        <a href={url} class={c.name}>
          <strong>{name}</strong>
          <br />
          {sku}
        </a>

        <div class={c.quantity}>
          <span>{quantity}</span>

          <form
            action="/checkout/cart/remove"
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="sku" value={sku} />
            <Button
              variant="secondary"
              rounded
              type="submit"
              value="remove"
              size="small"
              title={`Remove ${name} from cart`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="20"
                width="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#000"
                  d="m40 5.172-16 16-16-16L5.171 8l16.001 16L5.171 40 8 42.828l16-16 16 16L42.828 40l-16-16 16-16L40 5.172Z"
                />
              </svg>
            </Button>
          </form>
        </div>
        <div class={c.price}>{fmtprice(total)}</div>
      </div>
    </li>
  );
};
