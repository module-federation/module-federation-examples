import React from 'react';
import Meta from './Meta';

const Page = ({ content }) => {
  return (
    <html>
      <head>
        <title>Tractor Store</title>
        <link rel="stylesheet" href="/explore/static/styles.css" />
        <link rel="stylesheet" href="/decide/static/styles.css" />
        <link rel="stylesheet" href="/checkout/static/styles.css" />
        <Meta />
      </head>
      <body data-boundary="checkout-page">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <script src="/explore/static/scripts.js" type="module"></script>
        <script src="/decide/static/scripts.js" type="module"></script>
        <script src="/checkout/static/scripts.js" type="module"></script>
        <script src="/cdn/js/helper.js" type="module"></script>
      </body>
    </html>
  );
};

export default Page;
