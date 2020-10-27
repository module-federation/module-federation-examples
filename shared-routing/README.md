# Shared App Shell, State, Routing and Components Example

This example demos a basic host application loading remote component.

- `shell` is the App Shell
- `dashboard` - standalone application
- `order` - standalone application
- `sales` - standalone application
- `profile` - standalone application

# Running Demo

Run `yarn start`. This will build all the apps `shell`, `dashboard`, `order`, `profile`, `sales` on different ports as shown below

- [localhost:3000](http://localhost:3000/) (HOST) - `shell`
- [localhost:3001](http://localhost:3001/) (STANDALONE REMOTE) - `dashboard`
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE) - `order`
- [localhost:3003](http://localhost:3003/) (STANDALONE REMOTE) - `sales`
- [localhost:3004](http://localhost:3004/) (STANDALONE REMOTE) - `profile`

You will notice that each of the above URLs will look exactly same. For more details [Watch this YouTube video](https://www.youtube.com/watch?v=-LNcpralkjM)

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/AppShellSharedRoutes">
