import Link from 'next/link'
import React from 'react';
import routes from './routes';

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: '16px',
};

const Navigation = () => (
  <div style={style}>
      {routes.map((route, idx) => (
          <Link href={route.path} key={idx}>{ `Page ${route.path}` }</Link>
      ))}
  </div>
);

export default Navigation;
