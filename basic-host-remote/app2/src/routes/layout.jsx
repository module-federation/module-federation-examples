import { Outlet } from '@modern-js/runtime/router';
import B from '../components/button'
console.log(B)
export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
