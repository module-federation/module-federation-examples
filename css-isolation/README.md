# Example of CSS isolation

This example shows a way to fully isolate CSS from leaking between the host and remote applications using a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) wrapper. The same idea is used in [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Basically a Web Component renders a piece of HTML within a web document which contains its own isolated DOM (a.k.a the Shadow DOM). This enables it to have separate CSS rules from the outside document. In this example the same concept is used together with Module Federation. We have two applications - `app1` (the host) and `app2` (the remote). `app1` loads `app2` using Module Federation and then, upon loading, `app2` wraps itself with a Shadow DOM container. One could say it dynamically puts itself in a Web Component to achieve CSS isolation. For more technical details check the [Isolation Technique](#isolation-technique) section below. The example builds upon the [Different React Versions in Isolation](../different-react-versions-isolated/README.md) example in the same repo.

- `app1` is the host application using one version of React and ReactDOM.
- `app2` is the remote application using a different version of React and ReactDOM. It exposes an injector function which lets the host application (app1) import it and inject it into a div element.

# Isolation Technique

Usually when creating microfrontend apps from scratch the best way to isolate their CSS is by avoiding global styles and by scoping them (manually or with a CSS-in-JS library) or using CSS modules. This, however, is not always so easy especially if you are trying to break down an old monolithic app full of global CSS into micro apps or if you are dealing with a library with global reboot rules such as Bootstrap. Then you will probably need a simpler way to cut off CSS from leaking between applications. For the CSS isolation to work a 3-part tecnique is used in this example.

### 1. Render the remote app inside a Shadow DOM container

The container will isolate the CSS rules in the remote app from leaking into the host app. Web Components use the same technique.

### 2. Put an element with style `all: initial;` around the Shadow DOM container.

By default the styles inside the Shadow DOM will inherit those coming from the Light DOM. The `all: initial` rule stops this inheritance and isolates the remote app from the host's CSS.

### 3. Configure the style loader of the remote app to inject styles inside the Shadow DOM

By default the Webpack style-loader will inject CSS in `<style>` tags into the `<head>` of the document. This means that even if the remote app is rendered in a Shadow DOM its style-loader will still load CSS globally and will affect all applications. That's why in this example a custom function is passed to the style-loader in the Webpack config of the remote app. It can run in two modes. When the remote app is embedded into the host it injects the CSS into the Shadow DOM container instead of injecting them into the `<head>`. When the remote app is running standalone the style-loader will work as normal and will inject into the `<head>`. It's also possible that some CSS styles are lazy loaded in a later moment of time that's why the implementation of the custom style-loader logic keeps a registry of all Shadow DOM containers created for the current app and in case a CSS script is lazy-loaded it appends it automatically to all of them.

## Important Notes

**For the app inside the Shadow DOM to work normally it must use React version >=17. This is so because the synthetic events used by older versions of React don't work in the Shadow DOM and the app will not re-render. The host app can use any version of React.**

**All configurations for the Shadow DOM wrapper and style-loader are only inside the remote app (app2) in `styleLoader.js`. The host app (app1) only needs to inject app2 when needed and to destroy it when it's no longer used.**

**An additional wrapping `<body>` tag is always intentionally inserted into each Shadow DOM container. This makes it possible to use global reboot CSS rules inside the remote app which usually target the `<body>` tag and its contents. This should enable the user, for example, to have two different versions of Bootstrap one in the host and one in the remote.**

**Testing such a setup with tools like Cypress is possible with some additional settings and tweaks. Make sure to consult with the testing tool's documentation.**

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/BasicRemoteHost">

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)
