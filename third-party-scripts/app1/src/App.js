import React from 'react';
import('@module-federation/common-3rd-libs/google-analytics').then(ga => {
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
});
import('@module-federation/common-3rd-libs/facebook').then(fbq => {
  console.log(fbq);
  fbq('init', '12341234');
  fbq('track', 'PageView');
});
import('@module-federation/common-3rd-libs/bing').then(UET => {
  console.log(UET);
  var o = { ti: 'TAG_ID_HERE' };
  window.uetq = new UET(o);
  window.uetq.push('pageLoad');
});

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <p>Check the network tab to see all the third party calls</p>
  </div>
);

export default App;
