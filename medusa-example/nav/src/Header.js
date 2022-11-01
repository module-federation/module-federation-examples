/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import { UploadOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
console.log(import('search/MiniSearch'));
const MiniSearch = React.lazy(() => import('search/MiniSearch'));
const Button = React.lazy(() => import('dsl/Button'));

const menuItems =[
  {label: 'Menu', key: 'SubMenu', icon:<SettingOutlined />, children:[
      {type:'group', title:'Item 1', children:[
          {key:'setting:1', label: 'Option 1'},
          {key:'setting:2', label: 'Option 2'}
        ]},
      {type:'group', title:'Item 2', children:[
          {key:'setting:3', label: 'Option 3'},
          {key:'setting:4', label: 'Option 4'}
        ]}
    ]}
];

const Header = ({ children }) => (
  <Layout.Header>
    <Row>
      <Col span={10}>
        <h2
          css={css`
            color: white;
          `}
        >
          {children}
        </h2>
      </Col>
      <Col span={6}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Col>
      <Col span={8} style={{ marginTop: 15 }}>
        <React.Suspense fallback={<span />}>
          <MiniSearch
            inputProps={{
              style: {
                width: 200,
              },
            }}
          />
        </React.Suspense>
        <React.Suspense fallback={<span />}>
          <Button>Search</Button>
        </React.Suspense>
      </Col>
    </Row>
  </Layout.Header>
);

export default Header;
