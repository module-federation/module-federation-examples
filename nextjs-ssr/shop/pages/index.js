import dynamic from 'next/dynamic';
const page = import('home/home');

const Page = dynamic(() => import('home/home'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
