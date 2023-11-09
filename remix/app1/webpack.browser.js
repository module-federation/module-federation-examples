import * as path from "node:path";

import {readConfig} from "@remix-run/dev/dist/config.js";
import {EsbuildPlugin} from "esbuild-loader";
import {toManifest, writeManifest} from "./utils/manifest.js";
import {default as Enhanced} from '@module-federation/enhanced'
import DelegatesModulePlugin from '@module-federation/utilities/src/plugins/DelegateModulesPlugin.js'
const {ModuleFederationPlugin, AsyncBoundaryPlugin} = Enhanced
class HoistContainerReferences {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('stuff', (compilation) => {
      compilation.hooks.afterOptimizeChunks.tap(
        'EmbeddedContainerPlugin',
        (chunks) => {
          const chunkSet = new Map()
          const externalRequests = new Set()
          for (const chunk of chunks) {
            chunkSet.set(chunk.id || chunk.name, chunk)
          }
          // console.log(chunkSet)
          for (const chunk of chunks) {
            const remoteModules = compilation.chunkGraph.getChunkModulesIterableBySourceType(chunk,'remote');
            if(!remoteModules) continue
            for (const remoteModule of remoteModules) {
              remoteModule.dependencies.forEach((dep) => {
                const mod = compilation.moduleGraph.getModule(dep)
                externalRequests.add(mod);
                const runtimeChunk = chunkSet.get(chunk.runtime)
                compilation.chunkGraph.connectChunkAndModule(runtimeChunk, mod)
              })
            }
          }
           console.log(externalRequests);
        }
      );
    })
  }
}

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
    environment: {
      module: true
    },
    path: remixConfig.assetsBuildDirectory,
    publicPath: 'auto',
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

    new HoistContainerReferences(),
    new AsyncBoundaryPlugin({
      excludeChunk: (chunk)=> {
        return chunk.name === 'app1'
      }
    }),
    new ModuleFederationPlugin({
      runtime: false,
      name: "app1",
      filename: 'remoteEntry.js',
      library: {
        type: 'module'
      },
      remoteType: 'module',
      remotes: {
        app2: 'http://localhost:3001/build/remoteEntry.js'
      },
      exposes: {
        './button': './components/Button.jsx',
      },
      shared: {
        "react/": {
          singleton: true
        },
        "react": {
          singleton: true
        },
        "react-dom/": {
          singleton: true
        },
        "react-dom": {
          singleton: true
        },
        "react-router-dom": {
          singleton: true
        },
        "react-router-dom/": {
          singleton: true
        },
        "@remix-run/router": {
          singleton: true
        },
        "@remix-run/router/": {
          singleton: true
        },
        "@remix-run/react/": {
          singleton: true
        },
        "@remix-run/": {
          singleton: true
        }
      }
    }),
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
