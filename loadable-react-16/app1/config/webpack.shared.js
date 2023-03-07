/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',

  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = webpackConfig;
