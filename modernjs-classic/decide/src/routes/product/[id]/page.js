import React from 'react';
import VariantOption from '../../../components/VariantOption';
// import Header from '../../explore/components/Header';
// import Footer from '../../explore/components/Footer';
// import AddToCart from '../../checkout/components/AddToCart';
// import Recommendations from '../../explore/components/Recommendations';
import { src, srcset } from '../../../utils';
import data from '../../../database/index';
import Meta from '../../../components/Meta';
import { Helmet } from '@modern-js/runtime/head';
import { useParams } from '@modern-js/runtime/router';

import './ProductPage.css';

const Recommendations = () => 'Recommendations';
const Header = () => 'Header';
const Footer = () => 'Footer';
const AddToCart = () => 'AddToCart';

/**
 * ProductPage component.
 * @param {object} props - The properties of the ProductPage component.
 * @param {string} props.id - The ID of the product.
 * @param {string} props.sku - The SKU of the selected variant.
 * @param {HonoContext} props.c - The hone object.
 * @returns {JSX.Element} The ProductPage component markup.
 */

const ProductPage = ({ c }) => {
  const { id, sku } = useParams();
  console.log(useParams());
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
        <link rel="stylesheet" href="/explore/static/styles.css" />
        <link rel="stylesheet" href="/decide/static/styles.css" />
        <link rel="stylesheet" href="/checkout/static/styles.css" />
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
      <script src="/explore/static/scripts.js" type="module"></script>
      <script src="/decide/static/scripts.js" type="module"></script>
      <script src="/checkout/static/scripts.js" type="module"></script>
      <script src="/cdn/js/helper.js" type="module"></script>
    </>
  );
};
export default ProductPage;
