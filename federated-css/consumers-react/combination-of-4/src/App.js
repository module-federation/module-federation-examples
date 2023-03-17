import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import Navigation from './Navigation';
import routes from './routes';

const App = () => (
    <HashRouter>
        <div>
            <Navigation />
            <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {routes.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                            exact={route.exact}
                        />
                    ))}
                </Routes>
            </React.Suspense>
        </div>
    </HashRouter>
);

export default App;
