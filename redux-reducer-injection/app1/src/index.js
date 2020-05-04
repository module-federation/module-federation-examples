import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';

const dynamicFederation = (scope, module) => {
  window[scope].override(
    Object.assign(
      {
        react: () => {
          return Promise.resolve().then(() => {
            return () => require('react');
          });
        },
        'react-dom': () => {
          return Promise.resolve().then(() => {
            return () => require('react-dom');
          });
        },
      },
      __webpack_require__.O
    )
  );

  return window[scope].get(module).then((factory) => {
    const Module = factory();
    return Module;
  });
};

const RemoteApp = React.lazy(() => dynamicFederation('app2', 'RemoteApp'));

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
