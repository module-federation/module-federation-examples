import { lazy, Suspense } from "react";
import { dependencies } from "../../package.json";

const RemoteComponent = ({ scope, module, ...props }) => {
  if (!global[scope]) {
    return null;
  }

  global[scope].init({
    react: {
      [dependencies.react]: {
        get: () => Promise.resolve().then(() => () => require("react")),
      },
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
