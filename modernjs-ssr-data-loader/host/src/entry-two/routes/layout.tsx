import { Outlet } from '@modern-js/runtime/router';

export default function Layout() {
  return (
    <div>
      <h1>entry two layout</h1>
      <Outlet />
    </div>
  );
}
