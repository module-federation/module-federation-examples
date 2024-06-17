import { Helmet } from '@modern-js/runtime/head';
import { useParams, useLocation } from '@modern-js/runtime/router';
import Header from 'explore/Header';
import Footer from 'explore/Footer';
import AddToCart from 'checkout/AddToCart';
import Recommendations from 'explore/Recommendations';
import VariantOption from '../../../components/VariantOption';
import { src, srcset } from '../../../utils';
import data from '../../../database/index';
import Meta from '../../../components/Meta';

import './ProductPage.css';

/**
 * ProductPage component.
 * @param {object} props - The properties of the ProductPage component.
 * @param {string} props.id - The ID of the product.
 * @param {string} props.sku - The SKU of the selected variant.
 * @param {HonoContext} props.c - The hone object.
 * @returns {JSX.Element} The ProductPage component markup.
 */

const ProductPage = ({ c }) => {
  const { id } = useParams();
  const sku = new URLSearchParams(useLocation().search).get('sku');
  const {
    name,
    variants,
    highlights = [],
  } = data.products.find(p => p.id === id);
  const variant = variants.find(v => v.sku === sku) || variants[0];

  return (
    <>
      <Helmet>
        <title>Tractor Store</title>
        <Meta />
      </Helmet>
      <Header c={c} />
      <main className="d_ProductPage">
        <div className="d_ProductPage__details">
          <img
            className="d_ProductPage__productImage"
            src={src(variant.image, 400)}
            srcSet={srcset(variant.image, [400, 800])}
            sizes="400px"
            width="400"
            height="400"
          />
          <div className="d_ProductPage__productInformation">
            <h2 className="d_ProductPage__title">{name}</h2>
            <ul className="d_ProductPage__highlights">
              {highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            <ul className="d_ProductPage__variants">
              {variants.map(v => (
                <VariantOption
                  key={v.sku}
                  {...v}
                  selected={v.sku === variant.sku}
                />
              ))}
            </ul>
            <AddToCart sku={variant.sku} />
          </div>
        </div>
        <Recommendations skus={[variant.sku]} />
      </main>
      <Footer />
    </>
  );
};
export default ProductPage;
