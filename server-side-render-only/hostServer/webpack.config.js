var path = require('path');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

var serverConfig = {
  entry: ['@babel/polyfill', path.resolve(__dirname, 'server.js')],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'public/server'),
    filename: 'server.js',
    publicPath: '/',
  },
  externals: ['enhanced-resolve'],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|GeneralJS|Global)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'website1',
      library: { type: 'commonjs-module' },
      filename: 'container.js',
      remotes: {
        website2: path.resolve(__dirname, '../remoteServer/public/server/container.js'),
      },
      //shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = [serverConfig];
