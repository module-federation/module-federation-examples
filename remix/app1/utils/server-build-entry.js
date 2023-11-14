import path from "node:path";
/**
 *
 * @param {import("@remix-run/dev").ResolvedRemixConfig} config
 * @param {import("@remix-run/dev").AssetsManifest} manifest
 * @returns
 */
export function createServerBuildEntry(config, manifest) {
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
