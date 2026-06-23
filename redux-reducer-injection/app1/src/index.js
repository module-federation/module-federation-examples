import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadRemote } from '@module-federation/enhanced/runtime';

import { store } from './store';

// This example intentionally demonstrates *dynamic* loading (previously done via
// manual container.init/get). With Enhanced, prefer the runtime API.
const RemoteApp = React.lazy(() =>
  loadRemote('app2/RemoteApp').then(mod => ({ default: mod?.default ?? mod })),
);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        Welcome to Host App
        <div>
          <Suspense fallback="Loading...">
            <RemoteApp store={store} />
          </Suspense>
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
