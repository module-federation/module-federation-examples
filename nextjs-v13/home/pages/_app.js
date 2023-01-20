// if(process.browser && (typeof __webpack_share_scopes__ === "undefined" || !__webpack_share_scopes__.default)) {
//   __webpack_init_sharing__('default');
// }
// require('next/link')
// require('next/router')
// require('next/head')
// require('next/script')
// require('next/dynamic')
// require('styled-jsx')
//
// require('next/dynamic')
// require('next/head')
// require('next/link')
// require('next/router')
// require('next/script')
// require('react')
if (process.env.NODE_ENV === 'development') {
  require('react/jsx-dev-runtime');
}
// console.log(__webpack_init_sharing__('default'))

console.log(__webpack_share_scopes__);
import dynamic from 'next/dynamic';
const page = import('../realPages/_app');
const AppPage = dynamic(() => import('../realPages/_app'));
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
