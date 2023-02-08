const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:8080/',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'rollup_spa',
      library: { type: 'system' },
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Header': './src/Header',
      },
      shared: require('../rollup-spa/package.json').dependencies,
    }),
    new ModuleFederationPlugin({
      name: 'var_rollup_spa',
      // libraries: [
      //   {
      //     library: { type: "var", name: "rollup_spa" },
      //     filename: "varRemoteEntry.js",
      //   },
      //   {
      //     library: { type: "system" },
      //     filename: "remoteEntry.js",
      //   }
      // ],
      library: { type: 'var', name: 'rollup_spa' },
      filename: 'varRemoteEntry.js',
      remotes: {},
      exposes: {
        './Header': './src/Header',
      },
      shared: require('../rollup-spa/package.json').dependencies,
    }),
  ],
};
