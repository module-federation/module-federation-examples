import dynamic from 'next/dynamic';
const page = import('../realPages/[...slug]');

const Page = dynamic(() => page);
Page.getInitialProps = async ctx => {
  const getInitialProps = await page.default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
