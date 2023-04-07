const path = require('path')
const { NativeFederationTypeScriptRemote } = require('@module-federation/native-federation-typescript/rspack')
const { NativeFederationTestsRemote } = require('@module-federation/native-federation-tests/rspack')

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
  plugins: [
    NativeFederationTypeScriptRemote({moduleFederationConfig}),
    NativeFederationTestsRemote({ moduleFederationConfig, additionalBundlerConfig: {format: 'esm'}})
  ]
})