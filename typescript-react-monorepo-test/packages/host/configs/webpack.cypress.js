const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },

  output: {
    publicPath: 'auto',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // add |ts
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      'Remote/Button': path.resolve(__dirname, '../../remote/src/components/Button'),
    },
  },
};
