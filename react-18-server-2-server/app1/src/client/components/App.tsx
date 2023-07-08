import React from 'react';
import { Helmet } from 'react-helmet';
import type { ContentProps } from 'app2/Content';
import type { UserDTO } from 'app2/userRoute';

const Content = React.lazy(
  () => import('app2/Content') as Promise<{ default: React.FC<ContentProps> }>,
);

const fetchUserData = async () => {
  // fetch the data from its own server (localhost:3000)
  const response = await fetch('/api/user');
  return response.json();
};

const App = () => {
  const [state, setState] = React.useState<string>('');
  const [userInfo, setUserInfo] = React.useState<UserDTO>();

  React.useEffect(() => {
    // IIEF
    (async () => {
      const userData = await fetchUserData();
      setUserInfo(userData);
    })();
  }, []);

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #fc451e',
      }}
    >
      <Helmet>
        <title>SSR MF Example</title>
      </Helmet>

      <div style={{ padding: '1rem' }}>
        <h1>Module Federation Example: Server Side Rendering</h1>

        <h2>This is the App 1 application.</h2>

        <p>You can try to disable JavaScript and reload the page.</p>
      </div>

      <div style={{ padding: '1rem' }}>
        <h3>User info</h3>

        {!userInfo && <p>loading user info...</p>}
        {userInfo && (
          <>
            <p data-e2e="ID">ID: {userInfo.id}</p>
            <p data-e2e="Name">Name: {userInfo.name}</p>
            <p data-e2e="Company">Company: {userInfo.company}</p>
          </>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <h3>Type something into this input</h3>
        <input
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="Luke, I am your father..."
        />
      </div>

      <React.Suspense fallback={<h1>Loading....</h1>}>
        <Content content={state} />
      </React.Suspense>
    </div>
  );
};

export default App;
