if (global.React) {
  module.exports = global.React;
} else {
  global.React = require("react");
  module.exports = global.React;
}
