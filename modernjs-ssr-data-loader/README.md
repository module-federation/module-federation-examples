# Modern.js remote data loading

Use Node.js 20.19+ and pnpm 10. Run these commands from the repository root.

```sh
pnpm --filter 'modernjs-ssr-data-loader*' install --frozen-lockfile
pnpm --filter modernjs-ssr-data-loader build
pnpm --filter modernjs-ssr-data-loader serve
```

Open these URLs.

- http://127.0.0.1:3062/entry-one renders the remote data card on the server.
- http://127.0.0.1:3062/entry-two mounts the remote data card in the browser.
- http://127.0.0.1:3061 runs the provider with its native route loader.

Stop the servers before running the production tests.

```sh
pnpm --filter modernjs-ssr-data-loader typecheck
pnpm --filter modernjs-ssr-data-loader e2e:ci
```
