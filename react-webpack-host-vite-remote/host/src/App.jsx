import React, { Suspense } from 'react';

const RemoteVite = React.lazy(() => import('remotevite/Button'));

export default function App() {
  return (
    <div>
      <h1>Host App in Webpack</h1>
      <Suspense fallback="Carregando...">
        <RemoteVite />
      </Suspense>
    </div>
  );
}
