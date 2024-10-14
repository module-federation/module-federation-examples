import React from 'react';
import Button from 'antd/lib/button';
import stuff from './stuff.module.css';

export default (): JSX.Element => (
  <div
    id="remote-components"
    style={{
      backgroundColor: '#1ee9c1',
      color: 'lightgrey',
      padding: '1rem',
    }}
  >
    <h2>
      <strong>remote</strong>&nbsp;image
    </h2>
    <button
      id="remote-components-button"
      style={{ marginBottom: '1rem' }}
      onClick={() => alert('[remote-components] Client side Javascript works!')}
    >
      Click me to test i'm interactive!
    </button>
    <img
      id="remote-components-image"
      src="https://module-federation.io/module-federation-logo.svg"
      style={{ width: '100px' }}
      alt="serge"
    />
    <Button className={stuff['test-remote2']}>Button from remote</Button>
  </div>
);
