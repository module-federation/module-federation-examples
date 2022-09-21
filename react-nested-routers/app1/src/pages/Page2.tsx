import React from 'react';
import { Link } from 'react-router-dom';

export function Page2() {
  return (
    <React.Fragment>
      <div>Page 2 from App1</div>
      <Link to="/page-1">Go to Page 1</Link>
    </React.Fragment>
  );
}
