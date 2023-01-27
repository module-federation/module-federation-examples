import React from 'react';
import { Link } from 'react-router-dom';

export function PageB() {
  return (
    <React.Fragment>
      <div>Page B from App2</div>
      <Link to="/page-a">Go to Page A</Link>
    </React.Fragment>
  );
}