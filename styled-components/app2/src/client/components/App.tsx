import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Content from './Content';

export const Container = styled.div`
  border: 4px dashed #fc451e;
  border-radius: 0.25px;
`;

export const DivWithPadding = styled.div`
  padding: 1rem;
`;

const App = () => {
  const [state, setState] = React.useState<string>('');

  return (
    <Container>
      <Helmet>
        <title>SSR MF Example</title>
      </Helmet>

      <DivWithPadding>
        <h1>Module Federation Example: Styled Components</h1>

        <h2>This is the App 2 application.</h2>

        <p>You can try to disable JavaScript and reload the page.</p>
      </DivWithPadding>

      <DivWithPadding>
        <h3>Type something into this input</h3>
        <input
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="Luke, I am your father..."
        />
      </DivWithPadding>

      <DivWithPadding>
        <Content content={state} />
      </DivWithPadding>
    </Container>
  );
};

export default App;
