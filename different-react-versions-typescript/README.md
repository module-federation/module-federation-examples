# Mixed React Versions and Compatibility levels

This example demos the ability to load two separate versions of react (v16.6.3 and v18.2.0).

> Check the javascript version of this example [here](../different-react-versions/README.md).

Module Federation allows us to create an adapter which attaches a hooks-friendly version to render a section of thr app using modern versions.

- `app1` uses and older version of react, not compatible with react Hooks
- `app2` uses a modern react version and its components are hooks based

## Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)

## How it works

This example contains two important components, the `ReactAdapterConsumer` and `ReactAdapterProvider`. They are responsible to make the two versions of react work together.

The adapter consumes both versions of react to "translate" the props into a fresh render. This could be presented as a HOC or federated components could have a legacy export containing the adapter build in.

### [ReactAdapterProvider](./app2/src/components/ReactAdapterProvider.tsx)

This component is responsible to dynamic render/hydrate the federated component using it host version of React.

> You can see the usage [here](./app2/src/components/ModernReactComponent.tsx#29).

This is a generic component type, so you can pass the generic parameter to the component to specify the type of the props.

```jsx
import React from 'react';

export interface ButtonProps {
  color: 'red' | 'blue';
}

const Button = (props: ButtonProps) => {
  return <button style={{ color: props.color }}>Click me</button>;
};

export const Adapted = React.forwardRef<
    ReactAdapterProvider<ModernReactComponentProps>,
    ModernReactComponentProps
  >((props, ref) => {
  // the intellisesne will show the type of the props if you try to modify it
  return (
    <ReactAdapterProvider<ButtonProps> component={Button} color="red" ref={ref} />
  );
});
```

### [ReactAdapterConsumer](./app1/src/components/ReactAdapterConsumer.tsx)

This component is responsible to render the federated component using the remote version of React.

> You can see the usage [here](./app1/src/components/App.tsx#41).

This is a generic component type, so you can pass the generic parameter to the component to specify the type of the props.

```jsx
// remeber to add path alias to your tsconfig.base.json at the root of the workspace and the type definition file of the remote component
// this demo contains an example that reproduce that but you can check in the gist below
// https://gist.github.com/brunos3d/80235047c74b27573234c774ed474ef8
import type { ButtonProps } from 'app2/Button';

<ReactAdapterConsumer<ButtonProps>
  // you can try to modify the color value and the intellisense automatically will show the type of the props
  color="blue"
  fallback={<div>Loading...</div>}
  importer={() => import('app2/Button').then(module => ({ default: module.Adapted }))}
/>;
```

<img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/DifferentReactVersionsTypescript">
