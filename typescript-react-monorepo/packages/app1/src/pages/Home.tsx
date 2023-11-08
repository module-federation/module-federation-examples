import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1> App-1 --- Home page</h1>
      <Link to={`page-2`}>App-1 - page-2</Link>
    </div>
  );
};

export default Home;
