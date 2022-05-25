import dynamic from 'next/dynamic';
const page = import('../realPages/index');

const Page = dynamic(() => import('../realPages/index'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
