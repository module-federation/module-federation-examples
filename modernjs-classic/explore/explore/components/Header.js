import MiniCart from "../../checkout/components/MiniCart.js";
import Navigation from "./Navigation.js";
import { html, IMAGE_SERVER } from "../utils.js";

/**
 * Header component.
 * @param {object} props - The properties of the Header component.
 * @param {HonoContext} props.c - The hono context.
 * @returns {string} The Header component markup.
 */
export default ({ c }) => {
  return html`<header class="e_Header" data-boundary="explore-header">
    <div class="e_Header__cutter">
      <div class="e_Header__inner">
        <a class="e_Header__link" href="/">
          <img
            class="e_Header__logo"
            src="${IMAGE_SERVER}/cdn/img/logo.svg"
            alt="Micro Frontends - Tractor Store"
          />
        </a>
        <div class="e_Header__navigation">${Navigation()}</div>
        <div class="e_Header__cart">${MiniCart({ c })}</div>
      </div>
    </div>
  </header>`;
};
