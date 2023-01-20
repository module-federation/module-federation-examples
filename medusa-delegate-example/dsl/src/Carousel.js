import React from 'react';
import { Carousel } from 'antd';
const MyCarousel = ({ children, ...props }) => {
  return <Carousel {...props}>{children}</Carousel>;
};

export default MyCarousel;
