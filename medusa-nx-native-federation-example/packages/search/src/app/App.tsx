import React from 'react';
import { Layout, Divider } from 'antd';
import { loadRemoteModule } from '@softarc/native-federation';
import { sendMessage } from './analytics';
import SearchList from './SearchList';

import 'antd/dist/antd.css';

const Header = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'nav',
    exposedModule: './Header'
  });

  return module;
});

const Footer = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'nav',
    exposedModule: './Footer'
  });

  return module;
});

const ProductCarousel = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'home',
    exposedModule: './ProductCarousel'
  });

  return module;
});

const App = () => {
  sendMessage('page loaded');
  return (
    <Layout style={{ maxWidth: 1200, margin: 'auto' }}>
      <React.Suspense fallback={<div />}>
        <Header>Search Site</Header>
      </React.Suspense>
      <Layout.Content style={{ padding: '2em', background: 'white' }}>
        <SearchList />
        <Divider>More Dogs</Divider>
        <React.Suspense fallback={<div />}>
          <ProductCarousel />
        </React.Suspense>
      </Layout.Content>
      <React.Suspense fallback={<div />}>
        <Footer>Search Site</Footer>
      </React.Suspense>
    </Layout>
  );
};

export default App;
