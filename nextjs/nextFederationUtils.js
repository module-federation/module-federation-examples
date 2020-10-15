const path = require("path");
const fs = require("fs");

module.exports.nextServerRemote = (remoteObject) => {
  return Object.entries(remoteObject).reduce((acc, [name, config]) => {
    acc[name] = {
      external: `external new Promise(res => {
      let remote
      try {
      remote = require('${config}')['${name}']
      } catch (e) {
      delete require.cache['${config}']
      remote = require('${config}')['${name}']
      }
      const proxy = {get:(request)=> remote.get(request),init:(arg)=>{try {return remote.init(arg)} catch(e){console.log('remote container already initialized')}}}
      res(proxy)
      })`,
    };
    return acc;
  }, {});
};

module.exports.shareReact = () => {
  const React = require("react");
  const reactPath = path.dirname(__non_webpack_require__.resolve("react"));
  const umdReact =
    process.env.NODE_ENV === "production"
      ? path.join(reactPath, "umd/react.production.js")
      : path.join(reactPath, "umd/react.development.js");
  const stringReact = fs.readFileSync(umdReact, "utf-8");
  return React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: stringReact,
    },
  });
};
