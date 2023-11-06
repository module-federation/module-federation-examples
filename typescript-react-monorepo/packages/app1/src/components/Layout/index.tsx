import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

export type LayoutProps = {
  mainSideMenu?: { label: string; value: string }[];
};

const Layout: React.FC<LayoutProps> = ({ mainSideMenu = [] }) => {
  console.log('mainSideMenu :>> ', mainSideMenu);
  return (
    <div>
      <ul>
        {mainSideMenu?.map((item, index) => (
          <li key={index}>
            <Link
              to={{
                pathname: item.value,
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
