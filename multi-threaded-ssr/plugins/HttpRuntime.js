/** @typedef {import("./FederatedRuntimePlugin")} FederatedRuntimePlugin */

module.exports = {
  initialize: `
function(remotes) {
  function doRequest(url) {
    if (url.startsWith("http://")) {
      http = require("http");
    } else if (url.startsWith("https://")) {
      http = require("https");
    }

    return new Promise(function(resolve, reject) {
      http.get(url, (resp) => {
        var data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(data);
        });
      }).on("error", (err) => {
        reject(err);
      });
    });
  }

  var tasks = [];
  for (var remote of remotes) {
    var http = false;
    if (!remote.startsWith("http://") && !remote.startsWith("https://")) {
      continue;
    }

    tasks.push(new Promise(function(resolve, reject) {
      doRequest(remote).then(function(entryData) {
        if (!entryData) {
          return;
        }
  
        var mod = global.__federated_runtime__.requireFromString(entryData, remote);
  
        mod.exports.mutateRuntime(function(remoteRuntime) {
          remoteRuntime.f.readFileVm = remoteRuntime.f.setReadFileVm(
            function(filename, encoding, callback) {
              console.log("Streaming:", filename);
  
              doRequest(filename).then(function(moduleData) {
                callback(undefined, moduleData);
              }).catch(callback);
            }
          );
        });

        resolve();
      }).catch(reject);
    }));
  }

  return Promise.all(tasks).then(() => {
    console.log("Finished initializing http federated runtime.");
  });
}
`,
  resolveFilename: `
function(path, parent) {
  if (require.cache[path]) {
    return path;
  }
}
`,
};
