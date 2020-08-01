if (global.React) {
  module.exports = global.React;
} else if (process.browser && window.React) {
  console.log("should in browser react is there");
  module.exports = window.React;
} else if (process.browser) {
  console.log("should provide react");
  window.React = require("react");
  module.exports = window.React;
} else {
  console.log("no condiitons met");
  global.React = require("react");
  module.exports = global.React;
}
