import { getInstance } from '@module-federation/modern-js-v3/runtime';
import { lazyLoadComponentPlugin } from '@module-federation/modern-js-v3/react';

getInstance()!.registerPlugins([lazyLoadComponentPlugin()]);

export default getInstance()!.createLazyComponent({
  loader: () => import('remote/DataCard'),
  loading: <p>Loading remote data...</p>,
  export: 'default',
  fallback: ({ error }) => <p role="alert">{String(error)}</p>,
});

export const ClientCard = getInstance()!.createLazyComponent({
  noSSR: true,
  loader: () => import('remote/ClientDataCard'),
  loading: <p>Loading remote data...</p>,
  export: 'default',
  fallback: ({ error }) => <p role="alert">{String(error)}</p>,
});
