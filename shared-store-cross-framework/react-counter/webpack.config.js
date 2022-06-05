const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'react_counter',
      filename: 'remoteEntry.js',
      remotes: {
        store: `store@http://localhost:3003/remoteEntry.js`,
      },
      exposes: {
        './ReactCounter': './src/ReactCounter',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        effector: { singleton: true },
        'effector-react': { singleton: true },
        'styled-components': { singleton: true },
      },
    }),
  ],
};
