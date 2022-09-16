import React, { Suspense } from 'react';
import './index.css';
import { Router } from './routing/Router';

export const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router />
  </Suspense>
);
