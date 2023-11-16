import path from "node:path";

export const routeSet = new Set();
export const getRoutes= (remixConfig)=> Object.fromEntries(
  Object.entries(remixConfig.routes).map(([key, route]) => {
    const fullPath = path.resolve(remixConfig.appDirectory, route.file);
    routeSet.add(fullPath);
    return [key, fullPath];
  })
);
