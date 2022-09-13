import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { app1RoutingPrefix, app2RoutingPrefix } from '../routing/constants';

export function Layout() {
  return (
    <>
      <nav style={{ marginBottom: '3rem' }}>
        <Link to={`/${app1RoutingPrefix}/page-1`} style={{ marginRight: '1rem' }}>
          App1 Page1
        </Link>
        <Link to={`/${app1RoutingPrefix}/page-2`} style={{ marginRight: '1rem' }}>
          App1 Page2
        </Link>
        <Link to={`/${app2RoutingPrefix}/page-1`} style={{ marginRight: '1rem' }}>
          App2 Page1
        </Link>
        <Link to={`/${app2RoutingPrefix}/page-2`}>App2 Page2</Link>
      </nav>
      <Outlet />
    </>
  );
}
