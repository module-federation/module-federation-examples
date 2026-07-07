# federated-library-from-cdn

![Screenshot_2023-08-29_13-57-10](https://github.com/marcofalcone/federated-library-from-cdn/assets/61291681/6347c456-3034-478a-8a88-ca3c1713f24e)

## Basic example of two applications that share the same library served from a CDN.

## Usage

### Install packages

```
npm i
```

### Serve the two apps locally to see the federated button component from the CDN

```
npm run start
```

### or

### Run dev server for remote library to make changes (localHost:3002)

```
npm run dev
```

### Create library federation bundle (remoteEntry.js) and deploy the dist folder on your CDN of choice

```
npm run build
```

### Insert library bundle endpoint "http//yourendpoint/remoteEntry.js" into the "remoteUrl" variable in the webpack config file and serve the two apps to see the federated component from the cdn (app1 on localHost:3000, app2 on localHost:3001)

```
npm run start
```

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=federated-library-from-cdn&ep.readme_path=federated-library-from-cdn%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Ffederated-library-from-cdn&dt=ModuleFederationExamples+federated-library-from-cdn%2FREADME.md">
