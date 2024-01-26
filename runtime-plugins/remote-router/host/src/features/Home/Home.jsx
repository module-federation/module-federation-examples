import React, { memo } from 'react';

import HelloWorld from 'remoteOne/HelloWorld';
import Button from 'remoteTwo/Button';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <HelloWorld name="John Doe" />
      <Button>Click Me</Button>
    </>
  );
}

export default memo(Home);
