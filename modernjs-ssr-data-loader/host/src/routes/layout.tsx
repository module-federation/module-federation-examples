import { Link, Outlet, useLocation } from '@modern-js/runtime/router';

export default function Layout() {
  const entry = useLocation().pathname.startsWith('/entry-two') ? '/entry-two' : '/entry-one';

  return (
    <main>
      <nav>
        <Link to="/entry-one">SSR entry</Link> <Link to="/entry-two">CSR entry</Link>{' '}
        <Link to={entry}>Home</Link> <Link to={`${entry}/details`}>Details</Link>
      </nav>
      <Outlet />
    </main>
  );
}
