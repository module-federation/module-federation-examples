import React from 'react';
import { Helmet } from "react-helmet";
const Content1 = React.lazy(() => import('expose_css/Content'));
const Content2 = React.lazy(() => import('expose_scss/Content'));



export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <React.Suspense fallback={<h1>Loading....</h1>}>
        <Content1 />
        <Content2 />
    </React.Suspense>
  </div >
);
