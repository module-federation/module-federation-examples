import { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../services/queryClient';
import { GlobalStyles } from '../components/GlobalStyles';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Welcome to plp!</title>
        </Head>
        <main className="app">
          <GlobalStyles />
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default CustomApp;
