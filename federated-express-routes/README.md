# Federated express routes 

This example demos the ability to share code between two apps.

Module Federation allows us to share code between two apis.

- `remote` provides a simple express server with one route 
- `host` consumes the remote route and allow interactions with the remote api 

# Running Demo

Run `yarn start`. This will build and serve both `remote` and `host` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
