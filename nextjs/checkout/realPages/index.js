import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const Home = dynamic(import('home/home'), { ssr: false });
const Page = props => {
  const router = useRouter();
  useEffect(() => {
    if (props.needsPush) {
      // since this plugin only supports client side, we need next to re-push the route, causing get initial props to run again - this time its the federated one and not the ssr'd placeholder
      router.push(router.route);
    }
  }, []);
  if (props.needsPush) {
    return null;
  }
  return <Home {...props} />;
};
Page.getInitialProps = async ctx => {
  if (process.browser) {
    const page = (await import('home/home')).default;
    console.log('running get initial props client side');
    if (page.getInitialProps) {
      return page.getInitialProps(ctx);
    }
  }
  return {
    needsPush: true,
  };
};
export default Page;
