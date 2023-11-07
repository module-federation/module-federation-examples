import * as path from "node:path";

import {readConfig} from "@remix-run/dev/dist/config.js";
import {EsbuildPlugin} from "esbuild-loader";

import {toManifest, writeManifest} from "./utils/manifest.js";
import {default as Enhanced} from '@module-federation/enhanced'

const {ModuleFederationPlugin, AsyncBoundaryPlugin} = Enhanced
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const remixConfig = await readConfig();

const routeSet = new Set();
const routes = Object.fromEntries(
  Object.entries(remixConfig.routes).map(([key, route]) => {
    const fullPath = path.resolve(remixConfig.appDirectory, route.file);
    routeSet.add(fullPath);
    return [key, fullPath];
  })
);

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  name: "browser",
  mode,
  devtool: mode === "development" ? "inline-cheap-source-map" : undefined,
  entry: {
    "entry.client": remixConfig.entryClientFilePath,
    ...routes,
  },
  externalsType: "module",
  experiments: {
    outputModule: true,
    topLevelAwait: true
  },
  output: {
    path: remixConfig.assetsBuildDirectory,
    publicPath: remixConfig.publicPath,
    module: true,
    library: {type: "module"},
    chunkFormat: "module",
    chunkLoading: "import",
    assetModuleFilename: "_assets/[name]-[contenthash][ext]",
    cssChunkFilename: "_assets/[name]-[contenthash][ext]",
    filename: "[name]-[contenthash].js",
    chunkFilename: "[name]-[contenthash].js",
  },
  module: {
    rules: [
      {
        include: (input) => routeSet.has(input),
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [["eliminator", {namedExports: ["action", "loader"]}]],
            },
          },
          {
            loader: "esbuild-loader",
            options: {
              target: "es2019",
              jsx: "automatic",
            },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: (input) => routeSet.has(input),
        use: [
          {
            loader: "esbuild-loader",
            options: {
              target: "es2019",
              jsx: "automatic",
            },
          },
        ],
      },
    ],
  },
  cache: false,
  optimization: {
    moduleIds: "named",
    runtimeChunk: "single",
    chunkIds: 'named',

    // treeshake unused code in development
    // needed so that browser build does not pull in server code
    usedExports: true,
    innerGraph: true,
    splitChunks: {
      chunks: "async",
    },
    minimize: mode === "production",
    minimizer: [new EsbuildPlugin({target: "es2019"})],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      exposes: {
        './button': './components/Button.jsx',
      },
      shared: {
        "react/": {
          singleton: true
        },
        "react-dom/": {
          singleton: true
        }
      }
    }),
    new AsyncBoundaryPlugin(),
    {
      /**
       * @param {import("webpack").Compiler} compiler
       */
      apply(compiler) {
        compiler.hooks.emit.tapPromise(
          "RemixAssetsManifest",
          async (compilation) => {
            const stats = compilation.getStats();
            const manifest = await toManifest(remixConfig, stats);
            writeManifest(remixConfig, manifest);
          }
        );
      },
    },
  ],
};

export default config;
