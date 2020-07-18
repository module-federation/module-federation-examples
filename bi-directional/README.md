# Bi-Directional Hosts Example

This example demos bi-directional hosts each with their own remote `Button` components.

- `app1` exposes a red `<button>App 1 Button</button>` component.
- `app2` exposes a blue `<button>App 2 Button</button>` component.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)

Notice that `app1` will asynchronously load `app2`'s button and vice versa.
<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/BiDirectional">
