import { createRemoteSSRComponent } from '@modern-js/runtime/mf';
import {DynamicRemoteSSRComponents } from '../components/dynamic-remote'
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
  return (
    <div className="container-box">
      <RemoteSSRComponent />
      <DynamicRemoteSSRComponents />
    </div>
  );
}

export default Index;
