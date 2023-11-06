import React from 'react';
import { Link } from 'react-router-dom';
import RemoteButtonProps from '@mf-types/app2/Button';
const RemoteButton = React.lazy(() => import('app2/Button')) as typeof RemoteButtonProps;
const Home = () => {
  return (
    <div>
      <h1> App-Host --- Home page</h1>
      <RemoteButton label="this button from remote" />
      <br />
      <br />
      <Link to={`page-2`}>App-Host - page-2</Link>
    </div>
  );
};

export default Home;
