import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FederationRuntimePlugin, init, loadRemote } from '@module-federation/enhanced/runtime';

const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'my-runtime-plugin',
    beforeInit(args) {
      console.log('beforeInit: ', args);
      return args;
    },
    beforeRequest(args) {
      console.log('beforeRequest: ', args);
      return args;
    },

    // loadRemoteSnapshot(args) {
    //   console.log("loadRemoteSnapshot: ", args);
    // if (args.manifestJson && (args.manifestJson.metaData as any).publicPath.includes("placeholder")) {
    //   (args.manifestJson.metaData as any).publicPath = (args.manifestJson.metaData as any).publicPath.replace(
    //     "placeholder",
    //     args.manifestUrl?.split("/")[2].split(":")[0],
    //   );
    // }
    // if ((args.remoteSnapshot as any).publicPath.includes("placeholder")) {
    //   (args.remoteSnapshot as any).publicPath = (args.remoteSnapshot as any).publicPath.replace(
    //     "placeholder",
    //     args.manifestUrl?.split("/")[2].split(":")[0],
    //   );
    // }
    //   return args;
    //},

    afterResolve(args) {
      console.log('afterResolve', args);
      return args;
    },
    onLoad(args) {
      console.log('onLoad: ', args);
      return args;
    },
    async loadShare(args) {
      console.log('loadShare:', args);
      return args;
    },
    async beforeLoadShare(args) {
      console.log('beforeloadShare:', args);
      return args;
    },
    // async initContainer(args) {
    //  console.log("initContainer: ", args);
    // args.origin.snapshotHandler.manifestCache.forEach((manifest, index) => {
    //   console.log(args);
    //   manifest.metaData.publicPath = manifest.metaData.publicPath.replace(
    //     "placeholder",
    //     args.remoteInfo.entry.split("/")[2].split(":")[0],
    //   );
    //   console.log("manifest: ", manifest);
    // });
    // console.log("args after", args);
    //return args;
    //},
  };
};

export async function renderApp() {
  init({
    name: 'runhost',
    remotes: [{ name: '@app_02', entry: 'http://localhost:3001/mf-manifest.json', alias: 'a2' }],
    plugins: [runtimePlugin()],
  });

  loadRemote('a2/pi').then(module => {
    console.log('results from pi in app02: ', (module as any).default());
  });
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
