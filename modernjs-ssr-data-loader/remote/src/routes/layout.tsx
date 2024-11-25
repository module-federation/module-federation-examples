import { Outlet } from '@modern-js/runtime/router';
import './layout.css';

export default function Layout() {
  return (
    <div style={{border: '1px solid red', padding: '1rem'}}>
      <Outlet />
    </div>
  );
}
