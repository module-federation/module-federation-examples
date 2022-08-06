import { useRouter } from 'next/router';
import { Menu } from 'antd';

export default function AppMenu() {
  const router = useRouter();

  return (
    <Menu
      mode="inline"
      selectedKeys={[router.pathname]}
      style={{ height: '100%' }}
      onClick={({ key }) => router.push(key)}
      items={[{ label: 'Main shop', key: '/shop' }]}
    />
  );
}
