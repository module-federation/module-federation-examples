import { FC } from 'react';
import RemoteApp1Layout from 'app1/Layout';
import { LayoutProps } from '@mf-types/app1/_types/components/Layout';

const Layout: FC<LayoutProps> = props => {
  return <RemoteApp1Layout {...props} />;
};
const RootLayout = () => {
  return (
    <Layout
      mainSideMenu={[
        { label: 'host', value: '/' },
        { label: 'app-1', value: '/app-1' },
        { label: 'app-2', value: '/app-2' },
      ]}
    />
  );
};

export default RootLayout;
