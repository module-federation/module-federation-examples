import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1> App-2 --- Home page</h1>
      <Link to={`page-2`}>App-2 - page-2</Link>
    </div>
  );
};

export default Home;
