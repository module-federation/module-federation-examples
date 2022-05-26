import dynamic from 'next/dynamic';
const page = import('../../async-pages/p/[...slug]');
import { Suspense } from 'react';
const Component = dynamic(() => import('../../async-pages/p/[...slug]'), { suspense: true });
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
