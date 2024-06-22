import React, { useState } from 'react';
import {
  BrowserRouter,
  createBrowserRouter,
  Routes,
  Router,
  Route,
  Link,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu, Timeline } from 'antd';
import { GroupOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

function Navgation() {
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const items: MenuProps['items'] = [
    {
      label: <Link to="/">Home</Link>,
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/remote1">Remote1</Link>,
      key: '/remote1',
      icon: <GroupOutlined />,
    },
    {
      label: <Link to="/remote2">Remote2</Link>,
      key: '/remote2',
      icon: <GroupOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Navgation;
