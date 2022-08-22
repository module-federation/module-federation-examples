import { useRouter } from 'next/router';
import { Menu } from 'antd';

const menuItems = [
  { label: 'Main home', key: '/' },
  { label: 'Test hook from remote', key: '/home/test-remote-hook' },
  { label: 'Exposed pages', key: '/home/exposed-pages' },
  {
    label: 'Exposed components',
    children: [{ label: 'home/SharedNav', key: '/home/test-shared-nav' }],
  },
];

export default function AppMenu() {
  const router = useRouter();

  return (
    <>
      <div style={{ padding: '10px', fontWeight: 600, backgroundColor: '#fff' }}>Home App Menu</div>
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
