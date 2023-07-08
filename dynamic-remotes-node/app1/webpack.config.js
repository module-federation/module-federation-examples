const {UniversalFederationPlugin} = require('@module-federation/node');
module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    library: {type: 'commonjs-module',}
  },
  target: false,
  plugins: [
    new UniversalFederationPlugin({
      isServer: true,
      name: 'app1',
      remotes: {
        'fake': 'promise new Promise((resolve) => {resolve({get:()=>Promise.resolve(()=>{}),init:()=>{}})})',
      },
      exposes: {
        './noop': './noop.js',
      }
    }),
  ]
}
