import React from 'react';
import ReactDOM from 'react-dom/client';
import file1Default from "shared/dir1/file1";
import {A} from "shared/file2";
import ViteApp from "viteRemote/App1"

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <div style={{ background: 'yellow', padding: 30 }}>
      host:
      <br />
      shared/{file1Default}
      <br />
      shared/file2{A}
    </div>
    <hr />
    <ViteApp />
  </React.StrictMode>
);
