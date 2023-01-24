import React from 'react';
import { Row, Col } from 'antd';
import { loadRemoteModule } from '@softarc/native-federation';

const TextField = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'dsl',
    exposedModule: './TextField'
  });

  return module;
});

const Button = React.lazy(async () => {
  const module = await loadRemoteModule({
    remoteName: 'dsl',
    exposedModule: './Button'
  });

  return module;
});

const SearchList = () => (
  <div>
    <Row gutter={6}>
      <Col span={20}>
        <React.Suspense fallback={<span />}>
          <TextField />
        </React.Suspense>
      </Col>
      <Col span={4}>
        <React.Suspense fallback={<span />}>
          <Button>Search</Button>
        </React.Suspense>
      </Col>
    </Row>
  </div>
);

export default SearchList;
