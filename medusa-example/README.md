# Medusa Demo

# Setup

1. `yarn install`
2. Login to medusa https://medusa.codes/
3. Generate Read/Write Tokens and save https://app.medusa.codes/settings
4. Copy Read/Write Tokens and add them to `.env` in the root of this directory.
5. Run a build with yarn start, then go check medusa.
6. If you want to test out version management, change something in `dsl` and run `yarn build && yarn serve` again - you will now be able to control what remote/app uses what version at runtime

# Running Demo

Run `yarn build && yarn serve`

- [Home is on localhost:3001](http://localhost:3001/)
- [DSL is on localhost:3002](http://localhost:3002/)
- [Nav is on localhost:3003](http://localhost:3003/)
- [Search is on localhost:3004](http://localhost:3004/)
- [Utils is on localhost:3005](http://localhost:3005/)

Notice that `app1` will asynchronously load `app2`'s button and vice versa.
