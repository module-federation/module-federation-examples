import './index.css';
import { useLoaderData, Link,useFetcher } from '@modern-js/runtime/router';
import Image from '../components/Image';
import type { ProfileData } from './page.data';

const Index = (): JSX.Element => {
  const data = (useLoaderData() as ProfileData) || {
    message: '404',
  };

  const { submit } = useFetcher();
  const editUser = () => {
    const newUser = {
      name: 'Modern.js'
    }
    return submit(newUser, {
      method: 'post',
      encType: 'application/json',
    })
  }

  return (
    <div className="container-box">
      <Link to={'route-b'}> jump to remote self route (route-b)</Link>

      <button onClick={editUser}>update data loader data</button>
      provider {data.message}

      <Image />
    </div>
  );
};
export default Index;
