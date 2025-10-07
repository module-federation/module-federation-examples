export const Constants = {
  elementsText: {
    dynamicSystemRemotesRuntimeApp: {
      host: {
        header: 'Dynamic Remotes with Runtime Environment Variables',
        envSectionTitle: 'Environment Configuration:',
        paragraph:
          'This example demonstrates how Module Federation can load remote components dynamically with runtime environment variables. The remote URL and other configuration can be changed without rebuilding the application.',
        button: 'Load Remote Widget',
        remoteSectionTitle: 'Remote Component:',
        remoteLoading: 'Loading remote component... This may take a few seconds.',
        remoteEmptyState: 'No remote component loaded. Click "Load Remote Widget" to begin.',
      },
      remoteApp: {
        header: 'Dynamic System Host',
        subheader: 'Remote',
      },
      widget: {
        title: 'Remote Widget',
        envPrefix: 'My env is',
        paragraph: 'Using momentjs for format the date',
      },
    },
  },
  commonConstantsData: {
    envLoader: 'Loading environment configuration...',
    remoteConfigLoader: 'Loading remote configuration...',
  },
};
