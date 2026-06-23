import { styled } from '@stitches/react';
import React, { useEffect } from 'react';

const StyledButton = styled('button', {
  background: '#4b4be8',
  color: '#fff',
  padding: 12,
});

const Button = props => {
  useEffect(() => {
    console.log('hooks work');
  }, []);
  return <StyledButton>Remote Button</StyledButton>;
};

export default Button;
