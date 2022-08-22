import '@module-federation/nextjs-mf/lib/include-defaults';
import dynamic from 'next/dynamic';
import 'antd/dist/antd.css';

const page = import('./_app.real');
const AppPage = dynamic(() => import('./_app.real'));
const Page = props => {
  return <AppPage {...props} />;
};
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
};
export default Page;
