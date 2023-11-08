import React from 'react';
import { Helmet } from 'react-helmet';
import type { ContentProps } from 'remote1/Content';

const Content = React.lazy(
  () => import('remote1/Content') as Promise<{ default: React.FC<ContentProps> }>,
);

const App = () => {
  const [state, setState] = React.useState<string>('');

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #fc451e',
      }}
    >
      <Helmet>
        <title>SSR MF Example</title>
      </Helmet>

      <div style={{ padding: '1rem' }}>
        <h1>Module Federation Example: Server Side Rendering</h1>

        <h2>This is the shell application.</h2>

        <p>You can try to disable JavaScript and reload the page.</p>
      </div>

      <div style={{ padding: '1rem' }}>
        <h3>Type something into this input</h3>
        <input
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="Luke, I am your father..."
        />
      </div>

      <React.Suspense fallback={<h1>Loading....</h1>}>
        <Content content={state} />
      </React.Suspense>
    </div>
  );
};

export default App;
