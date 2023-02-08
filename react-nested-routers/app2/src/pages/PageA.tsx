import React from 'react';
import { Link } from 'react-router-dom';

export function PageA() {
  return (
    <React.Fragment>
      <div>Page A from App2</div>
      <Link to="/page-b">Go to Page B</Link>
    </React.Fragment>
  );
}