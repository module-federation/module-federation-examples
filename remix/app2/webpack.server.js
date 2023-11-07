import * as fs from "node:fs";
import * as path from "node:path";

import { readConfig } from "@remix-run/dev/dist/config.js";
import { EsbuildPlugin } from "esbuild-loader";
import nodeExternals from "webpack-node-externals";

import { getManifest } from "./utils/manifest.js";

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const remixConfig = await readConfig();
const isModule = remixConfig.serverModuleFormat === "esm";

console.log({ isModule });

const manifest = getManifest();
const serverBuildModule = "./.cache/server-build.js";
const serverBuildEntry = createServerBuildEntry(remixConfig, manifest);
fs.writeFileSync(serverBuildModule, serverBuildEntry, "utf8");

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  name: "server",
  mode,
  devtool: mode === "development" ? "inline-cheap-source-map" : undefined,
  target: "node",
  entry: remixConfig.serverEntryPoint
    ? path.resolve(remixConfig.rootDirectory, remixConfig.serverEntryPoint)
    : serverBuildModule,
  experiments: isModule ? { outputModule: true } : undefined,
  externalsType: isModule ? "module" : undefined,
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [/^@remix-run\/dev/],
      importType: isModule ? "module" : "commonjs",
    }),
  ],
  output: {
    filename: path.basename(remixConfig.serverBuildPath),
    library: { type: isModule ? "module" : "commonjs" },
    chunkFormat: isModule ? "module" : "commonjs",
    chunkLoading: isModule ? "import" : "require",
    module: isModule,
    path: path.dirname(remixConfig.serverBuildPath),
    publicPath: remixConfig.publicPath,
    assetModuleFilename: "_assets/[name]-[contenthash][ext]",
    cssChunkFilename: "_assets/[name]-[contenthash][ext]",
  },
  optimization: {
    moduleIds: "deterministic",
  },
  resolve: {
    alias: {
      "@remix-run/dev/server-build.js": serverBuildModule,
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
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
};

export default config;

/**
 *
 * @param {import("@remix-run/dev").ResolvedRemixConfig} config
 * @param {import("@remix-run/dev").AssetsManifest} manifest
 * @returns
 */
function createServerBuildEntry(config, manifest) {
  const routeImports = Object.values(config.routes).map((route, index) => {
    return `import * as route${index} from "${path
      .relative(
        path.resolve("./.cache"),
        path.resolve(config.appDirectory, route.file)
      )
      .replace(/\\/g, "/")}";`;
  });
  const routes = Object.entries(config.routes).map(
    ([routeId, route], index) => {
      return `${JSON.stringify(routeId)}: {
      id: ${JSON.stringify(route.id)},
      parentId: ${JSON.stringify(route.parentId)},
      path: ${JSON.stringify(route.path)},
      index: ${JSON.stringify(route.index)},
      caseSensitive: ${JSON.stringify(route.caseSensitive)},
      module: route${index}
    }`;
    }
  );

  return `
  import * as entryServer from "${config.entryServerFilePath.replace(
    /\\/g,
    "/"
  )}";
  ${routeImports.join("\n")}
  export const entry = { module: entryServer };
  export const routes = {
    ${routes.join(",\n  ")}
  };
  export const assets = ${JSON.stringify(manifest)};
  export const future = ${JSON.stringify(config.future)};
  export const publicPath = ${JSON.stringify(config.publicPath)};
`;
}
