# Isolate Shared Dependencies

Sharing dependencies means sharing the state too. However, this can be troublesome when using libraries that rely on the singleton pattern. For instance, Vue 2.x exposes a global instance, which can cause conflicts when multiple containers register global components.

In scenarios where multiple containers are loaded but minimal or no interaction is expected between them (following a parent-child relationship), sharing state is undesirable, but sharing chunks of code is especially useful to save network usage and reduce loading speeds. This plugin implements a PoC of isolating shared dependencies for individual containers.

## Features

- Share dependencies (code) but not their state, reducing the network usage and loading speed
- Ability to specify which dependencies should be isolated
- All containers must use the plugin, even if they don't isolate any dependencies (default behaviour), otherwise a warning will be thrown and dependencies won't be isolated

## Main Components

### `./plugin/isolatePluginFactory.ts`

This is the runtime plugin that implements the isolation feature for Module Federation. Since it's not possible to pass parameters to plugins yet (see https://github.com/module-federation/universe/issues/1980), it exposes a factory that allows to pass a list of dependencies to isolate and returns a custom instance of the plugin.

### `./app1`

Parent application. It is expected to be the first application to be loaded. In that case, it will share all the necessary runtime dependencies (vue + shared-lib + shared-lib-2). It won't isolate any of them, so it will use the shared instance. It loads app2.

### `./app2`

Child application. It is expected to be the second application to be loaded. It will isolate `shared-lib`, which means it won't use the shared instance of the library. It loads app3.

### `./app3`

Child application. It is expected to be the last application to be loaded. As app1, it won't isolate any dependency, so it should share instances with app1.

### `./shared-lib`

Shared library. When it is instantiated, it generates a random ID that is kept for future calls. It allows to easily check which instance of the library is being run in each application.

### `./shared-lib-2`

Shared library. It is used transitively by shared-lib and directly by all the applications. Similar to shared-lib, it generates a random ID to identify the instance.

# Running Demo

Run `pnpm run start`. This will build and serve both `app1`, `app2` and `app3` on ports 3001, 3002 and 3003 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
- [localhost:3003](http://localhost:3003/)

# Running Cypress E2E Tests

Not implemented yet