import { useRouter } from 'next/router';
import { Menu, Badge } from 'antd';

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
        items={[
          { label: 'Main home', key: '/' },
          { label: 'Test hook from remote', key: '/home/testRemoteHook' },
        ]}
      />
    </>
  );
}
