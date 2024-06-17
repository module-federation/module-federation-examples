import { Outlet } from '@modern-js/runtime/router';
import './layout.css';

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
