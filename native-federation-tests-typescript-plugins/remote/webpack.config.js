const path = require('path')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const {NativeFederationTypeScriptRemote} = require('@module-federation/native-federation-typescript/webpack')
const { NativeFederationTestsRemote } = require('@module-federation/native-federation-tests/webpack')

const deps = require('./package.json').dependencies;

const moduleFederationConfig = {
  name: 'moduleFederationTypescript',
  filename: 'remoteEntry.js',
  exposes: {
    './button': './src/components/button',
    './anotherButton': './src/components/anotherButton'
  },
  shared: {
    ...deps,
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
  },
}

module.exports = () => ({
  entry: './src/index',
  cache: false,
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'auto',
    clean: true
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    liveReload: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin(moduleFederationConfig),
    NativeFederationTypeScriptRemote({moduleFederationConfig}),
    NativeFederationTestsRemote({ moduleFederationConfig, additionalBundlerConfig: {format: 'esm'}})
  ]
})