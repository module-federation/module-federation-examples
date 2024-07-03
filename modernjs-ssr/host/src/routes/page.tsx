import { createRemoteSSRComponent, loadRemote, registerRemotes } from '@modern-js/runtime/mf';
import type { DataLoaderRes } from './page.data'
import { useLoaderData } from '@modern-js/runtime/router';

import './index.css';

const RemoteSSRComponent = createRemoteSSRComponent({
  loader: () => import('remote/Image'),
  loading: 'loading...',
  export: 'default',
  fallback: ({ error }) => {
    if (error instanceof Error && error.message.includes('not exist')) {
      return <div>fallback - not existed id</div>;
    }
    return <div>fallback</div>;
  },
});

const Index = () => {
  const dataLoader = useLoaderData() as DataLoaderRes;
  registerRemotes(dataLoader.providerList);

  const DynamicRemoteSSRComponents = dataLoader.providerList.map(item => {
    const { id } = item;
    const Com = createRemoteSSRComponent({
      loader: () => loadRemote(id),
      loading: 'loading...',
      fallback: ({ error }) => {
        if (error instanceof Error && error.message.includes('not exist')) {
          return <div>fallback - not existed id</div>;
        }
        return <div>fallback</div>;
      },
    });
    return <Com />
  })
  return (
    <div className="container-box">
      <RemoteSSRComponent />
      {DynamicRemoteSSRComponents}
    </div>
  );
}

export default Index;
