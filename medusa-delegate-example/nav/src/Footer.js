import React from 'react';
import { Layout } from 'antd';

const Footer = ({ children }) => (
  <Layout.Footer>
    <h2>{children}</h2>
  </Layout.Footer>
);

export default Footer;
