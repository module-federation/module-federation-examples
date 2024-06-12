import { h } from "preact";
import Navigation from "./Navigation";
import Fragment from "./Fragment";
import { IMAGE_SERVER } from "../utils";
import c from "./Header.module.css";

export default () => {
  return (
    <header class={c.header} data-boundary="explore-header">
      <link rel="stylesheet" href="/explore/static/client.css" />
      <div class={c.cutter}>
        <div class={c.inner}>
          <a class={c.link} href="/">
            <img
              class={c.logo}
              src={`${IMAGE_SERVER}/cdn/img/logo.svg`}
              alt="Micro Frontends - Tractor Store"
            />
          </a>
          <div class={c.navigation}>
            <Navigation />
          </div>
          <div class={c.cart}>
            <Fragment team="checkout" name="minicart" />
          </div>
        </div>
      </div>
    </header>
  );
};
