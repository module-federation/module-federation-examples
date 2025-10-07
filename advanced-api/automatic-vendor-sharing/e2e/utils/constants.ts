export const Constants = {
  commonConstantsData: {
    headerText: 'Module Federation with Automatic Vendor Sharing',
    appDisplayNames: {
      app1: 'App 1 (Host & Remote)',
      app2: 'App 2 (Host & Remote)',
    },
    buttonLabels: {
      app1: 'App 1 Button',
      app2: 'App 2 Button',
    },
  },
  color: {
    app1Button: 'rgb(136, 0, 0)',
    app2Button: 'rgb(0, 0, 204)',
  },
  sections: {
    localHeading: 'Local Component',
    remoteHeadings: {
      app1: 'Remote Component (App 2)',
      app2: 'Remote Component (App 1)',
    },
    descriptions: {
      app1Local: "This button is served from App 1's local bundle",
      app2Local: "This button is served from App 2's local bundle",
      app1Remote: 'This button is loaded from App 2 via Module Federation',
      app2Remote: 'This button is loaded from App 1 via Module Federation',
    },
  },
  infoSection: {
    heading: 'Automatic Vendor Sharing Info',
    summary:
      'This example demonstrates AutomaticVendorFederation, which intelligently shares dependencies between microfrontends to optimize bundle sizes and prevent duplicate code.',
    sharedDependencies: 'Shared Dependencies: react, react-dom',
    loadStrategy: 'Load Strategy: loaded-first (uses the first loaded version)',
    benefits: 'Benefits: Reduced bundle size, faster loading, consistent dependency versions',
  },
};
