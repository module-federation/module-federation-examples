require('@module-federation/nextjs-mf/lib/include-defaults');
import App from 'next/app';
import dynamic from 'next/dynamic';
import 'antd/dist/antd.css';

const page = import('./_app.real');
const Page = dynamic(() => import('./_app.real'));
Page.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return { ...appProps, ...getInitialProps(ctx) };
  }
  return { ...appProps };
};
export default Page;
