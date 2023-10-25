import { Outlet } from '@modern-js/runtime/router';
console.log('test');
export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
