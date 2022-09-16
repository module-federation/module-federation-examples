import { createBrowserHistory, Update } from 'history';

import('./bootstrap').then(({ mount }) => {
  const localRoot = document.getElementById('app2-local');
  const browserHistory = createBrowserHistory();

  mount({
    mountPoint: localRoot!,
    historyStrategy: browserHistory,
  });
});
