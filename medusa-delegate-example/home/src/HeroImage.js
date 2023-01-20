import React from 'react';
import { sendMessage } from './analytics';

const HeroImage = props => {
  sendMessage('loaded');
  return <img {...props} />;
};

export default HeroImage;
