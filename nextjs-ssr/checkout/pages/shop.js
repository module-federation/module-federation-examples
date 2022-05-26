import dynamic from 'next/dynamic';
const page = import('shop/shop');
import { Suspense } from 'react';
const Component = dynamic(() => import('shop/shop'), { suspense: true });
const Page = props => (
  <Suspense>
    <Component {...props} />
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
