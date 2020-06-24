const { resolve } = require("path");
const { AngularCompilerPlugin, PLATFORM } = require("@ngtools/webpack");
const { ContextReplacementPlugin } = require("webpack");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;

module.exports = (env = {}) => {
  const buildFolder = resolve("./dist/server");

  return {
    entry: ["./server.js"],
    mode: "production",
    resolve: {
      mainFields: ["es2015", "module", "main"],
    },
    output: {
      filename: "[name].js",
      path: resolve(__dirname, buildFolder),
      chunkFilename: "[id].[chunkhash].js",
      libraryTarget: "commonjs2",
    },
    target: "async-node",
    optimization: { minimize: false },
    externals: ["enhanced-resolve"],
    plugins: [
      new ProgressPlugin(),

      // new ContainerReferencePlugin({
      //   remoteType: "commonjs2",
      //   remotes: {
      //     clientApp: resolve(
      //       __dirname,
      //       "../../client-app/dist/server/remoteEntry.js"
      //     ),
      //   },
      //   overrides: ["@angular/core", "@angular/common", "@angular/router"],
      // }),

      new ModuleFederationPlugin({
        library: { type: "commonjs2", name: "hostApp" },
        remotes: {
          clientApp: resolve(
            __dirname,
            "../../client-app/dist/server/remoteEntry.js"
          ),
        },
        shared: [
          { "@angular/core": { singleton: true, eager: true } },
          { "@angular/common": { singleton: true, eager: true } },
          { "@angular/router": { singleton: true, eager: true } },
        ],
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

    module: {
      rules: [...require("./_loaders")],
    },
  };
};
