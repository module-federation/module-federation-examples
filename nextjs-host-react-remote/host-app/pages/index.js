import Button from '../components/Button';
import { lazy, useEffect, useState } from 'react';

export default function Home() {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setComponent(lazy(() => import('remote/Button')));
    }
  }, []);
  return (
    <div style={{ padding: '2%' }}>
      <h1>Next JS and React</h1>
      <h2>Host - Button</h2>
      <Button />
      <h2>Client - Button</h2>
      {Component && <Component />}
    </div>
  );
}
