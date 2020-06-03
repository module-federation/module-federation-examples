# Angular Universal

This example demos a basic host/remote application with TypeScript.

# Running Demo

Run `yarn start`. This will build and serve both `host` and `client` on ports 4000 and 5000 respectively.

- [localhost:4000](http://localhost:4000/) – Angular host-app with SSR
- [localhost:5000](http://localhost:5000/) – Standalone client app

note: If you are running this example for the first time, run `ngcc` at the repo root before start.

## Known issues

- Hot reloading – work in progress
- Development mode breaks SSR build
- Standard `ng build` doesn't work
- Package `@ngtools/webpack` has been patched, as it doesn't support Webpack 5
- Webpack 5 beta 16 is patched because of [https://github.com/webpack/webpack/issues/10830](https://github.com/webpack/webpack/issues/10830)
- Client bundle size
- Warnings

<img src="https://ssl.google-analytics.com/collect?v=1&ec=email&ea=open&t=event&tid=UA-167830327-1&cid=555&dp=/email/Angular&dt=ModuleFederationExamples">
