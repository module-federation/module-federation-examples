import Markdown from '../Markdown';
import Page from '../Page';
import React from 'react';
import Welcome from '../docs/Welcome.md';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const loadLitElements = async () => {
  const retries = 5;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      await import('app_05/components');
      return;
    } catch (error) {
      if (attempt === retries - 1) {
        console.warn('[app_01] failed to load app_05/components', error);
        return;
      }
      await sleep(1000 * (attempt + 1));
    }
  }
};

const IndexPage = () => {
  React.useEffect(() => {
    loadLitElements();
  }, []);

  return (
    <Page title="Module Federation Demo">
      <alert-box id="info" content="Alert from LitElement"></alert-box>
      <Markdown>{Welcome}</Markdown>
      <action-button foo="Lit Element Action"></action-button>
    </Page>
  );
};

export default IndexPage;
