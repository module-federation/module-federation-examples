const path = require('path')
const { NativeFederationTypeScriptHost } = require('@module-federation/native-federation-typescript/rspack')
const { NativeFederationTestsHost } = require('@module-federation/native-federation-tests/rspack')

const deps = require('./package.json').dependencies;

const moduleFederationConfig = {
  name: 'moduleFederationHost',
  filename: 'remoteEntry.js',
  remotes: {
    'moduleFederationTypescript': 'moduleFederationTypescript@http://localhost:3000/remoteEntry.js',
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
    port: 3001,
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
    extensions: ['.ts', '.tsx', '.js', '.d.ts']
  },
  plugins: [
    NativeFederationTypeScriptHost({moduleFederationConfig}),
    NativeFederationTestsHost({moduleFederationConfig}),
  ]
})