import App from 'next/app';
import dynamic from 'next/dynamic';
const page = import('../realPages/_app');

const Page = dynamic(() => import('../realPages/_app'));
Page.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return { ...appProps, ...getInitialProps(ctx) };
  }
  return { ...appProps };
};
export default Page;
