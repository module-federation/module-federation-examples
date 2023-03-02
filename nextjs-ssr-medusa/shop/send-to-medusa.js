const mergeGraphs = require('@module-federation/dashboard-plugin/mergeGraphs');
const fs = require('fs')
const hostGraph = require('./.next/client-dashboard.json')
const childGraph = require('./.next/client-dashboard-child.json')
const fetch = require("node-fetch");


const mergedGraph = mergeGraphs(hostGraph, childGraph);
fs.writeFileSync('./dashboard-merged.json', JSON.stringify(mergedGraph, null, 2))

fetch('https://api.medusa.codes/update?token=8372db21-6633-4a62-8896-34538c082713', {
  method: 'POST',
  body: mergedGraph,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  }
}).catch(err => {
  throw new Error(err)
})
