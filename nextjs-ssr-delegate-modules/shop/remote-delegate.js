import { importDelegatedModule } from '@module-federation/utilities';

module.exports = new Promise((resolve, reject) => {
  //Logging the delegate being called for the resourceQuery from the webpack runtime ID
  console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__);
  //Getting the current request by getting the 'remote' query parameter using URLSearchParams
  const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
  //Splitting the currentRequest using "@" as the separator and assigning the values to "global" and "url"
  const [global, url] = currentRequest.split('@');
  //importing the delegated module
  importDelegatedModule({
    global,
    url,
  })
    .then(async (remote) => {
      //resolving the remote
      resolve(remote)
    })
    .catch((err) => {
      //catching the error and rejecting it
      reject(err);
    });
});

