/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import { css, jsx, SerializedStyles } from '@emotion/react';
import { SettingOutlined } from '@ant-design/icons';
import { initFederation, loadRemoteModule } from '@softarc/native-federation';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');

type HeaderProps = {
  children: ReactNode;
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: SerializedStyles;
  }
}

let Button: React.ComponentType<any>;
let MiniSearch: React.ComponentType<any>;

(async () => {
  Button = React.lazy(async () => {
    const remotes = await getRemoteVersions();
    const module = await loadRemoteModule({
      remoteName: 'dsl',
      exposedModule: './Button',
      remoteEntry: remotes['dsl'] || 'http://localhost:3002/remoteEntry.json'
    });

    return module;
  });

  MiniSearch = React.lazy(async () => {
    const remotes = await getRemoteVersions();
    const module = await loadRemoteModule({
      remoteName: 'search',
      exposedModule: './MiniSearch',
      remoteEntry: remotes['search'] || 'http://localhost:3004/remoteEntry.json'
    });

    console.log('search: ', module);
    return module;
  });

  await initFederation();
})();

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
