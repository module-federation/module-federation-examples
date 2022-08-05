import App from 'next/app';
import { MantineProvider, AppShell as MantineLayout, Navbar, Text } from '@mantine/core';
import dynamic from 'next/dynamic';

const SharedNav = dynamic(
  () => {
    const mod = import('home/SharedNav').catch(console.error);
    return mod;
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles>
      <MantineLayout
        padding="md"
        header={<SharedNav />}
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text size="lg" weight="bold">
              Checkout menu
            </Text>
          </Navbar>
        }
      >
        <Component {...pageProps} />
      </MantineLayout>
    </MantineProvider>
  );
}
MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
