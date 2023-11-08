import Local from './Local';
import RemoteApp1Routers from 'app1/Routers';
import RemoteApp2Routers from 'app2/Routers';
import RootLayout from '../components/RootLayout';

const Routers = () => [
  Local(),
  { ...RemoteApp2Routers(), element: <RootLayout /> },
  { ...RemoteApp1Routers(), element: <RootLayout /> },
];

export default Routers;
