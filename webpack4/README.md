# mf-webpack4

Module Federation is implemented in webpack4. The current example demonstrates that MF of webpack4 and webpack5 call each other
* In this example, webpack4 and webpack5 are shown as both host and remote
* webpack4/app1 import webpack4/app2、webpack5/app3
* webpack5/app3 import webpack4/app2
* In this example, there are multiple different versions of shared at the same time

## Try Online:
https://stackblitz.com/github/module-federation/module-federation-examples/tree/master/webpack4

## How to use

Run the following commands in the root directory.

```bash
yarn
yarn start
```

Both `app1` and `app2` and `app3` are independently deployed apps:

- `app1`: http://localhost:9001
- `app2`: http://localhost:9002
- `app3`: http://localhost:9003

Check out this link below for more examples:

https://www.npmjs.com/package/mf-webpack4
