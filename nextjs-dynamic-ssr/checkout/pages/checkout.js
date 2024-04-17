import React, {lazy, Suspense} from 'react';
import Head from 'next/head';
const CC = lazy(() => import('../components/test'));
const Checkout = props => (
  <div>
    <Head>
      <title>checkout</title>
      <link rel="icon" href="/nextjs-ssr/checkout/public/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>checkout page</h1>
      <Suspense fallback={'loading'}>
      <CC />
      </Suspense>
      <h3 className="title">This is a federated page owned by localhost:3000</h3>
      <span>
        {' '}
        Data from federated <pre>getInitalProps</pre>
      </span>
      <br />
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  </div>
);
Checkout.getInitialProps = async () => {
  return {test: 123};
};
export default Checkout;
