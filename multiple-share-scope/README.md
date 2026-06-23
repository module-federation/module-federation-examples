# Module Federation - Multiple Share Scope Example

This example demonstrates how to use **multiple share scopes** in Module Federation to run **React 17** and **React 18** simultaneously in the same host application.

## Architecture

| Application       | Port | Description                                      |
| ----------------- | ---- | ------------------------------------------------ |
| `host`            | 8080 | Host app consuming both React 17 and React 18 remotes |
| `provider-react-17` | 8081 | Remote exposing components built with React 17  |
| `provider-react-18` | 8082 | Remote exposing components built with React 18  |

## How It Works

The host defines two share scopes:

- **`default`** scope — shares React 17 (`react17` / `react-dom17` aliases)
- **`react18`** scope — shares React 18 (`react` / `react-dom`)

Each remote is associated with the appropriate scope:

- `provider17` uses the `default` scope (React 17)
- `provider18` uses both `['react18', 'default']` scopes (React 18)

This allows isolated React instances per version, preventing version conflicts.

## Running the Demo

Install dependencies:

```bash
pnpm install
```

Start all applications in development mode:

```bash
pnpm start
```

- [localhost:8080](http://localhost:8080/) — Host
- [localhost:8081](http://localhost:8081/) — Provider (React 17)
- [localhost:8082](http://localhost:8082/) — Provider (React 18)

## Build & Preview

```bash
pnpm build
pnpm serve
```
