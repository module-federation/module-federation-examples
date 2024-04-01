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
