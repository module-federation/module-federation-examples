const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
    uniqueName: "mdmfprofile",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile",
      library: { type: "var", name: "profile" },
      filename: "remoteEntry.js",
      exposes: {
        ProfileModule:
          "./projects/mdmf-profile/src/app/profile/profile.module.ts",
      },
      shared: {
        "@angular/core": { singleton: true },
        "@angular/common": { singleton: true },
        "@angular/router": { singleton: true },
        "@ngxs/store": {singleton: true},
        "mdmf-shared": { singleton: true },
      },
    }),
  ],
};
