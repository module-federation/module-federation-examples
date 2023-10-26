const mergeGraphs = require('@module-federation/dashboard-plugin/mergeGraphs');
const fs = require('fs')
const hostGraph = require('./.next/client-dashboard.json')
const childGraph = require('./.next/client-dashboard-child.json')
const fetch = require("node-fetch");


const mergedGraph = mergeGraphs(hostGraph, childGraph);
fs.writeFileSync('./dashboard-merged.json', JSON.stringify(mergedGraph, null, 2))

fetch('https://api-dev.medusa.codes/update?token=b99d41da-fc30-405a-94b2-f37266882959', {
  method: 'POST',
  body: JSON.stringify(mergedGraph),
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  }
}).catch(err => {
  throw new Error(err)
}).then(res => {
  console.log('data sent to medusa')
})
