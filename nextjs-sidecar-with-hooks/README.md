# Using Module Federation in Next.js (before Webpack 5 support)

You can both expose code and consume code with Module Federation using any version of Next.js. Even before there is support for Webpack 5 in Next.js. In this example, we'll expose a Header component from our Next.js app using module federation. Then we'll consume that same component from our sidecar remote.

# Exposing Components

We use a `sidecar` application located in a sub-directory within the Next.js application that has Webpack 5 installed. The sidecar then references any shared components relative to the parent directory.

It then creates a `dist` directory containing the Module Federation `remoteEntry.js` and all the associated code. This dist directory can then be deployed anywhere as long as it matches the `publicPath` in the `webpack.config.js`.

# Importing Components

Next.js applications can also consume federated modules with ease using some simple shim code.

# Migration When Next.js Supports Webpack 5

Once Next.js supports Webpack 5 the sidecar application can be removed, and the shim code used to support importing components can also be removed.

# Running the example

Build and run the code in two seperate terminals

```shell
yarn && yarn dev
```

```shell
cd sidecar
yarn && yarn build && yarn start
```