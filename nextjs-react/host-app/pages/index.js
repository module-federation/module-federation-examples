import Button from '../components/Button';
import {lazy} from 'react'
let RemoteButton = ()=> null
if(typeof window === 'undefined') {
  RemoteButton = lazy(() => import('remote/Button'));
}

export default function Home() {
  return (
    <div style={{ padding: '2%' }}>
      <h1>Next JS and React</h1>
      <h2>Host - Button</h2>
      <Button />
      <h2>Client - Button</h2>
      <RemoteButton />
    </div>
  );
}
