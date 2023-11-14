import * as fs from "node:fs";
import * as path from "node:path";

import { getExports } from "./get-exports.js";

function createUrl(publicPath, file) {
  return (
    publicPath.split(path.win32.sep).join("/") +
    (file || "").split(path.win32.sep).join("/")
  );
}

/**
 *
 * @param {import("webpack").StatsCompilation} stats
 * @param {string} publicPath
 * @returns {(group: string) => string[]}
 */
function createNamedChunkGroupFactory(stats, publicPath) {
  const chunksById = new Map(stats.chunks?.map((chunk) => [chunk.id, chunk]));
  return (group) => {
    /** @type {Set<string>} */
    const files = new Set();
    stats.namedChunkGroups?.[group].chunks?.forEach((chunkId) => {
      const chunk = chunksById.get(chunkId);
      chunk?.files?.forEach((file) => files.add(createUrl(publicPath, file)));
    });
    return [...files];
  };
}

/**
 * @param {webpack.StatsCompilation} param0
 * @param {string} entrypointId
 */
const getAssets = ({ entrypoints }, entrypointId) => {
  if (entrypoints === undefined) throw Error("todo");
  const { assets } = entrypoints[entrypointId];
  if (assets === undefined) throw Error("todo");
  return assets;
};

/**
 * @param {import("@remix-run/dev").ResolvedRemixConfig} remixConfig
 * @param {import("webpack").Stats} stats
 * @returns {import("@remix-run/dev").AssetsManifest}
 */
export async function toManifest(remixConfig, stats) {
  const compilationStats = stats.toJson({
    modules: true,
    entrypoints: true,
    assets: true,
    groupAssetsByChunk: true,
    hash: true,
  });
  const getByNamedChunkGroup = createNamedChunkGroupFactory(
    compilationStats,
    remixConfig.publicPath
  );

  const entryImports = getByNamedChunkGroup("entry.client");
  const entryModule = createUrl(
    remixConfig.publicPath,
    getAssets(compilationStats, "entry.client").slice(-1)[0].name
  );
  const rootImports = getByNamedChunkGroup("root");

  // TODO: what are runtime imports? dynamic imports?
  // let runtimeImports = compilationStats.assetsByChunkName["runtime"].map(
  //   (asset) => createUrl(remixConfig.publicPath, asset)
  // );

  const routes = Object.fromEntries(
    Object.entries(remixConfig.routes).map(([routeId, route]) => {
      const assets = getAssets(compilationStats, routeId);
      const routeImports = assets
        .slice(0, -1)
        .map((asset) => createUrl(remixConfig.publicPath, asset.name));
      const routeModule = createUrl(
        remixConfig.publicPath,
        assets.slice(-1)[0].name
      );
      const routePath = path.resolve(remixConfig.appDirectory, route.file);
      const routeExports = getExports(routePath, remixConfig);
      return [
        routeId,
        {
          id: route.id,
          parentId: route.parentId,
          path: route.path,
          index: route.index,
          caseSensitive: route.caseSensitive,
          module: routeModule,
          imports: routeImports,
          hasAction: routeExports.includes("action"),
          hasLoader: routeExports.includes("loader"),
          hasCatchBoundary: routeExports.includes("CatchBoundary"),
          hasErrorBoundary: routeExports.includes("ErrorBoundary"),
        },
      ];
    })
  );

  const version = compilationStats.hash;
  if (version === undefined) throw Error("todo");
  return {
    version,
    url: createUrl(
      remixConfig.publicPath,
      `manifest-${version.toUpperCase()}.js`
    ),
    entry: {
      imports: [
        ...new Set([/* ...runtimeImports, */ ...entryImports, ...rootImports]),
      ],
      module: entryModule,
    },
    routes,
  };
}

export function writeManifest(config, manifest) {
  fs.mkdirSync("./.cache", { recursive: true });
  fs.writeFileSync(
    "./.cache/manifest.json",
    JSON.stringify(manifest, null, 2),
    "utf8"
  );

  fs.mkdirSync(config.assetsBuildDirectory, { recursive: true });
  fs.writeFileSync(
    path.resolve(config.assetsBuildDirectory, path.basename(manifest.url)),
    `window.__remixManifest=${JSON.stringify(manifest)};`
  );
}

/**
 * @returns {import("@remix-run/dev").AssetsManifest}
 */
export function getManifest() {
  return JSON.parse(fs.readFileSync("./.cache/manifest.json", "utf8"));
}
