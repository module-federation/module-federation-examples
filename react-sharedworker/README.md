# react-sharedworker

Using Webpack Module Federation in SharedWorker

Federated module (defined under `module` folder), can be consumed by main thread in host application (defined under `host` folder), and it also can be consumed by worker thread.

## How to run

```
yarn
yarn start:module
yarn start:host
```

[Open browser](http://localhost:3000) and observe error in console.

![shared worker](./image.png)

## How to work

1. Use SharedWorker instead of Worker in host application
2. Dynamically import bootstrap file in worker thread
3. Use promise based dynamic remotes `host/webpack.host-config.js`
4. Use multiple entry points in webpack config `module/webpack.module-config.js`

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=react-sharedworker&ep.readme_path=react-sharedworker%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Freact-sharedworker&dt=ModuleFederationExamples+react-sharedworker%2FREADME.md">
