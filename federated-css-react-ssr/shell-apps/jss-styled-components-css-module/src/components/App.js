import React from 'react';
import { Helmet } from "react-helmet";
const Content1 = React.lazy(() => import('expose_styled_component/Content'));
const Content2 = React.lazy(() => import('expose_jss/Content'));
const Content3 = React.lazy(() => import('expose_css_module/Content'));



export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <React.Suspense fallback={<h1>Loading....</h1>}>
        <Content1 />
        <Content2 />
        <Content3 />
    </React.Suspense>
  </div >
);
