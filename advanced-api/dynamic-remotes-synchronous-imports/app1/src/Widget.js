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
      data-e2e="APP_1__WIDGET"
    >
      <h2>App 1 Widget</h2>
      <p>
        Moment shouldn't download twice, the host has no moment.js <br />{' '}
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
      </p>
    </div>
  );
}
