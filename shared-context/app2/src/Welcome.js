import { NameContextProvider } from 'shared-context_shared-library';
import React from 'react';

const Welcome = () => {
  const name = React.useContext(NameContextProvider);

  return <p>Welcome, {name}</p>;
};

export default Welcome;
