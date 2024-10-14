import { useRouteLoaderData } from '@modern-js/runtime/router';
import type { ProfileData } from './page.data';
import { withMFRouteId } from '@modern-js/runtime/mf';

const Index = (): JSX.Element => {
  const data = (useRouteLoaderData(withMFRouteId('a/page')) as ProfileData) || {
    message: '404',
  };
  return <div>[ page/a] data: {data.message}</div>;
};

export default Index;
