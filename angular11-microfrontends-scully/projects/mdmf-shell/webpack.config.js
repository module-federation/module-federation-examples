const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4200/",
    uniqueName: "shell",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
        "@ngrx/store": { singleton: true, eager: true },
        "@ngrx/router-store": { singleton: true, eager: true },
        "@scullyio/ng-lib": { singleton: true, eager: true },
        rxjs: { singleton: true, eager: true },
        "mdmf-shared": { singleton: true, eager: true },
      },
    }),
  ],
};
