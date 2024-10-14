import './index.css';
import { useRouteLoaderData, Link } from '@modern-js/runtime/router';
import { withMFRouteId } from '@modern-js/runtime/mf';
import Image from '../components/Image';
import type { ProfileData } from './page.data';

const Index = (): JSX.Element => {
  console.log('routeId: ', withMFRouteId('page'));
  const data = (useRouteLoaderData(withMFRouteId('page')) as ProfileData) || {
    message: '404',
  };
  return (
    <div className="container-box">
      <Link to={'a'}> jump a</Link>
      provider {data.message}
      <Image />
    </div>
  );
};
export default Index;
