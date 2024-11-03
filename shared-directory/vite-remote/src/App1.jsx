import React from 'react';
import file1Default from "shared/dir1/file1";
import {A} from "shared/file2";

export default function () {
  return (
    <div style={{ background: 'green', padding: 30 }}>
      remote:
      <br />
      shared/{file1Default}
      <br />
      shared/file2{A}
    </div>
  );
}
