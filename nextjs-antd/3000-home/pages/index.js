import dynamic from 'next/dynamic';
const page = import('./index.real');

const Page = dynamic(() => import('./index.real'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
