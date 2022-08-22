import React from 'react';
import Head from 'next/head';
import WebpackPng from '../../components/WebpackPng';
import WebpackSvg from '../../components/WebpackSvg';

const Shop = () => (
  <div>
    <Head>
      <title>Shop</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>Shop Page</h1>
      <h3 className="title">This is a federated page owned by localhost:3001</h3>
      <p className="description">
        This application manually exposes <code>page-map</code> and its modules (see next.config.js
        file).
        <br />
        <br />
        <WebpackPng />
      </p>
    </div>
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 20px;
      }
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
);

Shop.getInitialProps = async () => {
  const swapi = await fetch('https://swapi.dev/api/people/1').then(res => res.json());
  return swapi;
};

export default Shop;
