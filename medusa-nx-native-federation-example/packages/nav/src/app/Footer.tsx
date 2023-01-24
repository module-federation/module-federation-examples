import React, { ReactNode } from 'react';
import { Layout } from 'antd';

type FooterProps = {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => (
  <Layout.Footer>
    <h2>{children}</h2>
  </Layout.Footer>
);

export default Footer;
