import Head from "next/head";
import Dog from "../components/Dog";

const DynamicWidget = ({ scope, module, ...props }) => {
  if (!global[scope]) {
    return null;
  }
  global[scope].init(
    Object.assign(
      {
        react: () => Promise.resolve().then(() => () => require("react")),
      },
      global.__webpack_require__ ? global.__webpack_require__.o : {}
    )
  );

  const Component = React.lazy(() =>
    global[scope].get(module).then((factory) => {
      const Module = factory();
      return Module;
    })
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component {...props} />
    </React.Suspense>
  );
};

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="http://localhost:8081/remoteEntry.js"></script>
    </Head>

    <div>
      <DynamicWidget scope="dog_admin" module="./DogName" name="Lucas" />
      <Dog />
    </div>
  </div>
);

export default Home;
