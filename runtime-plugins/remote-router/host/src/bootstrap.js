import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

// App Main
import Home from 'features/Home';

// Router
const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
