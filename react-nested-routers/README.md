# Module Federation - React Router DOM Example
This example shows how to handle indipendent and nested routings in a MFE setup based on [webpack-module-federation](https://github.com/module-federation). The setup consists of:

- `app1` & `app2`: apps using a browser history strategy when acting as hosts and an in-memory history strategy when acting as remotes.
- `shell`: host app based on a browser history strategy that handles high-level routing. Shell routing determines mounting/unmounting of `app1` and `app2` remotes.

The shell is the only component responsible for updating browser url. The two level of history strategies (browser + in-memory) are kept in sync through an event-based communication between shell and remotes.

<br>

# Running Demo
1. _(Optional)_ Select node version with node version manager by running `nvm use`. The repo has been battle-tested with v16 Node.js version.
2. Install deps by running `npm install`. Since the repo is based on [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) the command will install deps for all MFEs.
3. Start apps by running `npm start`.

<br>

# Credits
The setup is inspired to https://github.com/StephenGrider/mfe. 