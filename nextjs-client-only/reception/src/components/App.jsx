import { Router } from "react-router-dom";
import Reception from "./Reception";

export default function App({ history }) {
  return (
    <Router history={history}>
      <Reception />
    </Router>
  );
}
