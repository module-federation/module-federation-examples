import { useRouter } from 'next/router';
import { Menu } from 'antd';

const menuItems = [
  { label: 'Main shop', key: '/shop' },
  { label: 'Webpack png', key: '/shop/webpack-png' },
  { label: 'Webpack svg', key: '/shop/webpack-svg' },
];

export default function AppMenu() {
  const router = useRouter();

  return (
    <Menu
      mode="inline"
      selectedKeys={[router.pathname]}
      style={{ height: '100%' }}
      onClick={({ key }) => router.push(key)}
      items={menuItems}
    />
  );
}
