import { Outlet } from '@modern-js/runtime/router';
import './layout.css';
import { Helmet } from '@modern-js/runtime/head';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>Tractor Store</title>
      </Helmet>
      <div data-boundary="checkout-page">
        <Outlet />
      </div>
    </>
  );
}
