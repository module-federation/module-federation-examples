import React, { useState } from 'libs/react';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main>
      <h1>Remote 1's counter: {counter}</h1>
      <button onClick={() => setCounter(counter => counter + 1)}>increment</button>
    </main>
  );
};

export default App;
