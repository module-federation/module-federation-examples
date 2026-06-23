# react-webpack-MF

[中文](./README_zh-cn.md)

A complete Webpack Module Federation Case with React.

# project directory

## lib-app

It is a low-level or basic app, which exposes libraries like `react`, `react-dom`.

It is a pure `remote`.

## component-app

It is a middle-level app, which depends on modules exposed from `lib-app` : `react` ,`react-dom`. In the meantime, it also exposes components: `Dialog`, `Button` to another app called `main-app`.

It is both host and remote.

## main-app

The top-level app, which depends on `lib-app` and `component-app`.

It is a pure host.

# how to use

- `pnpm install`
- `pnpm run start`

After running these commands, open your browser at `http://localhost:3002` and open the DevTools network tab to see resource loading details.

[Best practices, rules and more interesting information here](../../playwright-e2e/README.md)
