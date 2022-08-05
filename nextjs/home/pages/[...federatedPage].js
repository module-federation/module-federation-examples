import dynamic from 'next/dynamic';
const page = import('../realPages/[...federatedPage]');

const Page = dynamic(() => import('../realPages/[...federatedPage]'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
