# Dynamic Remotes with Synchronous Imports - Advanced Example

> **What makes this example unique**: This demonstrates how to use **runtime plugins** to dynamically change remote URLs while maintaining **synchronous imports** (like `import WidgetRemote from 'app2/Widget'`) instead of dynamic imports.

## 🎯 Core Concept

This example showcases an advanced Module Federation pattern that combines:
- **Dynamic remote URL resolution** - Change remote URLs at runtime
- **Synchronous import syntax** - Use static imports that feel like local modules
- **Runtime plugins** - Modify remote configurations before module loading
- **Fallback mechanisms** - Handle remote failures gracefully
- **Modern React patterns** - React 18, TypeScript, error boundaries

## 🧩 Architecture Overview

```
┌─────────────────┐    Runtime Plugin     ┌─────────────────┐
│   App 1 (Host)  │ ◄─────────────────────► │ Dynamic Remote  │
│                 │                        │   Resolution    │
│ import Widget   │                        │                 │
│ from 'app2/...' │                        │ window.app2Url  │
└─────────────────┘                        └─────────────────┘
         │                                          │
         │                                          ▼
         │                                 ┌─────────────────┐
         └─────────────────────────────────► App 2 (Remote) │
                                           │                 │
                                           │ Exposes Widget  │
                                           └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- pnpm (recommended) or npm/yarn

### Installation & Running

```bash
# Install dependencies
pnpm install

# Start both applications in development mode
pnpm start

# Or run individually:
pnpm --filter dynamic-remotes-synchronous-imports_app1 start
pnpm --filter dynamic-remotes-synchronous-imports_app2 start
```

### Access the Applications
- **Host Application (App 1)**: [http://localhost:3001](http://localhost:3001)
- **Remote Application (App 2)**: [http://localhost:3002](http://localhost:3002)

## 🔍 What You'll See

1. **Local Component**: A widget from App 1 with modern React features
2. **Remote Component**: A widget dynamically loaded from App 2 using synchronous import syntax
3. **Shared Dependencies**: Both apps share React and moment.js efficiently
4. **Error Handling**: Comprehensive error boundaries and fallback UI
5. **Debug Information**: Real-time configuration and state monitoring

## 💡 Why Synchronous Imports with Dynamic Remotes?

### Traditional Dynamic Imports
```javascript
// ❌ Traditional approach - requires dynamic import syntax
const RemoteComponent = React.lazy(() => import('app2/Widget'));
```

### This Example's Approach
```javascript
// ✅ Our approach - looks and feels like a local import
import WidgetRemote from 'app2/Widget';
```

### Key Benefits

1. **Developer Experience**: 
   - Familiar import syntax
   - Better IDE support and autocomplete
   - Easier to refactor and maintain

2. **Type Safety**: 
   - Static analysis works correctly
   - TypeScript integration is seamless
   - Compile-time checks for remote modules

3. **Performance**: 
   - No additional lazy loading overhead
   - Better tree shaking
   - Optimized bundling

4. **Runtime Flexibility**: 
   - URL resolution happens at runtime
   - Easy environment switching
   - Dynamic configuration without code changes

## 🔧 How It Works: The Runtime Plugin Magic

### Step 1: Configuration with Placeholders

```javascript
// moduleConfig.js
const app2Module = {
  name: 'app2',
  federationConfig: 'app2@[window.app2Url]/remoteEntry.js'
  //                      ^^^^^^^^^^^^^
  //                 Placeholder for runtime resolution
};
```

### Step 2: Runtime Plugin Resolution

```javascript
// runtimePlugin.js
const getDynamicRemotePlugin = () => ({
  name: 'dynamic-remote-url-plugin',
  beforeRequest: (args) => {
    // Look for window.app2Url and replace placeholder
    if (window.app2Url) {
      remote.entry = window.app2Url + '/remoteEntry.js';
    }
  }
});
```

### Step 3: Dynamic URL Setup

```javascript
// index.js - Set up before app loads
window.app2Url = '//production-server.com/app2';
// or
window.app2Url = '//localhost:3002'; // development
```

### Step 4: Synchronous Import

```javascript
// App.js - Import as if it's local!
import WidgetRemote from 'app2/Widget';

function App() {
  return (
    <div>
      <WidgetRemote /> {/* Just works! */}
    </div>
  );
}
```

## 🏗️ Project Structure

```
dynamic-remotes-synchronous-imports/
├── moduleConfig.js          # 📋 Centralized configuration
├── app1/                    # 🏠 Host application
│   ├── runtimePlugin.js     # 🔌 Dynamic URL resolution plugin
│   ├── webpack.config.js    # ⚙️ Module Federation config
│   └── src/
│       ├── App.tsx          # 🎯 Main application with remote imports
│       ├── components/
│       │   └── ErrorBoundary.tsx  # 🛡️ Error handling
│       └── types/
│           └── module-federation.d.ts  # 📝 TypeScript definitions
└── app2/                    # 🔗 Remote application
    ├── webpack.config.js    # ⚙️ Exposes Widget component
    └── src/
        └── Widget.js        # 🧩 Federated component
