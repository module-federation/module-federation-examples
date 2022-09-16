require('@module-federation/nextjs-mf/lib/include-defaults');

// console.log(__webpack_init_sharing__('default'));
// console.log(__webpack_share_scopes__);

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
