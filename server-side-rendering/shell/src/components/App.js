import React from 'react';
import { Helmet } from "react-helmet";

const Remote1Content = React.lazy(() => import('remote1/Content'));


export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <div style={{
      backgroundColor: 'black',
      color: 'lightgrey',
      padding: '1rem'
    }} onClick={() => alert('shell is interactive')}>
     <h1>Module Federation Example: Server Side Rendering</h1>
     <h2>This is the shell application.</h2>
    </div>
   
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <Remote1Content />
    </React.Suspense>
  </div >
);
