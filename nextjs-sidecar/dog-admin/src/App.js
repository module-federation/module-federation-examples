import React, { lazy, Suspense } from "react";
import DogName from "./DogName";

const RemoteDog = lazy(() => import("dogs/Dog"));

export default function App() {
  return (
    <div style={{ width: 800, margin: "auto" }}>
      <DogName name="Puppies!" />
      <Suspense fallback="Loading dogs">
        <RemoteDog />
      </Suspense>
    </div>
  );
}
