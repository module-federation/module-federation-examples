import { Link } from '@modern-js/runtime/router';
import { src, srcset, fmtprice } from '../utils';
import './Product.css';
/**
 * Product component.
 * @param {Object} props - The properties of the Product component.
 * @param {string} props.name - The name of the product.
 * @param {string} props.url - The URL of the product.
 * @param {string} props.image - The image URL of the product.
 * @param {number} props.startPrice - The starting price of the product.
 * @returns {JSX.Element} The Product component markup.
 */
const Product = ({ name, url, image, startPrice }) => {
  return (
    <li className="e_Product">
      <Link className="e_Product_link" to={url}>
        <img
          className="e_Product_image"
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400, 800])}
          sizes="300px"
          width="200"
          height="200"
          alt={name}
        />
        <span className="e_Product_name">{name}</span>
        <span className="e_Product_price">{fmtprice(startPrice)}</span>
      </Link>
    </li>
  );
};

export default Product;
