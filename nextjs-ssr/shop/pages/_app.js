require('@module-federation/nextjs-mf/lib/include-defaults');
import dynamic from 'next/dynamic';
const page = import('../async-pages/_app');

const Page = dynamic(() => import('../async-pages/_app'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
