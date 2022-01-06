import React from 'react';

const SomeComponent = () => (
  <div
    style={{
      padding: '1em',
      margin: '1em',
      border: '1px solid black',
      backgroundColor: '#ccc',
    }}
    onClick={() => alert('website2 is interactive')}
  >
    Header from website2. You can change this and reload localhost:3001 - the changes take old on
    SSR and client side
  </div>
);

export default SomeComponent;
