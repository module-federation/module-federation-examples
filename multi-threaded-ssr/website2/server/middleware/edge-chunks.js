import * as React from "react";
import { renderToString } from "react-dom/server";

export default function createEdgeChunks(app, modules) {
  chunks.forEach((mod, index) => {
    const modId = index + 1;
    app.use(`${modId}.edge-handler.js`, (req, res) => {
      const props = (req.query.props && JSON.parse(req.query.props)) || {};

      const Component = mod.Component;
      const html = renderToString(<Component {...props} />);

      res.status(200).send(`
exports.id = ${modId};
exports.ids = [${modId}];
exports.modules = {

/***/ ${modId}:
/***/ ((module) => {

// TODO: Wrap in react component
module.exports = ${JSON.stringify(html)};


/***/ })

};
;
      `);
    });
  });
}
