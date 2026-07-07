# Controlled Vendor Sharing

This example demonstrates a runtime plugin implementation for Module Federation that provides dynamic control over shared module versions. It allows you to deterministically manage and modify shared module versions across federated applications using a control panel interface and localStorage persistence.

## Features

- Runtime plugin for dynamic version control of shared modules
- Control panel UI for managing shared module versions
- Persistent version settings using localStorage (`formDataVMSC` key)
- Support for upgrading/downgrading shared module versions
- E2E tests to verify version control functionality

## Main Components

### `control-share.ts`

A runtime plugin that implements version control for Module Federation. Key features:

- Implements the `FederationRuntimePlugin` interface
- Uses localStorage to persist version preferences
- Handles version resolution and module sharing between applications
- Manages share scope mapping and instance tracking

### E2E Tests

Comprehensive E2E tests that verify:

- Initial shared module versions
- Version override functionality through localStorage
- UI updates reflecting version changes
- Button component rendering with correct version information

## Running Demo

Run `pnpm run start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) - Host application with control panel
- [localhost:3002](http://localhost:3002/) - Remote application

To run tests in interactive mode:

```bash

```

To run tests in headless mode:

```bash
yarn e2e:ci
```

## Implementation Details

The control panel allows you to:

- View current versions of shared modules (react, react-dom, lodash)
- Override versions for specific applications
- Save settings to localStorage
- Clear settings and reload to default versions

The runtime plugin (`control-share.ts`) handles:

- Version resolution based on localStorage settings
- Share scope management
- Instance tracking and updates
- Cross-application module sharing rules

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=runtime-plugins&ep.readme_path=runtime-plugins%2Fcontrol-sharing%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fruntime-plugins%2Fcontrol-sharing&dt=ModuleFederationExamples+runtime-plugins%2Fcontrol-sharing%2FREADME.md">
