import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
const Component = dynamic(() => import('checkout/checkout'), { suspense: true });
const Page = props => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);
Page.getInitialProps = async ctx => {
  const page = import('checkout/checkout');
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
