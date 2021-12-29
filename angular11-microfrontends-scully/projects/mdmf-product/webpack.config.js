const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:4202/',
    uniqueName: 'mdmfproduct',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'product',
      library: { type: 'var', name: 'product' },
      filename: 'remoteEntry.js',
      exposes: {
        ProductModule: './projects/mdmf-product/src/app/product/product.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, eager: true },
        '@angular/common': { singleton: true, eager: true },
        '@angular/router': { singleton: true, eager: true },
        '@ngrx/store': { singleton: true, eager: true },
        '@ngrx/router-store': { singleton: true, eager: true },
        '@scullyio/ng-lib': { singleton: true, eager: true },
        rxjs: { singleton: true, eager: true },
        'mdmf-shared': { singleton: true, eager: true },
      },
    }),
  ],
};
