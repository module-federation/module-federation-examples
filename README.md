# Module Federation Examples

This repository is to showcase examples on Webpack 5's new Module Federation can be used.

| If you need **support**, consider looking at my sponsor profile [https://github.com/sponsors/ScriptedAlchemy](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https://github.com/sponsors/ScriptedAlchemy&utm_campaign=sponsor_link) | For companies that require consultations, contact me on twitter or email (on github profile)                                                                                                                                                                                               |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Youtube Screencasts**                                                                                                                                                                                                                                                          | [https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ&utm_campaign=youtube_playlist) |
| **Info site**                                                                                                                                                                                                                                                                    | [https://module-federation.github.io/](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=github_pages&utm_medium=https://module-federation.github.io/)                                                                                         |
| **Official Docs**                                                                                                                                                                                                                                                                | [https://webpack.js.org/concepts/module-federation](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=webpack_docs&utm_medium=https://webpack.js.org/concepts/module-federation)                                                               |
| **Original Webpack Issue**                                                                                                                                                                                                                                                       | [https://github.com/webpack/webpack/issues/10352](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=merge_proposal_issue&utm_medium=https://github.com/webpack/webpack/issues/10352)                                                           |
| **Medium post**                                                                                                                                                                                                                                                                  | [https://link.medium.com/xzFgBBtAx6](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=game_changer_medium_post&utm_medium=https://link.medium.com/xzFgBBtAx6)                                                                                 |
| **JSNation Presentation**                                                                                                                                                                                                                                                        | https://github.com/sokra/slides/blob/master/content/ModuleFederationWebpack5.md                                                                                                                                                                                                            |

# Check out our book

| <a href="https://module-federation.myshopify.com/products/practical-module-federation" target="_blank"><img src="./docs/MFCover.png" alt='Practical Module Federation Book' width="95%"/></a> | <a href="https://module-federation.myshopify.com/products/practical-module-federation" target="_blank">We will be actively updating this book over the next year as we learn more about best practices and what issues people are running into with Module Federation, as well as with every release of Webpack as it moves towards a release candidate and release. So with your one purchase you are buying a whole year of updates.</a> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |


# Consultations

| <a href="https://calendly.com/scripted-alchemy/1-hr-group-consult" target="_blank">1 Hour group consultation</a> | $100                                                                                                                                                                                                                             |
|------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <a href="https://calendly.com/scripted-alchemy/30-meeting-1-1" target="_blank">30 Min 1:1 consultation</a>       | $60                                                                                                                                                                                                                              |
| <a href="https://calendly.com/scripted-alchemy/30-meeting-1-1" target="_blank">15 Min 1:1 consultation</a>       | $30                                                                                                                                                                                                                              |
| Bespoke API modifications and hands on code                                                                      | $300-%500                                                                                                                                                                                                                        |
| **Original Webpack Issue**                                                                                       | [https://github.com/webpack/webpack/issues/10352](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=merge_proposal_issue&utm_medium=https://github.com/webpack/webpack/issues/10352) |
| **Medium post**                                                                                                  | [https://link.medium.com/xzFgBBtAx6](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=game_changer_medium_post&utm_medium=https://link.medium.com/xzFgBBtAx6)                       |
| **JSNation Presentation**                                                                                        |                                                                                                                                                                                                                                  |


  
# Examples

> Legend:
>
> - ⚠️: In Progress/Incomplete
> - 🔒: Depends on proprietary code that isn't free.

- [x] [Advanced API](./advanced-api) &mdash; showcasing advanced API use, also seen in other examples
- [x] [Basic Host-Remote](./basic-host-remote/README.md) &mdash; App 1 consumes remote components from App2.
- [x] [Startup Code](./startup-code/README.md) &mdash; Advanced implementation that attaches initialization code to the remote container itself. Useful for dynamically setting publicPath in the remote.
- [x] [Bi-Directional Hosts](./bi-directional/README.md) &mdash; App1 consumes App2 components; App2 consumes App1 components.
- [x] [Self-Healing](./self-healing/README.md) &mdash; Fallback to remote apps vendors if a dependency fails to load.
- [x] ⚠️ [Server-Side Rendering](./server-side-rendering/README.md) &mdash; App1 and App2 with SSR (Broken because of @loadable/component - check readme in demo.
- [x] [Server-Side Rendering (simplified)](./server-side-render-only/README.md) &mdash; Less complex boilerplate.
- [x] [Multi UI Framework Federation](./comprehensive-demo/README.md) &mdash; Multiple Apps in different technologies federated.
- [x] [Dynamic System Host](./dynamic-system-host/README.md) &mdash; Swap between remotes at runtime.
- [x] [Redux Reducer Injection](./redux-reducer-injection/README.md) &mdash; Dynamically inject reducers to host store at runtime.
- [x] [Shared Routes](./shared-routes2) &mdash; Compose federated routes for a seamless user experience.
- [x] [Nested Components](./nested/README.md) &mdash; Nested remote components.
- [x] [Share Context Provider](./shared-context/README.md) &mdash; App1 and App2 with shared Context Provider.
- [x] [Federation Dashboard Example](./dashboard-example/README.md) &mdash; Single example implementing [Module Federation Dashboard](https://www.npmjs.com/package/@module-federation/dashboard-plugin)
- [x] 🔒 [Streaming Federated Code](./streamed-federation/README.md) &mdash; App1 and federated-middleware deploy to s3. App1 then stream's federated code directly from S3
- [x] Non-UI Module
- [x] [Routing](./shared-routing/README.md) &mdash; An example of sharing router context. Also worth looking at - [Routing 2](./shared-routes2/README.md)
- [x] [Version Discrepancy](./version-discrepancy/README.md) &mdash; Federated apps depending on different versions of a dependency without side-effects.
- [x] [TypeScript](./typescript/README.md) &mdash; Simple host/remote example using TypeScript.
- [x] [Angular Universal](./angular-universal-ssr/README.md) &mdash; Remote and Host app with SSR, lazy modules and components.
- [x] [NextJS Sidecar Build](./nextjs-sidecar/README.md) &mdash; Sidecar build to enable module-federation alongside Next codebases
- [x] ⚠️ [NextJS](./nextjs/README.md) &mdash; Operation, with workarounds. v10 will support async
- [x] [Building A Plugin-based Workflow Designer With Angular and Module Federation](https://github.com/manfredsteyer/module-federation-with-angular-dynamic-workflow-designer) &mdash; External Example
- [x] [Vue.js](./vue3-demo/README.md) &mdash; Simple host/remote (render function / sfc) example using Vue 3.0.

# Notes

To run from a git checkout locally, remove all of the proprietary example directories and then run `yarn` at the repo root.
You can then run `yarn && yarn start` from any of the non-proprietary examples.

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/ModuleFederationExamplesRoot">

Module federation will work with any type of file that youre able to import, that webpack underestands how to process. It is not a JS only, or react only feature. Images, CSS, JSON, WASM, and anything else can be federated.
