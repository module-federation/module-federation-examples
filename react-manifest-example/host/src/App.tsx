import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './navigation';
import './App.css';
import { useMemo, useState } from 'react';
import Home from './pages/Home';
import Remote1 from './pages/remote1';
import Remote2 from './pages/remote2';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Navigation />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/remote1" Component={() => <Remote1 />} />
        <Route path="/remote2" Component={() => <Remote2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
