import React from 'react';
import { sendMessage } from './analytics';

type ImageProps = {
  src: string;
  alt?: string; 
  style?: React.CSSProperties
}

const HeroImage = (props: ImageProps) => {
  sendMessage('loaded');
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
};

export default HeroImage;
