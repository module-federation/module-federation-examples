import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Image } from 'antd';

function Home() {
  return <div>hello sub home page</div>;
}
function Detail() {
  return (
    <>
      <div>hello sub detail page</div>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </>
  );
}

const App = (info?: { abc?: string }) => {
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
        <Route path="/" Component={Home} />
        <Route path="/detail" Component={Detail} />
      </Routes>
    </>
  );
};

export default App;
