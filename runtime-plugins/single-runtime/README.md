# Single Runtime Plugin Example

This example demonstrates how the Module Federation single runtime plugin works to ensure shared dependencies use a single runtime instance when a remote application loads components from its host.

## Running the Demo

1. Start both applications:
   ```bash
   # In app1 directory
   npm start # Runs on port 3001

   # In app2 directory
   npm start # Runs on port 3002
   ```

## What to Observe

### On App1 (port 3001)
When you browse to `localhost:3001`, observe the Runtime Information section:
- Notice that App2's module is using `app1_partial.js` instead of `remoteEntry.js`
- This happens because App2 lists App1 as a remote, and to avoid loading conflicting runtimes from the same build (App1), the plugin switches to using the partial bundle
- The partial bundle ensures App1's components use the host's runtime when loaded in App2

### On App2 (port 3002)
When you browse to `localhost:3002`, observe the Runtime Information section:
- When loading App1's remote components, it uses the standard `remoteEntry.js`
- This is because App1 is not the host in this context
- Since there's no host/remote pattern here, App1 needs its full standalone runtime to operate

## How it Works

The single runtime plugin prevents runtime conflicts by:
1. When a remote app loads components from its host:
   - The plugin detects this pattern and switches to using `{hostName}_partial.js`
   - This ensures the remote uses the host's runtime instead of loading a duplicate
   - Prevents conflicts in singleton modules and shared dependencies

2. When loading other remotes:
   - Uses the standard `remoteEntry.js`
   - No runtime conflict possible since it's loading from a different build

### Shared Dependencies
Both apps share:
- React (singleton)
- ReactDOM (singleton)
- Lodash (version matching)

The single runtime plugin ensures these shared dependencies maintain their singleton status by preventing duplicate runtime loading from the same build. Also prevents collisions caused by loading 2 runtimes from the same build at once
