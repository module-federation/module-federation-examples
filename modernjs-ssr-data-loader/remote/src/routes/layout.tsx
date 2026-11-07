import { Outlet } from '@modern-js/runtime/router';

export default function Layout() {
  return (
    <main>
      <h1>Standalone remote data provider</h1>
      <Outlet />
    </main>
  );
}
