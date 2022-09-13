import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

import HeroImage from './HeroImage';

import { sendMessage } from './analytics';

const Carousel = React.lazy(() => import('dsl/Carousel'));

const ProductCarousel = () => {
  sendMessage('ProductCarousel loaded');
  return (
    <React.Suspense fallback={<div />}>
      <Carousel slidesToShow={4}>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<HeroImage alt="Pugly" src="https://placedog.net/220/280?random" />}
        >
          <Meta title="Pugly" description="A strangely cute dog" />
        </Card>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<HeroImage alt="Noodle" src="https://placedog.net/221/280?random" />}
        >
          <Meta title="Noodle" description="Loves naps" />
        </Card>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<HeroImage alt="Dexter" src="https://placedog.net/222/280?random" />}
        >
          <Meta title="Dexter" description="Mysterious, but cool" />
        </Card>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<HeroImage alt="Dinklage" src="https://placedog.net/219/280?random" />}
        >
          <Meta title="Dinklage" description="Famously cute" />
        </Card>
      </Carousel>
    </React.Suspense>
  );
};

export default ProductCarousel;
