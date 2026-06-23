import { Link } from '@modern-js/runtime/router';
import { src, srcset } from '../utils';
import Button from './Button';
import './LineItem.css';

/**
 * LineItem component.
 * @param {object} props - The line item.
 * @param {string} props.sku - The SKU of the product.
 * @param {string} props.id - The ID of the product.
 * @param {string} props.name - The name of the product.
 * @param {number} props.quantity - The quantity of the product.
 * @param {string} props.total - The total price of the product.
 * @param {string} props.image - The image URL of the product.
 * @returns {JSX.Element} The LineItem component markup.
 */
const LineItem = ({ sku, id, name, quantity, total, image }) => {
  const url = `/product/${id}?sku=${sku}`;

  return (
    <li className="c_LineItem">
      <Link to={url} className="c_LineItem__image">
        <img
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          sizes="200px"
          alt={name}
          width="200"
          height="200"
        />
      </Link>
      <div className="c_LineItem__details">
        <Link to={url} className="c_LineItem__name">
          <strong>{name}</strong>
          <br />
          {sku}
        </Link>

        <div className="c_LineItem__quantity">
          <span>{quantity}</span>

          <form action="/checkout/cart/remove" method="post">
            <input type="hidden" name="sku" value={sku} />
            <Button
              variant="secondary"
              rounded={true}
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
        <div className="c_LineItem__price">{total} Ø</div>
      </div>
    </li>
  );
};

export default LineItem;
