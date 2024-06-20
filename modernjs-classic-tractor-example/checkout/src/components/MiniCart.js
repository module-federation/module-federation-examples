import { readFromCookie } from '../state';
import Button from './Button';
import './MiniCart.css';
/**
 * MiniCart component.
 * @param {object} props - The properties of the MiniCart component.
 * @param {HonoContext} props.c - The hono context.
 * @returns {JSX.Element} The MiniCart component markup.
 */
const MiniCart = ({ c }) => {
  const lineItems = readFromCookie(c);
  const quantity = lineItems.reduce((t, { quantity }) => t + quantity, 0);

  return (
    <div className="c_MiniCart" data-boundary="checkout-minicart">
      <Button
        variant="secondary"
        rounded={true}
        href="/checkout/cart"
        className="c_MiniCart__button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <g clipPath="url(#a)">
            <path
              fill="#000"
              d="M2.75 27.5c0 1.5125 1.2375 2.75 2.75 2.75h22c1.5125 0 2.75-1.2375 2.75-2.75V9.625h-6.3188c-.649-3.5145-3.7311-6.1875-7.4312-6.1875-3.7001 0-6.78219 2.673-7.43119 6.1875H2.75V27.5ZM16.5 4.8125c2.9391 0 5.4003 2.06113 6.028 4.8125H10.472c.6277-2.75137 3.0889-4.8125 6.028-4.8125ZM8.9375 11v4.125h1.375V11h12.375v4.125h1.375V11h4.8125v16.5c0 .7583-.6167 1.375-1.375 1.375h-22c-.75831 0-1.375-.6167-1.375-1.375V11h4.8125Z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h33v33H0z" />
            </clipPath>
          </defs>
        </svg>
        <div className="c_MiniCart__quantity">{quantity || ''}</div>
      </Button>
    </div>
  );
};

export default MiniCart;
