import React from 'react';
import { Button } from './Button';

export default (): JSX.Element => {
  const containerStyles: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    maxWidth: '600px',
    margin: '2rem auto',
  };

  const headerStyles: React.CSSProperties = {
    color: '#2d2d2d',
    marginBottom: '1.5rem',
    fontSize: '24px',
    fontWeight: 600,
  };

  const imageStyles: React.CSSProperties = {
    width: '150px',
    height: 'auto',
    marginBottom: '1.5rem',
    transition: 'transform 0.3s ease',
  };

  return (
    <div id="remote-components" style={containerStyles}>
      <h2 style={headerStyles}>
        <strong>Remote</strong> Component Demo
      </h2>
      
      <img
        id="remote-components-image"
        src="https://module-federation.io/module-federation-logo.svg"
        style={imageStyles}
        alt="Module Federation Logo"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          onClick={() => alert('[remote-components] Client side Javascript works!')}
        >
          Primary Button
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary Button
        </Button>
      </div>
    </div>
  );
};
