# react-webpack-host-vite-remote

Monorepo for example Module Federation setup using a Webpack host and a Vite remote.

## Project Structure

```text
./
├── host/                 # Webpack-based host application
│   ├── public/           # HTML template used by Webpack
│   ├── src/              # React source for the host
│   └── webpack.config.js # Webpack configuration
├── remote/               # Vite-based remote application
│   ├── src/              # React components exposed to the host
│   └── vite.config.ts    # Vite configuration with module federation
├── pnpm-workspace.yaml   # pnpm monorepo configuration
├── package.json          # root configuration
└── LICENSE
```

## Getting Started

Install dependencies using [pnpm](https://pnpm.io/):

```bash
pnpm install
```

### Running the Remote

```bash
pnpm --filter remote build    # build the remote
pnpm --filter remote preview  # serve on http://localhost:3001
```

### Running the Host

```bash
pnpm --filter host start      # start Webpack dev server on http://localhost:3000
```

Open `http://localhost:3000` after both services are running to see the host consuming the remote button component.

## License

This project is licensed under the terms of the Apache 2.0 license. See the [LICENSE](LICENSE) file for details.

