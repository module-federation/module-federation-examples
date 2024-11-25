import { Outlet } from '@modern-js/runtime/router';

export default function Layout() {
  return (
    <div style={{ border: '1px solid blue', padding: '1rem' }}>
      <Outlet />
    </div>
  );
}
