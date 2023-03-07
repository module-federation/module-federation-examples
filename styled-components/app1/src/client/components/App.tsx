import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Content, Title, Paragraph } from 'app2/Content';
// const Content = require('app2/Content').default;

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
        <Title size="lg" color="black">
          Module Federation Example: Styled Components
        </Title>

        <Title color="black">This is the App 1 application.</Title>

        <Paragraph>You can try to disable JavaScript and reload the page.</Paragraph>
      </DivWithPadding>

      <DivWithPadding>
        <Title size="sm" color="blue">
          Type something into this input
        </Title>

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
