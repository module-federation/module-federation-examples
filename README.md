# Module Federation Examples

This repository is to showcase examples of how Webpack 5's new Module Federation can be used.

### We are building a bigger ecosystem

|                                                                                                                [Rspack](https://github.com/web-infra-dev/rspack)                                                                                                                 |                                                 <a href="https://github.com/web-infra-dev/rspack" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Rspack-1850.png" width="400" /></a>                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                             [Modern.js](https://github.com/web-infra-dev/modern.js)                                                                                                              |                                               <a href="https://github.com/web-infra-dev/modern.js" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Modern-0550.png" width="400" /></a>                                                |
|                                                                                                               [Garfish](https://github.com/web-infra-dev/garfish)                                                                                                                |                                                <a href="https://github.com/web-infra-dev/garfish" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Garfish-1630.png" width="400" /></a>                                                |
|                                                                                                                   [Oxc](https://github.com/web-infra-dev/oxc)                                                                                                                    |                                                    <a href="https://github.com/web-infra-dev/oxc" target="blank"><img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/zq-uylkvT/ljhwZthlaukjlkulzlp/Oxc-0724.png" width="400" /></a>                                                    |
| If you need **support**, consider looking at my sponsor profile [https://github.com/sponsors/ScriptedAlchemy](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https://github.com/sponsors/ScriptedAlchemy&utm_campaign=sponsor_link) |                                                                                                For companies that require consultations, contact me on twitter or email (on github profile)                                                                                                |
|                                                                                                                                   **Content**                                                                                                                                    |                                                                                                                                                                                                                                                                                            |
|                                                                                                                             **Youtube Screencasts**                                                                                                                              | [https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ&utm_campaign=youtube_playlist) |
|                                                                                                                                **New Info site**                                                                                                                                 |                                                                                                               [https://module-federation.io/](https://module-federation.io/)                                                                                                               |
|                                                                                                                                **Official Docs**                                                                                                                                 |                                [https://webpack.js.org/concepts/module-federation](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=webpack_docs&utm_medium=https://webpack.js.org/concepts/module-federation)                                |
|                                                                                                                            **Original Webpack Issue**                                                                                                                            |                              [https://github.com/webpack/webpack/issues/10352](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=merge_proposal_issue&utm_medium=https://github.com/webpack/webpack/issues/10352)                              |
|                                                                                                                                 **Medium post**                                                                                                                                  |                                                                                                          [https://link.medium.com/xzFgBBtAx6](https://link.medium.com/xzFgBBtAx6)                                                                                                          |
|                                                                                                                            **JSNation Presentation**                                                                                                                             |                                                             [https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md](https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md)                                                             |
|                                                                                                                          **Post about Dynamic Remotes**                                                                                                                          |                                                                        [https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/](https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/)                                                                        |

<p align="center"><a href="https://medusa.codes" target="_blank"><img src="https://pbs.twimg.com/media/Fcets1xXgAY3wZf?format=jpg&name=medium" width="800"/><a><p>

https://module-federation.github.io/

https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ

https://scriptedalchemy.medium.com/

# Examples
- [advanced-apis](advanced-api) -- ✅ rspack | ✅ webpack <br> More Examples using advanced apis or concepts
  - [automatic-vendor-sharing](advanced-api/automatic-vendor-sharing) -- ✅ rspack | ✅ webpack <br> This example demos automatic-vendor-sharing, each host/remote will share all vendors possible
  - [dynamic-remotes](advanced-api/dynamic-remotes) -- ✅ rspack | ✅ webpack <br> Basic demo of a host app loading remote components and dynamically sharing vendor code with unknown remotes, or without a Federation Plugin
- [angular-universal-ssr](angular-universal-ssr) -- ❌ rspack | ✅ webpack <br> Angular Universal SSR with Module Federation
- [angular11-microfrontends-ngrx](angular11-microfrontends-ngrx) -- ❌ rspack | ✅ webpack <br> Module Federation with Angular 11, featuring shared modules and NgRx
- [angular11-microfrontends-ngxs](angular11-microfrontends-ngxs) -- ❌ rspack | ✅ webpack <br> Module Federation with Angular 11, featuring shared modules and NGXS.
- [angular14-react](angular14-react) -- ✅ rspack | ✅ webpack <br> Module Federation for Angular 14 and React 18 apps, with NGXS state management and shared state between Angular and React modules.
- [angular15-microfrontends-lazy-components](angular15-microfrontends-lazy-components) -- ❌ rspack | ✅ webpack <br> Module Federation with Angular 15, featuring shared modules and NGXS state management
- [angular15-vue3](angular15-vue3) -- ✅ rspack | ✅ webpack <br> This project shows an example of using Webpack 5 Module Federation with Angular `15` using Vue 3 components from remote.
- [apollo-client](apollo-client) -- ❌ rspack | ✅ webpack <br> This example demonstrates using Apollo Client with Module Federation.
- [basic-host-remote](basic-host-remote) <br> Basic Host and Remote Example
- [bi-directional](bi-directional) <br> Basic Bi-directional Federation application
- [cloud](cloud) -- ❌ rspack | ✅ webpack <br> Various Cloud based Examples
- [complete-react-case](complete-react-case) -- ✅ rspack | ✅ webpack <br> A complete Module Federation Case with React.
- [comprehensive-demo-react16](comprehensive-demo-react16) -- ✅ rspack | ✅ webpack <br> Multi-framework comprehensive demo for React 16
- [comprehensive-demo-react18](comprehensive-demo-react18) -- ✅ rspack | ✅ webpack <br> Multi-framework comprehensive demo for React 18
- [cra](cra) -- ✅ rspack | ❌ webpack <br> Create React app Running with rsbuild
- [cra-react-app-rewired](cra-react-app-rewired) <br> CRA with react-app-rewired
- [css-isolation](css-isolation) -- ✅ rspack | ✅ webpack <br> Demonstration of CSS isolation between host and remote apps using Shadow DOM with Module Federation. Features 'app1' (host) loading 'app2' (remote) for CSS-isolated components.
- [different-react-versions](different-react-versions) -- ✅ rspack | ✅ webpack <br> This example demos the ability to load two separate versions of react (v16.6.3 and v16.13.1).
- [different-react-versions-16-17](different-react-versions-16-17) -- ✅ rspack | ✅ webpack <br> This example demos the ability to load two separate versions of react (16 & 17).
- [different-react-versions-16-17-typescript](different-react-versions-16-17-typescript) -- ✅ rspack | ✅ webpack <br> TypeScript example demos the ability to load two separate versions of react.
- [different-react-versions-16-18](different-react-versions-16-18) -- ✅ rspack | ✅ webpack <br> Two apps, one using React 16 and the other using React 18
- [different-react-versions-isolated](different-react-versions-isolated) -- ✅ rspack | ✅ webpack <br> This example demos host and remote applications running in isolation with two different React versions and no shared libraries
- [different-react-versions-typescript](different-react-versions-typescript) -- ❌ rspack | ✅ webpack <br> No description
- [dynamic-remotes-node](dynamic-remotes-node) -- ❌ rspack | ✅ webpack <br> Dynamic Remotes on server side with Node Federation
- [dynamic-system-host](dynamic-system-host) -- ✅ rspack | ✅ webpack <br> Runtime API based Dynamic Remote Loading
- [federated-css-mono](federated-css) -- ✅ rspack | ✅ webpack <br> Examples Federating Styles
  - [consumers-nextjs](federated-css/consumers-nextjs) -- ❌ rspack | ✅ webpack <br> NextJs apps consumes exposed components in different combinations.
  - [consumers-react](federated-css/consumers-react) -- ❌ rspack | ✅ webpack <br> React apps consumes exposed components in different combinations.
  - [expose-remotes](federated-css/expose-remotes) -- ✅ rspack | ✅ webpack <br> apps exposes components with a different types of components styling
- [federated-css-react-ssr](federated-css-react-ssr) -- ❌ rspack | ✅ webpack <br> Example of server side rendering with module federation using React 18 and different types of component styling
- [federated-library-from-cdn](federated-library-from-cdn) -- ❌ rspack | ✅ webpack <br> Basic example of two applications that share the same library served from a CDN.
- [frontend-discovery-service](frontend-discovery-service) -- ❌ rspack | ✅ webpack <br> Demonstrates running Micro Frontends with Module Federation and Frontend Service Discovery on AWS, including Blue/Green deployment for version updates.
- [genesis](genesis) <br> Vue Genesis Example
- [i18next-nextjs-react](i18next-nextjs-react) -- ❌ rspack | ✅ webpack <br> Demonstrates using dedicated i18next instances in micro frontends, enabling language change in one that affects all.
- [medusa-example](medusa-example) -- ❌ rspack | ✅ webpack <br> https://medusa.codes Demo
- [modernjs](modernjs) <br> Module Federation Example for ByteDance's Modern.js Framework.
- [nested](nested) -- ❌ rspack | ✅ webpack <br> Demonstration of loading nested remote components: 'app1' (host) async loads 'ButtonContainer' from 'app2', which in turn async loads 'Button' from 'app3'.
- [nextjs-react](nextjs-react) -- ❌ rspack | ✅ webpack <br> Module Federation with NextJS and Client-Side React Remotes
- [nextjs-ssr](nextjs-ssr) -- ❌ rspack | ✅ webpack <br> Server Side Rendering with Next.js
- [nextjs-ssr-react-query](nextjs-ssr-react-query) -- ❌ rspack | ✅ webpack <br> Server Side Rendering with Next.js and React Query
- [nextjs-v12](nextjs-v12) -- ❌ rspack | ✅ webpack <br> Next.js 12 Example
- [nextjs-v13](nextjs-v13) -- ❌ rspack | ✅ webpack <br> Next.js 13 Example
- [quasar](quasar-cli-vue3-webpack-javascript) <br> Quasar Framework Example
- [react-16-17-18-ssr](react-16-17-18-ssr) -- ❌ rspack | ✅ webpack <br> React 16, 17, 18 SSR
- [react-18-code-splitting](react-18-code-splitting) -- ❌ rspack | ✅ webpack <br> React 18 Code Splitting
- [react-18-server-2-server](react-18-server-2-server) -- ❌ rspack | ✅ webpack <br> Server 2 Server React 18
- [react-ssr](react-18-ssr) -- ❌ rspack | ✅ webpack <br> React 18 SSR
- [react-in-vue](react-in-vue) -- ❌ rspack | ✅ webpack <br> Demo of fetching a React component in a Vue app via Module Federation, showcasing two-way communication and lifecycle management.
- [react-hmr](react-livereload) -- ❌ rspack | ✅ webpack <br> LiveReload with a React app
- [react-storybook](react-storybook) <br> Storybook Example
- [redux-reducer-injection](redux-reducer-injection) -- ❌ rspack | ✅ webpack <br> Sharing a Redux store across remote apps with dynamic reducer injection; 'app1' hosts and creates the store, 'app2' injects its reducer.
- [rspack_webpack](rspack-webpack-interop) -- ✅ rspack | ✅ webpack <br> Webpack Host with [Rspack](https://rspack.dev) Remotes: App #1 as Webpack, Apps #2-#5 as [Rspack](https://rspack.dev), with coexisting webpack commands.
- [rspack_offload](rspack-webpack-offload) -- ✅ rspack | ✅ webpack <br> Speed up Webpack by offloading some workload to [rspack](https://rspack.dev)
- [runtime-plugins](runtime-plugins) -- ✅ rspack | ✅ webpack <br> Runtime Plugin Examples for Module Federation 1.5
  - [control-sharing](runtime-plugins/control-sharing) -- ✅ rspack | ✅ webpack <br> Control Sharing Panel. Lets you change share resolver in the app via GUI
- [rust-wasm](rust-wasm) -- ❌ rspack | ✅ webpack <br> Using Module Federation to federate Wasm modules across independent applications. In this demo, we will use Conways Game of Life to illustrate how Wasm can be shared.
- [self-healing](self-healing) -- ❌ rspack | ✅ webpack <br> This example demos self-healing capabilities with Module Federation. `app2` depends on and is expecting a shared dependency to be provided in `app1`.
- [server-side-render-only](server-side-render-only) -- ❌ rspack | ✅ webpack <br> Module Federation Server Side Rendering, no client side implementation
- [server-side-rendering](server-side-rendering) -- ❌ rspack | ✅ webpack <br> Example of server side rendering with module federation using React 18 and Suspense
  - [server-side-rendering_shell](server-side-rendering/shell) -- ❌ rspack | ✅ webpack <br> React 18 architecture at scale with module federation
- [shared-context](shared-context) -- ❌ rspack | ✅ webpack <br> This example demos a host application wrapped in a ContextProvider and renders a remote component consuming the ContextProvider value.
- [shared-routes2](shared-routes2) -- ❌ rspack | ✅ webpack <br> This example demos two applications with their own sets of routes and deployments but a seamless experience for the user.
- [shared-routing](shared-routing) -- ❌ rspack | ✅ webpack <br> This example demos a basic host application loading remote component.
- [shared-store-cross-framework](shared-store-cross-framework) -- ❌ rspack | ✅ webpack <br> This example demos a Vue3 in React application which shares the same store.
- [simple-node](simple-node) -- ❌ rspack | ✅ webpack <br> Node.js Examples
- [013-styled-components](styled-components) -- ❌ rspack | ✅ webpack <br> This sample shows how to use [Styled Components](https://www.styled-components.com/) with MF and React SSR.
- [third-party-scripts](third-party-scripts) -- ❌ rspack | ✅ webpack <br> This example demos a basic host-remote application with third-party remotes or vendor code.
- [typescript-repo](typescript) -- ❌ rspack | ✅ webpack <br> This example demos a basic host/remote application with TypeScript and also streams types.
- [typescript-monorepo](typescript-monorepo) -- ❌ rspack | ✅ webpack <br> This example demos a basic host/remote application with TypeScript using yarn workspaces and using [typesVersions](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#version-selection-with-typesversions)
- [typescript-project-references](typescript-project-references) -- ❌ rspack | ✅ webpack <br> This example demos a basic host/remote application with TypeScript using [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html).
- [typescript-react-fallback](typescript-react-fallback) -- ❌ rspack | ✅ webpack <br> This example demos a basic host/remote application with TypeScript using [Project References], to show how to render another remote as a fallback if a remote fails to render.
- [ts-monorepo](typescript-react-monorepo) <br> This example demos a basic host/remote application with TypeScript and also streams types.
- [typescript-react-monorepo-test](typescript-react-monorepo-test) <br> This example demos a basic host/remote application with TypeScript and also streams types.
- [umd-federation](umd-federation) -- ❌ rspack | ✅ webpack <br> UMD output target for Module Federation
- [vite-react-microfrontends](vite-react-microfrontends) <br> Vite React Microfrontends
- [vite-react-simple](vite-react-simple) -- ❌ rspack | ✅ webpack <br> Vite & Webpack React Simple
- [vite-svelte-microfrontends](vite-svelte-microfrontends) <br> Svelte Vite Based Microfrontends
- [vite-vue-microfrontends](vite-vue-microfrontends) <br> Vue Vite Based Microfrontends
- [vue-cli](vue-cli) <br> Vue CLI Examples
- [vue2-in-vue3](vue2-in-vue3) -- ❌ rspack | ✅ webpack <br> This example demos a vue3 application loading remote vue2 component.`vue3` app depends on a component exposed by `vue2` app.
- [vue3-cli-demo](vue3-cli-demo) <br> Vue 3 using vue-cli OR rsbuild
- [vue3-demo](vue3-demo) -- ❌ rspack | ✅ webpack <br> This example demos consumption of federated modules from a Webpack bundle. `layout` app depends on a component exposed by `home` app.
- [vue3-demo-federation-with-vite](vue3-demo-federation-with-vite) -- ❌ rspack | ✅ webpack <br> This project is a mix of `webpack-federation` and `vite-federation`




# Check out our book

| <a href="https://module-federation.myshopify.com/products/practical-module-federation" target="_blank"><img src="./docs/MFCover.png" alt='Practical Module Federation Book' width="95%"/></a> | <a href="https://module-federation.myshopify.com/products/practical-module-federation" target="_blank">We will be actively updating this book over the next year as we learn more about best practices and what issues people are running into with Module Federation, as well as with every release of Webpack as it moves towards a release candidate and release. So with your one purchase you are buying a whole year of updates.</a> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

# Consultations

| <a href="https://calendly.com/scripted-alchemy/1-hr-group-consult" target="_blank">1 Hour group consultation</a> | \$100        |
| ---------------------------------------------------------------------------------------------------------------- | ------------ |
| <a href="https://calendly.com/scripted-alchemy/30-meeting-1-1" target="_blank">30 Min 1:1 consultation</a>       | \$60         |
| <a href="https://cb.run/WIVv" target="_blank">15 Min 1:1 consultation</a>                                        | \$30         |
| Bespoke API modifications and hands on code                                                                      | $300-$500/hr |

# Notes

The examples in this repository leverage [pnpm](https://pnpm.io/) and workspaces. To run from a git checkout locally, remove all of the proprietary example directories, ensure you have pnpm installed and run install `pnpm i` at the repo root.
You can then run `pnpm start` from any of the non-proprietary examples. Some examples may use a different command such as "dev" or "serve".

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/ModuleFederationExamplesRoot">

Module federation will work with any type of file that you're able to import, that Webpack understands how to process. It is not a JS only, or React only feature. Images, CSS, JSON, WASM, and anything else can be federated.

# Companies using Module Federation

- Netflix
- Auth0
- Best Buy
- SAP
- AWS
- SemRush
- Ford Motor Company
- JPMorgan Chase
- Microsoft
- Lululemon
- Housing.com
- VMware
- Talkdesk
- Cricket Wireless
- Reddit
- Bytedance
- Rivian (in the cars themselves)
- Realtor.com
- FICO
- Digital Ocean
- Alibaba
- Tencent
- Wayfair
- RingCentral
- Indeed
- Telia
- Beamery
- Amazon
- Sony
- Paypal
- OVO Energy
- MGM
- Lowes
- Home Depot
- Epic Games
- ExpediaGroup
- Verizon
- MindTickle
- Experian
- Herodevs
- CloudFlare
- Cisco
- Business Insider
- Box.com
- AfterPay
- OLX
- Shopify
- adidas
- and many more I cant remember

# Contribution to this repo

You decided to contribute to this project? Great, thanks a lot for pushing it!
