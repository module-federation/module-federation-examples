import dynamic from 'next/dynamic';
const page = import('../../async-pages/p/[...slug]');

const Page = dynamic(() => import('../../async-pages/p/[...slug]'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
