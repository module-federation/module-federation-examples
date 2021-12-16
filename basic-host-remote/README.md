# Basic One-Way Example

This example demos a basic host application loading remote component.

- `app1` is the host application.
- `app2` standalone application which exposes `Button` component.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/BasicRemoteHost">

# Scenarios

## Upgrading a shared **singleton** dep

Host wants to upgrade from `react@17.0.0` to `react@18.0.0`

```
react: { singleton: true, requiredVersion: "17.0.0 || 18.0.0"}, strictVersion: true }
```

This config will ensure that the host renders properly and any remotes that are on the old version just start to error out.

```
// Remotes that haven't upgraded will throw an error (caught by error boundary in host)
react: { singleton: true, requiredVersion: "17.0.0"}, strictVersion: true }

// Remotes that have upgraded will render fine
react: { singleton: true, requiredVersion: "18.0.0"}, strictVersion: true }

/* Remotes without strict versioning will end up using `react@18.0.0` as that is the highest version available in  the share scope, even though they haven't actually upgraded. A warning will be logged in the console. */
react: { singleton: true, requiredVersion: "17.0.0"}, strictVersion: false }

```

TODO: decide if we want to disable strict versioning for remotes so that they always render, albeit with a version they didn't ask for.  

## Upgrading a shared **non-singleton** dep

## Rolling back a shared **singleton** dep

Host wants to rollback `react@18.0.0` to `react@16.0.0`

```
react: { singleton: true, requiredVersion: "17.0.0 || 18.0.0"}, strictVersion: true }
```

## Rolling back a shared **non-singleton** dep

## Ensuring a single version of a shared dep throughout the app

# Version experiments

## Non-singleton dep with different versions

Host:

```
lodash: { singleton: false, requiredVersion: "4.7.0" }
```

Remote:

```
lodash: { singleton: false, requiredVersion: "4.17.21" }
```

Output:

```
HOST lodash@4.7.0
REMOTE lodash@4.17.21
```

## Singleton dep with different verisons

Host:

```
lodash: { singleton: true, requiredVersion: "4.7.0" }
```

Remote:

```
lodash: { singleton: true, requiredVersion: "4.17.21" }
```

Output:

```
HOST lodash@4.17.21
REMOTE lodash@4.17.21
```

## Singleton dep with different versions [STRICT]

Host:

```
lodash: { singleton: true, requiredVersion: "4.7.0", strictVersion: true }
```

Remote:

```
lodash: { singleton: true, requiredVersion: "4.17.21", strictVersion: true }
```

Output:

```
Host Error: Unsatisfied version 4.17.21 of shared singleton module lodash (required =4.7.0)
```
