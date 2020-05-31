const React = require("react");
const { renderToString } = require("react-dom/server");

module.exports = function createEdgeChunks(app, modules) {
  modules.forEach((mod, index) => {
    const modId = index + 1;
    app.use(`/${modId}.edge-handler.js`, (req, res) => {
      const props = (req.query.props && JSON.parse(req.query.props)) || {};

      console.log(mod.Component);
      const html = renderToString(React.createElement(mod.Component, props));

      res.setHeader("Content-Type", "text/javascript");
      res.status(200).send(`
exports.id = ${modId};
exports.ids = [${modId}];
exports.modules = {

/***/ ${modId}:
/***/ ((module) => {
const React = require("react");
const children = require("html-react-parser")(${JSON.stringify(html)});
module.exports = () => React.createElement(React.Fragment, {}, children);


/***/ })

};
;
      `);
    });
  });
};
