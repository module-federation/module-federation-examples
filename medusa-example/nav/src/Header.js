/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import { UploadOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
console.log(import('search/MiniSearch'));
const MiniSearch = React.lazy(() => import('search/MiniSearch'));
const Button = React.lazy(() => import('dsl/Button'));
const { SubMenu } = Menu;

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
        <Menu theme="dark" mode="horizontal">
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Menu">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
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
