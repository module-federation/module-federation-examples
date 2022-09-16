import { useRouter } from 'next/router';
import { Menu } from 'antd';

const menuItems = [
  { label: 'Main checkout', key: '/checkout' },
  { label: 'Exposed pages', key: '/checkout/exposed-pages' },
  {
    label: 'Exposed components',
    children: [
      { label: 'checkout/CheckoutTitle', key: '/checkout/test-title' },
      { label: 'checkout/ButtonOldAnt', key: '/checkout/test-check-button' },
    ],
  },
];

export default function AppMenu() {
  const router = useRouter();

  return (
    <>
      <div style={{ padding: '10px', fontWeight: 600, backgroundColor: '#fff' }}>
        Checkout App Menu
      </div>
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
