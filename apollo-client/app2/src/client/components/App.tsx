import React from 'react';
import { Helmet } from 'react-helmet';

import PokemonList from './PokemonList';

const App = () => {
  const [limit, setLimit] = React.useState<number>(10);
  const [offset, setOffset] = React.useState<number>(0);

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #fc451e',
      }}
    >
      <Helmet>
        <title>React 18 + Apollo Client</title>
      </Helmet>

      <div style={{ padding: '1rem' }}>
        <h1>Module Federation Example: React 18 + Apollo Client</h1>

        <h2>This is the App 2 application.</h2>
      </div>

      <div style={{ padding: '1rem' }}>
        <h2>Change the request params</h2>

        <label htmlFor="limit">Limit {limit}</label>
        <input
          id="limit"
          name="limit"
          type="range"
          min="1"
          max="100"
          defaultValue={limit}
          onMouseUp={e => setLimit(e.currentTarget.valueAsNumber)}
          onTouchEnd={e => setLimit(e.currentTarget.valueAsNumber)}
        />

        <label htmlFor="offset">Offset {offset}</label>
        <input
          id="offset"
          name="offset"
          type="range"
          min="1"
          max="100"
          defaultValue={offset}
          onMouseUp={e => setOffset(e.currentTarget.valueAsNumber)}
          onTouchEnd={e => setOffset(e.currentTarget.valueAsNumber)}
        />
      </div>

      <div style={{ padding: '1rem' }}>
        <PokemonList limit={limit} offset={offset} />
      </div>
    </div>
  );
};

export default App;
