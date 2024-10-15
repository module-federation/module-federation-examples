import { useLoaderData } from '@modern-js/runtime/router';
import type { ProfileData } from './page.data';

const Index = (): JSX.Element => {
  const data = (useLoaderData() as ProfileData) || {
    message: '404',
  };
  return <div>[ route-b ] data: {data.message}</div>;
};

export default Index;
