import React from 'react';
import { Card } from 'antd';
import { initFederation, loadRemoteModule } from '@softarc/native-federation';
import HeroImage from './HeroImage';
import { sendMessage } from './analytics';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

const { Meta } = Card;
const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');

let Carousel: React.ComponentType<any>;

(async () => {
  Carousel = React.lazy(async () => {
    const remotes = await getRemoteVersions();
    const module = await loadRemoteModule({
      remoteName: 'dsl',
      exposedModule: './Carousel',
      remoteEntry: remotes['dsl'] || 'http://localhost:3002/remoteEntry.json'
    });

    return module;
  });

  await initFederation();
})();

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
