import '../styles/globals.css';
import dynamic from 'next/dynamic';
console.log(__webpack_share_scopes__);
const App = dynamic(
  async () => {
    return import('../async-pages/_app');
  },
  {
    ssr: false,
  },
);

function MyApp(props) {
  return <App {...props} />;
}

export default MyApp;
