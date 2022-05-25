import React from 'react';
import NextjsRemoteComponent from 'remote/nextjs-remote-component';
import NextjsRemotePage from 'remote/nextjs-remote-page';

function App() {
  return (
    <>
      <div>This is the React container App hosted at localhost:8080</div>
      <NextjsRemoteComponent />
      <NextjsRemotePage />
    </>
  );
}

export default App;
