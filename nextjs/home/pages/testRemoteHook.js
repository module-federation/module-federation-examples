import dynamic from 'next/dynamic';

const page = import('./testRemoteHook.real');
const Page = dynamic(() => import('./testRemoteHook.real'), { ssr: false });

Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};

export default Page;
