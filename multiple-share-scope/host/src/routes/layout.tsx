import React17 from 'react17';
import React from 'react';
import { Outlet } from '@modern-js/runtime/router';

console.log(React17, React);

const Layout = (): JSX.Element => (
  <div>
    <Outlet />
  </div>
);

export default Layout;
