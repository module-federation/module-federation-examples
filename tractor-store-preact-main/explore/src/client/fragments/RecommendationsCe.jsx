import { h } from "preact";
import Recommendations from "../../components/Recommendations";
import { useEffect, useState, useRef } from "preact/hooks";
import fetchData from "../../fetchData";

const RecommendationsCe = ({ skus }, initialState) => {
  const [state, setState] = useState(initialState);
  const isInitialRender = useRef(true);

  useEffect(async () => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (!skus) return;

    const data = await fetchData(Recommendations.api, { query: { skus } });
    setState(data);
  }, [skus, isInitialRender.current]);

  return <Recommendations {...state} />;
};

RecommendationsCe.propTypes = {
  skus: String,
};

export default RecommendationsCe;
