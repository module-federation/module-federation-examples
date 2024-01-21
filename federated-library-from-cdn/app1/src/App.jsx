import React from 'react';
const RemoteButton = React.lazy(() => import('remoteLibrary/Button'));

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center flex-col bg-slate-800">
      <h1 className="mb-36 mt-10 text-5xl text-white">Application - 1</h1>
      <React.Suspense fallback={<h1 className="text-white">Loading...</h1>}>
        <RemoteButton />
        <RemoteButton />
      </React.Suspense>
    </div>
  );
};

export default App;
