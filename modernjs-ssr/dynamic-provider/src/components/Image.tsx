import React from 'react';
import styles from './Image.module.css';

export default (): JSX.Element => (
  <div
    id="remote-components"
    style={{
      backgroundColor: '#c0e91e',
      color: 'lightgrey',
      padding: '1rem',
    }}
  >
    <h2>
      <strong>dynamic remote</strong>&nbsp;image
    </h2>
    <button
      id="dynamic-remote-components-button"
      style={{ marginBottom: '1rem' }}
      onClick={() => alert('[remote-components] Client side Javascript works!')}
    >
      Click me to test i'm interactive!
    </button>
    <img
      id="dynamic-remote-components-image"
      src="https://module-federation.io/module-federation-logo.svg"
      style={{ width: '100px' }}
      alt="serge"
    />
    <button className={styles['button']}>Button from dynamic remote</button>
  </div>
);