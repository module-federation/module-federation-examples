import { Router, Link } from "react-router-dom";
import Chat from "./Chat";

export default function App({ history }) {
  return (
    <Router history={history}>
      <Chat />
      <hr />
      <Link to="/">Go to reception</Link>
    </Router>
  );
}
 