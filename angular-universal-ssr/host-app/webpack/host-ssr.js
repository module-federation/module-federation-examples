const { resolve } = require("path");
const { AngularCompilerPlugin, PLATFORM } = require("@ngtools/webpack");
const { ContextReplacementPlugin } = require("webpack");
const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");

module.exports = (env = {}) => {
  const buildFolder = resolve("./dist/server");

  return {
    entry: ["./server.js"],
    mode: "production",
    resolve: {
      mainFields: ["es2015", "module", "main"],
    },
    target: "node",
    optimization: { minimize: false },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["raw-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          loader: "raw-loader",
        },
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: "@ngtools/webpack",
        },
        {
          test: /\.html$/,
          loader: "raw-loader",
        },
      ],
    },
    externals: ["enhanced-resolve"],
    plugins: [
      new ProgressPlugin(),
      new ContainerReferencePlugin({
        remoteType: "commonjs2",
        remotes: {
          clientApp: resolve(
            __dirname,
            "../../client-app/dist/server/remoteEntry.js"
          ),
        },
        overrides: ["@angular/core", "@angular/common", "@angular/router"],
      }),
      new ContextReplacementPlugin(/@?hapi(\\|\/)/),
      new ContextReplacementPlugin(/express(\\|\/)/),
      new AngularCompilerPlugin({
        entryModule: resolve(
          __dirname,
          "../src/app/app.server.module#AppServerModule"
        ),
        tsConfigPath: "./tsconfig.server.json",
        platform: PLATFORM.Server,
        skipCodeGeneration: true,
        directTemplateLoading: false,
      }),
    ],

    output: {
      filename: "[name].js",
      path: resolve(__dirname, buildFolder),
      chunkFilename: "[id].[chunkhash].js",
      libraryTarget: "commonjs2",
    },
  };
};
