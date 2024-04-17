import React, {useEffect, lazy, useState, Suspense} from 'react';
import {useRouter} from 'next/router';

// Define the Home component using lazy loading, only on the client side
const Home = process.browser ? lazy(() => import('home/home')) : () => <div>Loading...</div>;

const Page = props => {
  const router = useRouter();
  const [shouldRenderHome, setShouldRenderHome] = useState(false);

  useEffect(() => {
    if (props.needsPush) {
      router.push(router.route);
    }

    setShouldRenderHome(true);

  }, [props.needsPush]);

  if (!shouldRenderHome) {
    // Return a loading state or null while waiting for conditions to render Home
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading Home Component...</div>}>
      <Home {...props} />
    </Suspense>
  );
};

Page.getInitialProps = async ctx => {
  // Handle client-side specific logic
  if (process.browser) {
    const pageModule = await import('home/home');
    console.log('Running getInitialProps client side');

    // Check for a getInitialProps method in the dynamically loaded module
    if (pageModule.default && pageModule.default.getInitialProps) {
      return pageModule.default.getInitialProps(ctx);
    }

    // If no additional props need to be fetched, indicate no need to push the route again
    return {needsPush: false};
  }
  // Default return for server-side to trigger a route push on the client side for proper hydration
  return {needsPush: true};
};

export default Page;
