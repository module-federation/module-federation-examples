import { Outlet } from '@modern-js/runtime/router';

const Layout = (): JSX.Element => (
  <div>
    <Outlet />
  </div>
);

export default Layout;
