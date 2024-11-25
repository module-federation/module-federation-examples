import { createRemoteSSRComponent } from '@modern-js/runtime/mf';
import './index.css';
import Content from '../components/Content';
const RemoteSSRComponent = createRemoteSSRComponent({
  loader: () => import('remote/Button'),
  loading: 'loading...',
  export: 'Button',
  fallback: ({ error }) => {
    if (error instanceof Error && error.message.includes('not exist')) {
      return <div>fallback - not existed id</div>;
    }
    return <div>fallback</div>;
  },
});

const Index = () => (
  <div className="container-box">
    <main>
      <div className="title">
        <span className="name">Entry One Page</span>
      </div>

      <div className="description">
        A demonstration of Modern.js Module Federation
      </div>

      <Content />

      <div className="remote-component-wrapper">
        <RemoteSSRComponent />
      </div>
    </main>
  </div>
);

export default Index;
