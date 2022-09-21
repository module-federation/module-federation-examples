import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import './index.css';
import { Page1 } from './pages/Page1';
import { Page2 } from './pages/Page2';
import { HistoryStrategy } from './types';

interface AppProps {
  history: HistoryStrategy;
}

export const App = ({ history }: AppProps) => {
  useEffect(() => {
    const unlistenHistoryChanges = history.listen(({ location: { pathname } }) => {
      window.dispatchEvent(new CustomEvent('[app1] navigated', { detail: pathname }));
    });

    const shellNavigationHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const { pathname: currentPathname } = history.location;
      if (currentPathname === pathname) {
        return;
      }
      history.push(pathname);
    };

    window.addEventListener('[shell] navigated', shellNavigationHandler);

    return () => {
      window.removeEventListener('[shell] navigated', shellNavigationHandler);
      unlistenHistoryChanges();
    };
  }, [history]);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route index element={<Page1 />} />
        <Route path="page-1" element={<Page1 />} />
        <Route path="page-2" element={<Page2 />} />
      </Routes>
    </HistoryRouter>
  );
};
