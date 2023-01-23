import React from 'react';
import reactLogo from './assets/react.svg';
import './App.css'


import Header from 'nav/Header';

function App() {

  return (
    <div className="App">
      <div>
        <Header />
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>      
    </div>
  )
}

export default App
