/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import { css, jsx, SerializedStyles } from '@emotion/react';
import { SettingOutlined } from '@ant-design/icons';
import { loadRemoteModule } from '@softarc/native-federation';

type HeaderProps = {
  children: ReactNode;
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: SerializedStyles;
  }
}

const Button = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'dsl',
    exposedModule: './Button',
    remoteEntry: 'http://localhost:3002/remoteEntry.json'
  });

  return module;
});

const MiniSearch = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'search',
    exposedModule: './MiniSearch',
    remoteEntry: 'http://localhost:3004/remoteEntry.json'
  });

  console.log('search: ', module);

  return module;
});

const menuItems = [{
  label: 'Menu', 
  key: 'SubMenu', 
  icon: <SettingOutlined />, 
  children: [
    {
      type: 'group', 
      title: 'Item 1', 
      children: [
        { key: 'setting:1', label: 'Option 1' },
        { key: 'setting:2', label: 'Option 2' }
      ]
    },
    {
      type: 'group', 
      title: 'Item 2', 
      children: [
        { key:'setting:3', label: 'Option 3' },
        { key:'setting:4', label: 'Option 4' }
      ]
    }
  ]
}];

const Header = ({ children }: HeaderProps) => (
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
      <Col span={8}>
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
