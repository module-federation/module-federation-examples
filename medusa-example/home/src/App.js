import React from 'react';
import { Layout, Tabs, Divider } from 'antd';

import './index.less';

import HeroImage from './HeroImage';
import PageSally from './PageSally';
import PageLG from './PageLG';
import PageMimi from './PageMimi';
import PageSammy from './PageSammy';
import ProductCarousel from './ProductCarousel';

import { sendMessage } from './analytics';

const Header = React.lazy(() => import('nav/Header'));
const Footer = React.lazy(() => import('nav/Footer'));

const SearchList = React.lazy(() => import('search/SearchList'));
const items = [
  { label: 'Sally', key:'1', children:<PageSally />},
  { label: 'Little Guy', key:'2', children:<PageLG />},
  { label: 'Mimi', key:'3', children:<PageMimi />},
  { label: 'Sammy', key:'4', children:<PageSammy />}
]
const App = () => {
  sendMessage('Application loaded');
  return (
    <Layout style={{ maxWidth: 1200, margin: 'auto' }}>
      <React.Suspense fallback="Loading SearchList">
        <Header>Home Page</Header>
      </React.Suspense>

      <Layout.Content style={{ background: 'white', padding: '2em' }}>
        <Divider>Dog of the day</Divider>

        <HeroImage src="https://placedog.net/800/280?random" style={{ margin: 'auto' }} />

        <Tabs defaultActiveKey="1" items={items} />

        <Divider>Search</Divider>

        <React.Suspense fallback="Loading SearchList">
          <SearchList />
        </React.Suspense>

        <Divider>More Dogs</Divider>
        <ProductCarousel />
      </Layout.Content>

      <React.Suspense fallback="Loading SearchList">
        <Footer>Home Page</Footer>
      </React.Suspense>
    </Layout>
  );
};

export default App;
