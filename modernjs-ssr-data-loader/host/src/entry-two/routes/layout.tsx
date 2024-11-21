import { Link, Outlet } from '@modern-js/runtime/router';
import './layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <nav className="nav-bar">
        <div className="nav-brand">Modern.js CSR only Demo</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/federation/route-b" className="nav-link">
            Route B
          </Link>
          <Link to="/federation/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/federation/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/nested-routes" className="nav-link">
            Nested Routes
          </Link>
          <Link to="/federation" className="nav-link">
            Pathname
          </Link>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
