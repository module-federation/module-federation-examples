const medusaClient = require('@module-federation/dashboard-plugin/medusa-delegate')

const remoteName = new URL(__resourceQuery, __webpack_base_uri__).searchParams.get("remoteName");
console.log('using delegate for medusa', remoteName, process.env.dashboardClientUrl, process.CURRENT_HOST);
module.exports = medusaClient({
  fetchClient: fetch,
  currentHost: process.CURRENT_HOST,
  remoteName,
  dashboardURL: process.env.dashboardClientUrl,
})
