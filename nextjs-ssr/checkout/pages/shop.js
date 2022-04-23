import dynamic from 'next/dynamic';
const page = import('shop/shop');

const Page = dynamic(() => import('shop/shop'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
