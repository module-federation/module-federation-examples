import React from 'react';
import * as lodash from 'lodash';

const style = {
  background: '#4444ff',
  color: '#fff',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
};

const Button = () => (
  <button 
    style={style}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      e.target.style.background = '#5555ff';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      e.target.style.background = '#4444ff';
    }}
  >
    App 2 Button - lodash {lodash.VERSION}
  </button>
);

export default Button;
