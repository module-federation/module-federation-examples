import React from 'react';
import { Helmet } from '@modern-js/runtime/head';
import data from '../../database/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Store from '../../components/Store';
import Meta from '../../components/Meta';
import './StoresPage.css';
/**
 * StoresPage component.
 * @param {object} props - The properties of the StoresPage component.
 * @param {string} props.category - The category key.
 * @param {HonoContext} props.c - The hone context.
 * @returns {JSX.Element} The StoresPage component markup.
 */
const StoresPage = ({ c }) => {
  return (
    <div data-boundary="explore-page">
      <Helmet>
        <title>Tractor Store</title>
        <link rel="stylesheet" href="/explore/static/styles.css" />
        <link rel="stylesheet" href="/decide/static/styles.css" />
        <link rel="stylesheet" href="/checkout/static/styles.css" />
        <Meta />
      </Helmet>
      <Header c={c} />
      <main className="e_StoresPage">
        <h2>Our Stores</h2>
        <p>
          Want to see our products in person? Visit one of our stores to see our
          products up close and talk to our experts. We have stores in the
          following locations:
        </p>
        <ul className="e_StoresPage_list">
          {data.stores.map((store, index) => (
            <Store key={store.id} {...store} />
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default StoresPage;
