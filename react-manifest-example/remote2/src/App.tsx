import React from 'react';
import { BrowserRouter, Routes, Route, MemoryRouter, Link } from 'react-router-dom';
import './App.css';
import { Image } from 'antd';

function Home(){
  return <div>hello sub2 home page</div>
}

function Detail(){
  return <>
   <div>hello sub2 detail page</div>
    <Image
      width={200}
      src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
    />
  </>
}

const App = (info: {abc?: number}) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/detail">Detail</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/detail" Component={Detail}/>
      </Routes>
    </>
  );
};

export default App;
