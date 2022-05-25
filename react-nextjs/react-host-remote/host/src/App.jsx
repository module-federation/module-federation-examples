import React from 'react';
import RemoteNav from 'remote/Nav';
// This is case you want to expose the entire App
// no see the case but its possible
// import RemoteApp from 'remote/App'

function App() {
  return (
    <>
      <div>This is the container App hosted at localhost:8080</div>
      <RemoteNav />
      <hr />
    </>
  );
}

export default App;
