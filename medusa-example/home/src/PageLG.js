import React from 'react';
import { Row, Col } from 'antd';

import HeroImage from './HeroImage';

import { sendMessage } from './analytics';

const Button = React.lazy(() => import('dsl/Button'));

const PageLG = () => {
  sendMessage('PageLG Loaded');
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '25% 50% 20%',
        gridGap: '1em',
      }}
    >
      <HeroImage src="https://placedog.net/510/280?random" style={{ width: '100%' }} />
      <div>
        <h2>Little Guy</h2>
        <p>Little Guy is a great dog.</p>
      </div>
      <React.Suspense fallback={<div />}>
        <Button>Adopt this dog!</Button>
      </React.Suspense>
    </div>
  );
};

export default PageLG;
