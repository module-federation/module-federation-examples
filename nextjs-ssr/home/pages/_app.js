import dynamic from 'next/dynamic';
const page = import('../async-pages/_app');
import React, { Suspense } from 'react';
const App = dynamic(() => import('../async-pages/_app'), { suspense: true });
const Page = props => (
  <Suspense>
    <App {...props} />
  </Suspense>
);
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
