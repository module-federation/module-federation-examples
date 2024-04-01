const path = require('path');

module.exports = {
  // Resolve
  // https://webpack.js.org/configuration/resolve
  resolve: {
    alias: {
      features: path.resolve('src/features'),
    },
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
};
