// Runtime plugin for Module Federation debugging and monitoring
const runtimePlugin = () => ({
  name: 'automatic-vendor-sharing-runtime',

  beforeInit(args) {
    console.log('[MF Runtime] App2 - Initializing Module Federation with AutomaticVendorSharing');
    console.log('[MF Runtime] App2 - Available remotes:', Object.keys(args.remotes || {}));
    return args;
  },

  beforeLoadShare(args) {
    console.log(
      '[MF Runtime] App2 - Loading shared dependency:',
      args.pkgName,
      'version:',
      args.version,
    );

    // Monitor shared dependency loading for optimization insights
    if (args.pkgName === 'react' || args.pkgName === 'react-dom') {
      console.log('[MF Runtime] App2 - Critical React dependency being shared');
    }

    return args;
  },

  beforeRequest(args) {
    console.log(
      '[MF Runtime] App2 - Requesting module:',
      args.id,
      'from remote:',
      args.options?.remote,
    );

    // Add performance monitoring
    args.options = {
      ...args.options,
      metadata: {
        ...args.options?.metadata,
        requestTime: Date.now(),
        source: 'app2',
      },
    };

    return args;
  },

  afterResolve(args) {
    if (args.options?.metadata?.requestTime) {
      const loadTime = Date.now() - args.options.metadata.requestTime;
      console.log(`[MF Runtime] App2 - Module ${args.id} loaded in ${loadTime}ms`);
    }
    return args;
  },

  errorLoadRemote(args) {
    console.error('[MF Runtime] App2 - Failed to load remote module:', args);

    // Enhanced error reporting for debugging
    const errorInfo = {
      remote: args.id,
      error: args.error?.message,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.error('[MF Runtime] App2 - Error details:', errorInfo);

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorTracker(errorInfo);
    }

    return args;
  },
});

export default runtimePlugin;
