import React from 'react';
import moment from 'moment';

export default function Widget() {
  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '2em',
        backgroundColor: 'red',
        color: 'white',
      }}
      data-e2e="APP_2__WIDGET"
    >
      <h2>App 2 Widget</h2>
      <p>
        App2 Moment Dep ({moment.version}): {moment().format('MMMM Do YYYY, h:mm:ss a')}
      </p>
    </div>
  );
}
