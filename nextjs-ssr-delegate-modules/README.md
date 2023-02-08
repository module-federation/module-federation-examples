# Getting Started
To start, run yarn start and navigate to http://localhost:3001 or another available port.

# Consulting Services Available
For consultations, contact Zackary Jackson at zackary.l.jackson@gmail.com or via Twitter at @ScriptedAlchemy.

# How it Works
This implementation uses our proprietary Software Streams technology to stream commonjs modules at runtime to consuming apps. This technology has not been made publicly available, and we have kept it a guarded secret for the past 2 years despite using it for multiple backend systems.

For the client side, we have enhanced federation interfaces to ensure that the top-level API works as expected, allowing for import(), require, and import from to function. While the serverside has been tested, only import() has been tested on the client side.

An alpha version of Software Streams was leaked a year and a half ago, but it contains security flaws. The federation group has since spent a significant amount of time enhancing the technology. In the future, after the plugin exits beta, we plan to implement stream encryption to prevent code manipulation. This will be achieved through a cypher key known to both the consumer and remote at build time.

We are also exploring the possibility of executing streamed software in a WASM isolate that has limited access to host resources, making it possible to execute untrusted code.

For now, we strongly advise federating only trusted software between servers.

## Security
To ensure proper functionality, the commonjs modules are exposed via _next/static/ssr*. For security reasons, it is recommended to have a CDN or middleware in place that only allows access to this path from an internal network or VPN. Exposing server code publicly through this path can pose a security risk as process.browser is not applied to tree shake server secrets.

## Context

We have three Next.js applications:

- `checkout` on port 3000
- `home` on port 3001
- `shop` on port 3002

These applications use omnidirectional routing, enabling pages and components to be federated between them like in a SPA.

The use of hooks ensures that multiple copies of React are not loaded into the server or client. The omnidirectional routing also hooks into webpack federation loading functions, allowing dynamic loading of remotes using the same functions as those used for static imports (e.g. home/title).

### Sharing

Next.js has pre-shared internal modules through `@module-federation/nextjs-mf`. However, you need to share React through the plugin to ensure that the shared scope runtime requirements are included. Modules that are shared extra must be processed by the plugin, which reconfigures sharing to work within the limitations of Next.js.

The sharing limit is due to Next.js having no async boundary, making it impossible to "pause" the application while webpack manages the shared scope. The author is exploring new methods that could potentially solve the module sharing issue in Next.js, but this is a complex challenge requiring extensive knowledge of webpack and federation within the module graph.

# Delegate Modules

Delegate modules in module federation offer a flexible solution for creating custom connection code between federated modules.
Compared to using the promise `new Promise syntax`, delegate modules are bundled into webpack and can utilize `require` and `import` statements.
This makes them ideal for handling complex requirements such as loading remote modules or customizing the federation API.
However, it's important to note that delegate modules are an advanced feature and may not be necessary for the majority of users.
