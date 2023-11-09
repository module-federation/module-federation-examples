import * as React from 'react';

//@ts-ignore
const RemoteButton = React.lazy(() => import('app2/NoLongerWorks'));

const Components = () => (
  <React.Suspense fallback="Loading Button">
    <RemoteButton />
  </React.Suspense>
);

export default Components;
