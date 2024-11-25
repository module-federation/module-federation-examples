import Button from 'antd/lib/button';
import * as React from 'react';
import Comp from 'remote/Image';
import stuff from './stuff.module.css';

export default (): JSX.Element => (
  <div
    id="nested-remote-components"
    style={{
      backgroundColor: '#9c27b0',
      color: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '2rem auto',
    }}
  >
    <h2
      onClick={() => alert('Client side Javascript works!')}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          alert('Client side Javascript works!');
        }
      }}
      style={{
        marginBottom: '1.5rem',
        cursor: 'pointer',
      }}
    >
      <strong>Nested Remote Component</strong>
    </h2>
    <Button
      id="nested-remote-components-button"
      className={stuff['test-remote2']}
      onClick={() =>
        alert('[nested-remote-components] Client side Javascript works!')
      }
      style={{
        marginBottom: '1.5rem',
      }}
    >
      Click me to test <strong>nested remote</strong> interactive!
    </Button>
    <Comp />
  </div>
);
