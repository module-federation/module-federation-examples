module.exports = [
  {
    test: /\.scss$/,
    use: ['raw-loader', 'sass-loader'],
  },
  {
    test: /\.css$/,
    loader: 'raw-loader',
  },
  {
    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
    loader: '@ngtools/webpack',
  },
  {
    test: /\.html$/,
    loader: 'raw-loader',
  },
];
