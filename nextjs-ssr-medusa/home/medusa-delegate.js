import medusaClient from "@module-federation/dashboard-plugin/medusa-delegate";
//Logging the delegate being called for the resourceQuery from the webpack runtime ID
console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__,'process host', process.env.CURRENT_HOST);
//Getting the current request by getting the 'remote' query parameter using URLSearchParams
const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
const queryEnv = new URLSearchParams(__resourceQuery).get('env');
const queryToken = new URLSearchParams(__resourceQuery).get('token');
console.log('current request', currentRequest);
export default medusaClient({
  // currentHost: process.env.CURRENT_HOST,
  remote: currentRequest,
  environment: queryEnv,
  token: queryToken,
  fetch: fetch,
});
