import dynamic from 'next/dynamic';

const Page = dynamic(() => import('checkout/checkout'));
Page.getInitialProps = async ctx => {
  const page = import('checkout/checkout');
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
