import React from 'react';
import { Button } from 'antd';
console.log(
  'REMOTE FEDERATION MANAGEMENT: using remote version: ' + require('../package.json').version,
);
// red
// green
// blue
const MyButton = ({ children }) => (
  <Button type="primary" style={{ background: 'blue' }}>
    {children}
  </Button>
);

export default MyButton;
