import { useRouter } from 'next/router';
import { Menu } from 'antd';

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
        items={[
          { label: 'Main checkout', key: '/checkout' },
          { label: 'Checkout title', key: '/checkout/title' },
          { label: 'Check button', key: '/checkout/check-button' },
        ]}
      />
    </>
  );
}
