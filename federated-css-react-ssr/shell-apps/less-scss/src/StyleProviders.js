let providers;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const LoaderContext1 = require('expose_less/LoaderContext');
  // eslint-disable-next-line global-require
  const LoaderContext2 = require('expose_scss/LoaderContext');
  providers = [LoaderContext1.StyleContext.Provider, LoaderContext2.StyleContext.Provider];
} else {
  // eslint-disable-next-line global-require
  const React = require('react');
  const Passthrough = ({ children }) => React.createElement(React.Fragment, null, children);
  providers = [Passthrough];
}

export default providers;
