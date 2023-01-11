import dynamic from 'next/dynamic';
const page = import('../../realPages/p/[...slug]');

const Page = dynamic(() => import('../../realPages/p/[...slug]'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
