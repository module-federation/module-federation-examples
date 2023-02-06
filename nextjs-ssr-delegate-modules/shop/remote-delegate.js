import { importDelegatedModule } from '@module-federation/utilities';

module.exports = new Promise((resolve, reject) => {
  console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__);
  const currentRequest = new URLSearchParams(__resourceQuery).get('remote');

  const [global, url] = currentRequest.split('@');
  importDelegatedModule({
    global,
    url,
  })
    .then(async (remote) => {
      resolve(remote)
    })
    .catch((err) => reject(err));
});
