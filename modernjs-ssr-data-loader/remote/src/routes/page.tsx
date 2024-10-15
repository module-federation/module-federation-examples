import './index.css';
import { useLoaderData, Link } from '@modern-js/runtime/router';
import Image from '../components/Image';
import type { ProfileData } from './page.data';

const Index = (): JSX.Element => {
  const data = (useLoaderData() as ProfileData) || {
    message: '404',
  };
  return (
    <div className="container-box">
      <Link to={'route-b'}> jump to remote self route (route-b)</Link>
      provider {data.message}
      <Image />
    </div>
  );
};
export default Index;
