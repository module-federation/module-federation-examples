import dynamic from 'next/dynamic';
const page = import('checkout/checkout');

const Page = dynamic(() => import('checkout/checkout'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
