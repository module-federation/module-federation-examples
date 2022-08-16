import Button from 'antd/lib/button';
import { version } from 'antd/package.json';

export default function ButtonOldAnt() {
  return <Button>Button from antd@{version}</Button>;
}
