import React, { useState } from 'react';

const baseStyle = {
  background: '#00c',
  color: '#fff',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const Button = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setClickCount(count => count + 1);
    console.log('[App 2 Button] Clicked', clickCount + 1, 'times');
  };

  const style = {
    ...baseStyle,
    background: isHovered ? '#00e' : '#00c',
    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <button
      style={style}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Button from App 2 - demonstrates remote component with shared dependencies"
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#fff',
          borderRadius: '50%',
        }}
      />
      App 2 Button
      {clickCount > 0 && (
        <span
          style={{
            background: '#fff',
            color: '#00c',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
          }}
        >
          {clickCount}
        </span>
      )}
    </button>
  );
};

export default Button;
