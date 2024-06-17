import { Outlet, useParams, useLocation } from '@modern-js/runtime/router';
import './layout.css';

export default function Layout() {
  const route = useParams();
  console.log(route);
  return (
    <div>
      <Outlet />
    </div>
  );
}
