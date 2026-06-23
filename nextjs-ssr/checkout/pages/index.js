import HomePage from 'home/home';
const Home = HomePage;
console.log('SSS', __webpack_share_scopes__);
console.log(Home);
Home.getInitialProps = HomePage.getInitialProps;
export default Home;
