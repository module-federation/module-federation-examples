import HomePage from 'home/pages/index';
console.log('homepage', HomePage)
const Home = HomePage;
Home.getInitialProps = HomePage.getInitialProps;
export default Home;
