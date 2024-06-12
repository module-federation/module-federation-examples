import { h } from "preact";
import { Router } from "preact-router";
import ProductPage from "./pages/ProductPage";
import Fragment from "./components/Fragment";
import fetchData from "./fetchData";
import { useState, useCallback } from "preact/hooks";
import "./styles.css";

const App = ({ path, data }) => {
  const [state, update] = useState(data);
  const [initial, setInitial] = useState(true);

  const updateData = useCallback(
    async (url) => {
      // skip data fetching on initial render
      if (initial) {
        setInitial(false);
        return;
      }
      const api = url.current.type.api;
      const query = url.matches;
      const newData = await fetchData(api, { query });
      update(newData);
    },
    [initial]
  );

  return (
    <div data-boundary="decide-page">
      <Fragment team="explore" name="header" />
      <Router url={path} onChange={updateData}>
        <ProductPage path="/product/:id?" {...state} />
        <div default>
          <h1>404 Not Found {path}</h1>
        </div>
      </Router>
      <Fragment team="explore" name="footer" />
    </div>
  );
};

export default App;
