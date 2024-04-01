import { HashRouter, Route, Switch } from 'react-router-dom';

import Navigation from 'app1/Navigation';
import React from 'react';
import localRoutes from './routes';
import remoteRoutes from 'app1/routes';

const routes = [...localRoutes, ...remoteRoutes];

const App = () => (
  <HashRouter>
    <div>
      <h1>App 2</h1>
      <Navigation />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </React.Suspense>
    </div>
  </HashRouter>
);

export default App;
