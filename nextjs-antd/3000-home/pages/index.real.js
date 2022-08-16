import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Alert } from 'antd';

const CheckoutTitle = dynamic(() => import('checkout/CheckoutTitle'), { ssr: false });
const ButtonOldAnt = dynamic(() => import('checkout/ButtonOldAnt'), { ssr: false });
const WebpackSvgRemote = dynamic(() => import('shop/WebpackSvg'), { ssr: false });
const WebpackPngRemote = dynamic(() => import('shop/WebpackPng'), { ssr: false });

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 style={{ fontSize: '2em' }}>
        This is SPA combined from 3 different nextjs applications.
      </h1>
      <p className="description">
        They utilize omnidirectional routing and pages or components are able to be federated
        between applications.
      </p>
      <p>You may open any application by clicking on the links below:</p>
      <ul>
        <li>
          <a href="#reloadPage" onClick={() => (window.location = 'http://localhost:3000')}>
            localhost:3000
          </a>
          {' – '}
          <b>home</b>
        </li>
        <li>
          <a href="#reloadPage" onClick={() => (window.location = 'http://localhost:3001')}>
            localhost:3001
          </a>
          {' – '}
          <b>shop</b>
        </li>
        <li>
          <a href="#reloadPage" onClick={() => (window.location = 'http://localhost:3002')}>
            localhost:3002
          </a>
          {' – '}
          <b>checkout</b>
        </li>
      </ul>

      <h2 style={{ marginTop: '30px' }}>Federation test cases</h2>
      <table border="1" cellPadding={5}>
        <thead>
          <tr>
            <td></td>
            <td>Test case</td>
            <td>Expected</td>
            <td>Actual</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>✅</td>
            <td>
              Loading remote component (CheckoutTitle) from localhost:3002
              <br />
              <blockquote>dynamic(()=&gt;import('checkout/CheckoutTitle'))</blockquote>
            </td>
            <td>
              <h3>This title came from checkout !!!</h3>
            </td>
            <td>
              <CheckoutTitle />
            </td>
          </tr>
          <tr>
            <td>✅</td>
            <td>Load federated component from checkout with old antd version</td>
            <td>[Button from antd@4.20.0]</td>
            <td>
              <ButtonOldAnt />
            </td>
          </tr>
          <tr>
            <td>🐞</td>
            <td>
              Loading remote component with PNG image from localhost:3001
              <br />
              <blockquote>(check publicPath fix in image-loader)</blockquote>
            </td>
            <td>
              <img src="./webpack.png" />
            </td>
            <td>
              <WebpackPngRemote />
              <Alert message="Need to write a fix for image-loader" type="error" />
            </td>
          </tr>
          <tr>
            <td>🐞</td>
            <td>
              Loading remote component with SVG from localhost:3001
              <br />
              <blockquote>(check publicPath fix in url-loader)</blockquote>
            </td>
            <td>
              <img src="./webpack.svg" />
            </td>
            <td>
              <WebpackSvgRemote />
              <Alert message="Need to write a fix for url-loader" type="error" />
            </td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: '30px' }}>Other problems to fix:</h2>
      <ul>
        <li>🐞 Menu do not work correctly (home menu do not return back for / path)</li>
        <li>
          🐞 Incorrectly exposed modules in next.config.js (e.g. typo in path) do not throw an error
          in console
        </li>
        <li>
          🐞 <a href="http://localhost:3000/shop/products/A">localhost:3000/shop/products/A</a> do
          not obtain correct router path. So in this case page cannot receive `slug` value.
        </li>
      </ul>
    </>
  );
};

export default Home;
