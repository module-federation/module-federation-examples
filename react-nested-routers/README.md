# Module Federation - React Router DOM Example

This example shows how to handle indipendent and nested routings in a MFE setup based on [webpack-module-federation](https://github.com/module-federation). The setup consists of:

- `app1` & `app2`: apps using a browser history strategy when acting as hosts and an in-memory history strategy when acting as remotes.
- `shell`: host app based on a browser history strategy that handles high-level routing. Shell routing determines mounting/unmounting of `app1` and `app2` remotes.

The shell is the only component responsible for updating browser url. The two level of history strategies (browser + in-memory) are kept in sync through an event-based communication between shell and remotes.

<br>

# Running Demo

- Install deps by running `npm install` in each of the MFE root folder (i.e. `app1`, `app2`, `shell`).
- Start apps by running `npm start` in each of the MFE root folder.

<br>

# Credits

The setup is inspired to https://github.com/StephenGrider/mfe.
