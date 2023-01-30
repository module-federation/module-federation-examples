import React from 'react';
import Button from './Button';
import Carousel from './Carousel';
import TextField from './TextField';

import 'antd/dist/antd.less';

const App = () => (
  <div>
    <h1>DSL Test Page</h1>
    <Button>Something buttony</Button>
    <TextField />
    <Carousel slidesToShow={4} style={{ maxHeight: 200 }}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Carousel>
  </div>
);

export default App;
