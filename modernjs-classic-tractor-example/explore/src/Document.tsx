import React, { useContext } from 'react';
import {
  Html,
  Root,
  Head,
  Body,
  DocumentContext,
} from '@modern-js/runtime/document';

export default function Document(): React.ReactElement {
  // the params provide by DocumentContext
  const {
    config: { output: htmlConfig },
    entryName,
    templateParams,
  } = useContext(DocumentContext);

  return (
    <Html>
      <Head />
      <Body data-boundary="explore-page">
        <Root rootId="root">
          <h1 style={{ color: 'red' }}>Some Params: </h1>
          <h2>entryName: {entryName}</h2>
          <h2>title: {htmlConfig.title}</h2>
          <h2>rootId: {templateParams.mountId}</h2>
        </Root>
      </Body>
    </Html>
  );
}
