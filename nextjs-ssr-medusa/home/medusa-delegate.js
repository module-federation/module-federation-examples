import medusaClient from "@module-federation/dashboard-plugin/medusa-client";
import {importDelegatedModule} from '@module-federation/utilities';
//Logging the delegate being called for the resourceQuery from the webpack runtime ID
//Getting the current request by getting the 'remote' query parameter using URLSearchParams
const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
const queryEnv = new URLSearchParams(__resourceQuery).get('env');
const queryToken = new URLSearchParams(__resourceQuery).get('token');
console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__,'process host', process.env.CURRENT_HOST,'in env', queryEnv);
console.log('current request', currentRequest);
module.exports = medusaClient({
  // currentHost: process.env.CURRENT_HOST,
  apiHost: "https://api-dev.medusa.codes",
  remote: currentRequest,
  environment: queryEnv,
  token: queryToken,
  fetch: fetch,
}).then((medusaResponse) => {
  console.log('medusa response', medusaResponse);
  let constructedContainerUrl = medusaResponse.remoteURL + medusaResponse.version+'.remoteEntry.js';
  const constructedContainerName = '_' + medusaResponse.version + medusaResponse.name;
  if(typeof window == 'undefined') {
    constructedContainerUrl = constructedContainerUrl.replace('chunks','ssr')
  }

  console.log({ constructedContainerUrl, constructedContainerName});

  return importDelegatedModule({
    global: constructedContainerName,
    url: constructedContainerUrl,
  }).then((remote) => {
    console.log('remote', remote);
    return remote;
  });
})
