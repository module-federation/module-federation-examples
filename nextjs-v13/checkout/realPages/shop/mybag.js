import React from 'react';
import Head from 'next/head';

const MyBag = props => (
  <div>
    <Head>
      <title>My Bag</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>my bag page</h1>
      <h3 className="title">This is a federated page, consumed by localhost:3001</h3>
      <br />
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
MyBag.getInitialProps = async () => {
  const swapi = await fetch('https://swapi.dev/api/people/1').then(res => res.json());
  return swapi;
};
export default MyBag;
