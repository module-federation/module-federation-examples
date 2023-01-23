import React from 'react';
import { Layout } from 'antd';

import { sendMessage } from './analytics';

import 'antd/dist/antd.less';

import Header from './Header';
import Footer from './Footer';

const App = () => {
  sendMessage('loaded');
  return (
    <Layout style={{ maxWidth: 1200, margin: 'auto' }}>
      <Header>Navigation Site</Header>
      <Layout.Content style={{ background: 'white', padding: '2em' }}>
        Some content for yah!
      </Layout.Content>
      <Footer>Navigation Site</Footer>
    </Layout>
  );
};

export default App;
