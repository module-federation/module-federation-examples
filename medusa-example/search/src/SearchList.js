import React from 'react';
import { Row, Col } from 'antd';

const TextField = React.lazy(() => import('dsl/TextField'));
const Button = React.lazy(() => import('dsl/Button'));

const SearchList = () => (
  <>
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
  </>
);

export default SearchList;
