const { AngularCompilerPlugin, PLATFORM } = require("@ngtools/webpack");
const { resolve } = require("path");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");

module.exports = (env = {}) => {
  const buildFolder = resolve("./dist/server");

  return {
    entry: ["./src/main.ts"],
    mode: "production",
    resolve: {
      mainFields: ["browser", "module", "main"],
    },
    output: {
      filename: "[name].js",
      path: resolve(__dirname, buildFolder),
      chunkFilename: "[id].[chunkhash].js",
      libraryTarget: "commonjs2",
    },
    target: "node",
    plugins: [
      new ProgressPlugin(),
      new ContainerPlugin({
        name: "clientApp",
        filename: "remoteEntry.js",
        exposes: {
          Component:
            "./src/app/client-weather/client-weather-city/client-weather-city.component.ts",
          Module: "./src/app/client-weather/client-weather.module.ts",
        },
        library: { type: "commonjs2" },
        overridables: ["@angular/core", "@angular/common", "@angular/router"],
      }),
      new AngularCompilerPlugin({
        entryModule: resolve(__dirname, "../src/app/app.module#AppModule"),
        tsConfigPath: "./tsconfig.app.json",
        skipCodeGeneration: true,
        directTemplateLoading: false,
      }),
    ],
    module: {
      rules: [...require("./_loaders")],
    },
  };
};
