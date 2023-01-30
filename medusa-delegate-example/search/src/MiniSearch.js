import React from 'react';

const TextField = React.lazy(() => import('dsl/TextField'));

const MiniSearch = ({ inputProps = {} }) => (
  <React.Suspense fallback={<span />}>
    <TextField placeholder="Search" {...inputProps} />
  </React.Suspense>
);

export default MiniSearch;
