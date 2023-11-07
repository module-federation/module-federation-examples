import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div
      style={{
        border: 'solid',
        borderRadius: '10px',
        borderColor: '#0000ff',
      }}
    >
      <div>This is the Remote App hosted at localhost:8081)</div>
      <nav>
        <Link to="/invoices">Invoices</Link> | <Link to="/expenses">Expenses</Link>
      </nav>
      <Nav />
    </div>
  );
}

export default App;
