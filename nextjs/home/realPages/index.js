import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button } from '@mantine/core';

let useCustomHook;
if (process.browser) {
  useCustomHook = require('shop/customHook').default;
}
const RemoteTitle = dynamic(
  () => {
    return import('checkout/title');
  },
  { ssr: false },
);

const Home = ({ loaded }) => {
  if (process.browser) {
    useCustomHook();
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <Button>Settings</Button>
        <RemoteTitle />
        <h1 className="title">
          Welcome to Next.js on Webpack 5! <code>home</code>
        </h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <div className="row">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js in the documentation.</p>
          </a>
          <a href="https://nextjs.org/learn" className="card">
            <h3>Next.js Learn &rarr;</h3>
            <p>Learn about Next.js by following an interactive tutorial!</p>
          </a>
          <a href="https://github.com/zeit/next.js/tree/master/examples" className="card">
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </div>
      </div>
    </div>
  );
};
//
Home.getInitialProps = async ctx => {
  return {};
};

export default Home;
