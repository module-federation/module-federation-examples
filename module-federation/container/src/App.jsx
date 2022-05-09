import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('dashboard/App'));
const Marketplace = lazy(() => import('marketplace/App'));

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="dashboard">Dashboard</Link>
          <Link to="marketplace">Marketplace</Link>
        </nav>
        <h1>Module Federation</h1>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="marketplace" element={<Marketplace />} />
            {/* <Route path="marketplace" element={<>Marketplace</>} /> */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}