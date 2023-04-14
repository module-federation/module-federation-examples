import React from 'react';
import { Carousel, CarouselProps } from 'antd';

const MyCarousel = ({ children, ...props }: CarouselProps) => {
  return <Carousel {...props}>{children}</Carousel>;
};

export default MyCarousel;
