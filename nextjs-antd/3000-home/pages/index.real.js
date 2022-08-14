import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// TODO: discuss with Zack that making all pages dynamic is not a good idea
//   Downsides
//     - such code looks ugly
//     - it enforces developers to create `realPages` with same structure of pages. In big apps, this become a huge problem.
//   How to solve it?
//     - just create a dynamic page as testRemoteHook.js & testRemoteHook.real.js when it really needed

const CheckoutTitle = dynamic(
  () => {
    return import('checkout/CheckoutTitle');
  },
  { ssr: false },
);

const WebpackSvgRemote = dynamic(() => import('shop/WebpackSvg'), { ssr: false });
const WebpackPngRemote = dynamic(() => import('shop/WebpackPng'), { ssr: false });

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <h1>This is SPA combined from 3 different nextjs applications.</h1>
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
      </div>

      <h2>Federation test cases</h2>
      <table>
        <thead>
          <tr>
            <td>Test case</td>
            <td>Expected</td>
            <td>Actual</td>
          </tr>
        </thead>
        <tbody>
          <tr>
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
            </td>
          </tr>
          <tr>
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
            </td>
          </tr>
          <tr>
            <td>Load federated component from checkout with old antd version</td>
            <td>[Button from antd@4.20.0]</td>
            <td>TODO:</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Home;
