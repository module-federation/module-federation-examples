import { lazy, Suspense } from "react";

const RemoteComponent = ({ scope, module, ...props }) => {
  if (!global[scope]) {
    return null;
  }

  global[scope].init({
    react: {
      get: () => Promise.resolve().then(() => () => require("react")),
      loaded: true,
      singleton: true,
      version: [16, 13, 1],
    },
  });

  const Component = lazy(() =>
    global[scope].get(module).then((factory) => factory())
  );

  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Home() {
  return (
    <div>
      <RemoteComponent scope="dog_admin" module="./DogName" name="Puppies!" />
      <RemoteComponent scope="dogs" module="./Dog" />
    </div>
  );
}
