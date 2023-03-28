import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const productLinks = [
  { href: '/p/1', label: 'Product 1' },
  { href: '/p/2', label: 'Product 2' },
  { href: '/p/3', label: 'Product 3' },
].map(link => {
  link.key = `product-link-${link.href}-${link.label}`;
  return link;
});

const Shop = props => (
  <div>
    <Head>
      <title>Shop</title>
      <link rel="icon" href="/nextjs-ssr/shop/public/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>Shop Page</h1>
      <h3 className="title">This is a federated page owned by localhost:3002</h3>
      <ul>
        {productLinks.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>

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
  const swapi = await fetch('https://jsonplaceholder.typicode.com/todos/2').then(res => res.json());
  return swapi;
};
export default Shop;
