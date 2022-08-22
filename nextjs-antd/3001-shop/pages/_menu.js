import { useRouter } from 'next/router';
import { Menu } from 'antd';

const menuItems = [
  { label: 'Main shop', key: '/shop' },
  { label: 'Product A', key: '/shop/products/A' },
  { label: 'Product B', key: '/shop/products/B' },
  { label: 'Exposed pages', key: '/shop/exposed-pages' },
  {
    label: 'Exposed components',
    children: [
      { label: 'shop/WebpackSvg', key: '/shop/test-webpack-svg' },
      { label: 'shop/WebpackPng', key: '/shop/test-webpack-png' },
    ],
  },
];

export default function AppMenu() {
  const router = useRouter();

  return (
    <>
      <div style={{ padding: '10px', fontWeight: 600, backgroundColor: '#fff' }}>Shop App Menu</div>
      <Menu
        mode="inline"
        selectedKeys={[router.asPath]}
        style={{ height: '100%' }}
        onClick={({ key }) => router.push(key)}
        items={menuItems}
      />
    </>
  );
}
