// Avoid requiring remote LoaderContext during SSR startup.
// On the server, provide a passthrough provider; on the client, use remote providers.
let providers;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const LoaderContext1 = require('expose_css/LoaderContext');
  providers = [LoaderContext1.StyleContext.Provider];
} else {
  // eslint-disable-next-line global-require
  const React = require('react');
  const Passthrough = ({ children }) => React.createElement(React.Fragment, null, children);
  providers = [Passthrough];
}

export default providers;
