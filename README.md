# Module Federation Examples

This repository is to showcase examples on Webpack 5's new Module Federation can be used.

If you need **support**, consider looking at my sponsor profile [https://github.com/sponsors/ScriptedAlchemy](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https://github.com/sponsors/ScriptedAlchemy&utm_campaign=sponsor_link)

**Youtube Screencasts** [https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_medium=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ&utm_campaign=youtube_playlist)

**WIP info site** [https://module-federation.github.io/](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=github_pages&utm_medium=https://module-federation.github.io/)

**Official Docs** [https://webpack.js.org/concepts/module-federation](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=webpack_docs&utm_medium=https://webpack.js.org/concepts/module-federation)

**Shim for partial Webpack 4 and non webpack users** [https://gist.github.com/ScriptedAlchemy/d386a094832dbd9a04324862d26570e9](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=webpack_4_shim&utm_medium=https://gist.github.com/ScriptedAlchemy/d386a094832dbd9a04324862d26570e9)

**Original Webpack Issue** [https://github.com/webpack/webpack/issues/10352](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=merge_proposal_issue&utm_medium=https://github.com/webpack/webpack/issues/10352)

**Medium post** **Original Webpack Issue** [https://link.medium.com/xzFgBBtAx6](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=game_changer_medium_post&utm_medium=https://link.medium.com/xzFgBBtAx6)

# Examples

> Legend:
>
> - ⚠️: In Progress/Incomplete
> - 🔒: Depends on proprietary code that isn't free.

- [x] [Basic Host-Remote](./basic-host-remote/README.md) &mdash; App 1 consumes remote components from App2.
- [x] [Bi-Directional Hosts](./bi-directional/README.md) &mdash; App1 consumes App2 components; App2 consumes App1 components.
- [x] [Self-Healing](./self-healing/README.md) &mdash; Fallback to remote apps vendors if a dependency fails to load.
- [x] ⚠️ [Server-Side Rendering](./server-side-rendering/README.md) &mdash; App1 and App2 with SSR.
- [x] [Multi UI Framework Federation](./comprehensive-demo/README.md) &mdash; Multiple Apps in different technologies federated.
- [x] [Dynamic System Host](./dynamic-system-host/README.md) &mdash; Swap between remotes at runtime.
- [x] [Redux Reducer Injection](./redux-reducer-injection.md) &mdash; Dynamically inject reducers to host store at runtime.
- [x] [Shared Routes](./shared-routes2) &mdash; Compose federated routes for a seamless user experience.
- [x] [Nested Components](./nested/README.md) &mdash; Nested remote components.[link to Google!](http://google.com)
- [x] [Share Context Provider](./shared-context/README.md) &mdash; App1 and App2 with shared Context Provider.
- [x] 🔒 [Streaming Federated Code ](./streamed-federation/README.md) &mdash; App1 and federated-middleware deploy to s3. App1 then stream's federated code directly from S3
- [x] Non-UI Module
- [x] Routing
- [x] [Version Discrepancy](./version-discrepancy/README.md) &mdash; Federated apps depending on different versions of a dependency without side-effects.
- [x] [TypeScript](./typescript/README.md) &mdash; Simple host/remote example using TypeScript.
- [x] ⚠️ [Angular Universal](./angular-universal-ssr/README.md) &mdash; Remote and Host app with SSR, lazy modules and components.
- [ ] NextJS

# Notes

To run from a git checkout locally, remove all of the proprietary example directories and then run `yarn` at the repo root.
You can then run `yarn start` from any of the non-proprietary examples.

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/ModuleFederationExamplesRoot">
