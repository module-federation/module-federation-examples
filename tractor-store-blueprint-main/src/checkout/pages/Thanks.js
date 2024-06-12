import Page from "../components/Page.js";
import Header from "../../explore/components/Header.js";
import { html } from "../utils.js";
import Footer from "../../explore/components/Footer.js";
import Button from "../components/Button.js";

/**
 * Thanks component.
 * @param {object} props - The properties of the Thanks component.
 * @param {HonoContext} props.c - The hono context.
 * @returns {string} The Thanks component markup.
 */
export default ({ c }) => {
  const content = html`
    ${Header({ c })}
    <main class="c_Thanks">
      <h2 class="c_Thanks__title">Thanks for your order!</h2>
      <p class="c_Thanks__text">We'll notify you, when its ready for pickup.</p>

      ${Button({
        href: "/",
        children: "Continue Shopping",
        variant: "secondary",
      })}
    </main>
    ${Footer()}
  `;
  return Page({ content });
};
