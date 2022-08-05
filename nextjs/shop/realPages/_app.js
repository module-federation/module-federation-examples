import dynamic from 'next/dynamic';
const SharedNav = dynamic(
  () => {
    const mod = import('home/SharedNav');
    return mod;
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles>
      <MantineLayout
        padding="md"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text size="lg" weight="bold">
              Checkout menu
            </Text>
          </Navbar>
        }
        header={<SharedNav />}
      >
        <Component {...pageProps} />
      </MantineLayout>
    </MantineProvider>
  );
}

export default MyApp;
