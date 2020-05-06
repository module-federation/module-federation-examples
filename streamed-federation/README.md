# Federated lambda streaming

Workspace containing the example code for streaming server code from s3

# This Depends on Proprietary software

This example runs, but only if users have access to the @module-federation/proprietary-tools

## Getting Started

Install dependencies

```shell script
> yarn
```

Start s3 in a second terminal

```shell script
> yarn start:s3
```

Back in the original terminal setup the s3 buckets

```shell script
> yarn setup:local
```

Build the packages

```shell script
> yarn build
```

Deploy the s3 buckets

```shell script
> yarn deploy:local
```
