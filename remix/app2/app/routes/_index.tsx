import { useLoaderData } from "@remix-run/react";

export function loader() {
  return { message: "Hello, World!" };
}

export default function Home() {
  const { message } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
    </div>
  );
}
