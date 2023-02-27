const mergeGraphs = require('@module-federation/dashboard-plugin/mergeGraphs');
const fs = require('fs')
const hostGraph = require('./.next/dashboard.json')
const childGraph = require('./.next/dashboard-child.json')
const fetch = require("node-fetch");


// const mergedGraph = mergeGraphs(hostGraph, childGraph)

const mergedGraph = fs.readFileSync('./dashboard-merged.json', 'utf-8')

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
