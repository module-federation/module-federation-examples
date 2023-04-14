import React, { ReactNode } from 'react';
import { Button } from 'antd';

import packageJson from '../../package.json';

console.log(
  'REMOTE NATIVE FEDERATION MANAGEMENT: using remote version: ' + packageJson.version,
);

type ButtonProps = {
  children: ReactNode;
}
// red
// green
// blue
const MyButton = ({ children }: ButtonProps) => (
  <Button type="primary" style={{ background: 'blue' }}>
    {children}
  </Button>
);

export default MyButton;
