import React from 'react';
import { Menu, Layout } from 'antd';
import { useRouter } from 'next/router';

const SharedNav = () => {
  const { pathname, push } = useRouter();

  let activeMenu;
  if (pathname === '/') {
    activeMenu = '/';
  } else if (pathname.startsWith('/shop')) {
    activeMenu = '/shop';
  } else if (pathname.startsWith('/checkout')) {
    activeMenu = '/checkout';
  } else if (pathname.startsWith('/p/something')) {
    activeMenu = '/p/something';
  }

  return (
    <Layout.Header>
      <div className="header-logo">nextjs-mf</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={activeMenu ? [activeMenu] : undefined}
        onClick={({ key }) => {
          push(key);
        }}
        items={[
          {
            label: (
              <>
                Home <sup>3000</sup>
              </>
            ),
            key: '/',
          },
          {
            label: (
              <>
                Shop <sup>3001</sup>
              </>
            ),
            key: '/shop',
          },
          {
            label: (
              <>
                Checkout <sup>3002</sup>
              </>
            ),
            key: '/checkout',
          },
          {
            label: (
              <>
                Federated Catch All <sup>3001</sup>
              </>
            ),
            key: '/p/something',
          },
        ]}
      />
      <style jsx>
        {`
          .header-logo {
            float: left;
            width: 200px;
            height: 31px;
            margin-right: 24px;
            color: white;
            font-size: 2rem;
          }
        `}
      </style>
    </Layout.Header>
  );
};

export default SharedNav;
