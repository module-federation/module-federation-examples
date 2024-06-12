import React from 'react';
import { Helmet } from '@modern-js/runtime/head';
import data from '../../../database/index';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Product from '../../../components/Product';
import Filter from '../../../components/Filter';
import Meta from '../../../components/Meta';
import { useParams } from '@modern-js/runtime/router';
import './CategoryPage.css';

/**
 * CategoryPage component.
 * @param {object} props - The properties of the CategoryPage component.
 * @param {string} props.category - The category key.
 * @param {HonoContext} props.c - The hone context.
 * @returns {JSX.Element} The CategoryPage component markup.
 */
const CategoryPage = ({ c }) => {
  const {category} = useParams();

  const cat = category && data.categories.find(c => c.key === category);

  const title = cat ? cat.name : 'All Machines';
  const products = cat
    ? cat.products
    : data.categories.flatMap(c => c.products);
  // sort products by price descending
  products.sort((a, b) => b.startPrice - a.startPrice);
  const filters = [
    { url: '/products', name: 'All', active: !cat },
    ...data.categories.map(c => ({
      url: `/products/${c.key}`,
      name: c.name,
      active: c.key === category,
    })),
  ];

  return (
    <>
      <Helmet>
        <title>Tractor Store</title>
        <Meta />
      </Helmet>
      <Header c={c} />
      <main className="e_CategoryPage">
        <h2>{title}</h2>
        <div className="e_CategoryPage__subline">
          <p>{products.length} products</p>
          <Filter filters={filters} />
        </div>
        <ul className="e_CategoryPage_list">
          {products.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
