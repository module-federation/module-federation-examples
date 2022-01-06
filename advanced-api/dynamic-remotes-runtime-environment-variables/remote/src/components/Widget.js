import React, { useContext } from 'react';
import moment from 'moment';
import { EnvContext } from './WidgetWrapper';

const Widget = () => {
  const ENV = useContext(EnvContext);

  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '2em',
        backgroundColor: 'purple',
        color: 'white',
      }}
    >
      <h2>Remote Widget</h2>
      <h2>My env is {ENV.API_URL}</h2>
      <p>
        Using <strong>momentjs</strong> for format the date
      </p>
      <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  );
};

export default Widget;
