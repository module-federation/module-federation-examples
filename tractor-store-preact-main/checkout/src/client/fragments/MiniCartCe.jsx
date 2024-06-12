import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import MiniCart from "../../components/MiniCart";
import fetchData from "../../fetchData";

const MiniCartCe = ({}, initialState) => {
  const [state, setState] = useState(initialState);
  const [highlight, setHighlight] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(async () => {
    const fetchCartData = async () => {
      const data = await fetchData(MiniCart.api);
      setState(data);
    };

    const handleCartUpdated = async () => {
      await fetchCartData();
      setHighlight(true);
      setTimeout(() => setHighlight(false), 600);
    };

    window.addEventListener("checkout:cart-updated", handleCartUpdated);

    console.log("MiniCartCe", isInitialRender.current, state.quantity);
    if (isInitialRender.current && state.quantity) {
      isInitialRender.current = false;
    } else {
      fetchCartData();
    }

    return () => {
      window.removeEventListener("checkout:cart-updated", handleCartUpdated);
    };
  }, []);

  return <MiniCart {...state} highlight={highlight} />;
};

MiniCartCe.propTypes = {};

export default MiniCartCe;
