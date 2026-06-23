import { getInstance } from '@module-federation/modern-js/runtime';
import { createLazyComponent } from '@module-federation/modern-js/react';
import { DynamicRemoteSSRComponents } from '../components/dynamic-remote';
import './index.css';

const instance = getInstance();

const RemoteSSRComponent = createLazyComponent({
  loader: () => import('remote/Image'),
  loading: <div>loading...</div>,
  export: 'default',
  instance: instance!,
  fallback: ({ error }: { error: Error }) => {
    if (error instanceof Error && error.message.includes('not exist')) {
      return <div>fallback - not existed id</div>;
    }
    return <div>fallback</div>;
  },
});

const Index = () => {
  return (
    <div className="container-box">
      <RemoteSSRComponent />
      <DynamicRemoteSSRComponents />
    </div>
  );
};

export default Index;
