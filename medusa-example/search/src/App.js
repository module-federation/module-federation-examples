import React from 'react';
import { Layout, Divider } from 'antd';

import 'antd/dist/antd.less';

import { sendMessage } from './analytics';

const Header = React.lazy(() => import('nav/Header'));
const Footer = React.lazy(() => import('nav/Footer'));
const ProductCarousel = React.lazy(() => import('home/ProductCarousel'));

import SearchList from './SearchList';

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
          {/* TODO: Figure out why this is broken */}
          {/*<ProductCarousel />*/}
        </React.Suspense>
      </Layout.Content>
      <React.Suspense fallback={<div />}>
        <Footer>Search Site</Footer>
      </React.Suspense>
    </Layout>
  );
};

export default App;
