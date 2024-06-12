import { h } from "preact";
import c from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav class={c.navigation}>
      <ul class={c.list}>
        <li class={c.item}>
          <a href="/products">Machines</a>
        </li>
        <li class={c.item}>
          <a href="/stores">Stores</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
