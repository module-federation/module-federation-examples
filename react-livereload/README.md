# Module Federation with Webpack 5 in React

This repo uses Webpack5 Module Federation plugin to build a React microfrontend

## Get started

```shell
yarn install
pnpm run start
```

Host runs at http://localhost:3000 (live reload only)
Remote1 runs at http://localhost:3001 (HMR supported)

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

## How it works

Host is the shell app which imports Remote1. Host is hosted on port 3000.

Remote1 is hosted port 3001 and exposes 2 components Heading and Button.

The exposed components are used in Host.

The project also uses React Router to show that routing logic works just like a normal React app

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=react-livereload&ep.readme_path=react-livereload%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Freact-livereload&dt=ModuleFederationExamples+react-livereload%2FREADME.md">
