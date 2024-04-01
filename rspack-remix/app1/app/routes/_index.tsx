import { useLoaderData } from "@remix-run/react";
export function loader() {
  return { message: "Hello, World!" };
}
// const Button = lazy(() => import('app2/button'));
export default function Home() {
    console.log('test');
  const { message } = useLoaderData();
  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
    </div>
  );
}
