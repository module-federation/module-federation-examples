# Module Federation with Webpack 5 in React

This repo uses Webpack5 Module Federation plugin to build a React microfrontend

## Get started

```shell
yarn install
yarn start
```

Host runs at http://localhost:3000 (live reload only)
Remote1 runs at http://localhost:3001 (HMR supported)

## How it works

Host is the shell app which imports Remote1. Host is hosted on port 3000.

Remote1 is hosted port 3001 and exposes 2 components Heading and Button.

The exposed components are used in Host.

The project also uses React Router to show that routing logic works just like a normal React app
