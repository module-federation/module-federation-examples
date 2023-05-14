import React from 'react';
import moment from 'moment';
import { Routes, Route, Link } from 'react-router-dom';

export default function Widget() {
  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '2em',
        backgroundColor: 'pink',
      }}
      data-e2e="APP_2__WIDGET"
    >
      <Routes>
        <Route path='/' element= {
          <>
            <h2>App 2 Widget</h2>
            <p>App2 Moment Dep ({moment.version}): {moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
            <br />
            <Link to='childpath'>Go to child using link</Link>
            <br />
            <br />
          </>
        }/>
        <Route path='/childpath/*' element={
          <><h1>This is the child component app</h1>
          <Link to='..'>Go to back using link</Link>
        </>} />
        <Route path='*' element= { <h1>Wrong Spot</h1> }/>
      </Routes>
    </div>
  );
}
