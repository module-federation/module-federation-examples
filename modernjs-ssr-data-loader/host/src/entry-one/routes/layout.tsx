import { Link, Outlet } from '@modern-js/runtime/router';
import styles from './layout.module.css';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <nav className={styles.navBar}>
        <div className={styles.navBrand}>Modern.js Demo</div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/nested-routes/pathname/route-b" className={styles.navLink}>
            Route B
          </Link>
          <Link
            to="/nested-routes/pathname/dashboard"
            className={styles.navLink}
          >
            Dashboard
          </Link>
          <Link to="/nested-routes/pathname/profile" className={styles.navLink}>
            Profile
          </Link>
          <Link to="/nested-routes" className={styles.navLink}>
            Nested Routes
          </Link>
          <Link to="/nested-routes/pathname" className={styles.navLink}>
            Pathname
          </Link>
        </div>
      </nav>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