```

## 🎨 Modern Features Demonstrated

### Module Federation 2.0 Enhancements
- ✅ Enhanced runtime plugins with comprehensive error handling
- ✅ Improved shared dependency management
- ✅ Manifest generation for debugging
- ✅ Hoisted federation runtime
- ✅ Better fallback mechanisms

### React 18 Features
- ✅ `createRoot` API for better performance
- ✅ Concurrent features support
- ✅ Modern hooks patterns
- ✅ Comprehensive error boundaries

### TypeScript Integration
- ✅ Type definitions for federated modules
- ✅ Runtime plugin type safety
- ✅ Development-time type checking
- ✅ Autocomplete for remote modules

### Developer Experience
- ✅ Hot module replacement
- ✅ Debug utilities and logging
- ✅ Configuration validation
- ✅ Real-time monitoring

## 🌍 Use Cases

This pattern is perfect when you need:

### 1. **Multi-Environment Deployments**
```javascript
// Dynamically point to different environments
window.app2Url = process.env.NODE_ENV === 'production' 
  ? '//cdn.company.com/app2'
  : '//staging.company.com/app2';
```

### 2. **A/B Testing**
```javascript
// Route users to different remote versions
window.app2Url = userInTestGroup 
  ? '//test-remotes.company.com/app2'
  : '//stable-remotes.company.com/app2';
```

### 3. **Gradual Rollouts**
```javascript
// Progressive deployment
const rolloutPercentage = getUserRolloutPercentage();
window.app2Url = rolloutPercentage < 50
  ? '//v1.company.com/app2'
  : '//v2.company.com/app2';
```

### 4. **Tenant-Specific Modules**
```javascript
// Multi-tenant applications
window.app2Url = `//tenant-${tenantId}.company.com/app2`;
```

## 🔧 Configuration Options

### Basic Setup
```javascript
// Set primary URL
window.app2Url = '//your-remote-server.com';
```

### With Fallback
```javascript
// Set primary and fallback URLs
window.app2Url = '//primary-server.com';
window.app2FallbackUrl = '//fallback-server.com';
```

### Programmatic Configuration
```javascript
import { configUtils } from './moduleConfig';

// Setup multiple remotes at once
configUtils.setupDynamicUrls({
  app2: '//server1.com',
  app3: '//server2.com'
});

// Setup fallbacks
configUtils.setupFallbackUrls({
  app2: '//fallback1.com',
  app3: '//fallback2.com'
});
```

## 🛠️ Development

### Building for Production
```bash
# Build all applications
pnpm build

# Serve built applications
pnpm serve
```

### Debugging

#### Browser Console
```javascript
// Check current configuration
window.__MF_CONFIG__.getCurrentConfig();

// Validate setup
window.__MF_CONFIG__.validateConfiguration();

// Check plugin state
window.__MF_DEBUG__.getDynamicRemotePluginState();
```

#### Development Tools
- Open browser DevTools
- Check the "Dynamic Remote Plugin" logs
- Monitor network requests for remote modules
- Use the debug panel in the application

## 🧪 Testing

### End-to-End Tests
```bash
pnpm e2e:ci
```

### Manual Testing Scenarios

1. **Normal Operation**: Both apps running, remote loads successfully
2. **Remote Unavailable**: Stop app2, verify error handling
3. **Network Issues**: Use network throttling, test retry logic
4. **URL Changes**: Modify `window.app2Url` in runtime, verify updates

## 🔍 Troubleshooting

### Common Issues

#### Remote Module Fails to Load
```
❌ Error: Loading script failed
```

**Solutions:**
1. Verify remote application is running
2. Check `window.app2Url` is set correctly
3. Ensure CORS headers are configured
4. Verify network connectivity

#### TypeScript Errors
```
❌ Cannot find module 'app2/Widget'
```

**Solutions:**
1. Ensure type definitions are in place
2. Check `tsconfig.json` includes paths
3. Restart TypeScript server

#### Shared Dependencies Issues
```
❌ Multiple React instances detected
```

**Solutions:**
1. Verify `singleton: true` in shared config
2. Check version compatibility
3. Ensure both apps use same React version

### Debug Checklist

- [ ] Remote application is running and accessible
- [ ] `window.app2Url` is set before application loads
- [ ] CORS headers allow cross-origin requests
- [ ] Shared dependencies are properly configured
- [ ] Network connectivity is working
- [ ] Browser console shows no errors

## 📚 Additional Resources

### Official Documentation
- [Module Federation Documentation](https://module-federation.io/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)

### Related Examples
- [Basic Module Federation](../../basic/host-remote/)
- [Advanced Routing](../../advanced-api/automatic-vendor-sharing/)

### Community
- [Module Federation GitHub](https://github.com/module-federation/core)
- [Discord Community](https://discord.gg/module-federation)

## 🤝 Contributing

Found an issue or want to improve this example?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](../../LICENSE) file for details.

---

**⭐ Key Takeaway**: This example demonstrates that you can have the best of both worlds - the simplicity and developer experience of synchronous imports combined with the flexibility of dynamic remote URL resolution at runtime.
