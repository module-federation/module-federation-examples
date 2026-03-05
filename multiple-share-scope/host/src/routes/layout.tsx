import React17 from 'react17';
import React from 'react';
console.log(React17, React);
import { Outlet } from '@modern-js/runtime/router';

const Layout = (): JSX.Element => (
  <div>
    <Outlet />
  </div>
);

export default Layout;
