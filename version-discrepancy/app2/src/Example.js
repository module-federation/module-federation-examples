import { VERSION, nth } from 'lodash';

import React from 'react';

const Example = () => {
  return (
    <div style={{ border: '1px solid black', padding: 12 }}>
      <h3>Remote Component</h3>
      <p>Lodash v{VERSION}</p>
      <p>
        <code>
          typeof lodash.nth
          <br />
          // => {typeof nth}
        </code>
      </p>
      <p>
        <code>
          nth(['a', 'b'], -1)
          <br />
          // => "{nth(['a', 'b'], -1)}"
        </code>
      </p>
    </div>
  );
};

export default Example;
