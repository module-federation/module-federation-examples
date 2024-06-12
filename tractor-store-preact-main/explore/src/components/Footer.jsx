import { h } from "preact";
import { IMAGE_SERVER } from "../utils";
import c from "./Footer.module.css";

export default () => {
  return (
    <footer class={c.footer} data-boundary="explore-footer">
      <link rel="stylesheet" href="/explore/static/client.css" />
      <div class={c.cutter}>
        <div class={c.inner}>
          <div class={c.initiative}>
            {/* please leave this part untouched */}
            <img
              src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
              alt="neuland - Büro für Informatik"
            />
            <p>
              based on{" "}
              <a
                href="https://micro-frontends.org/tractor-store/"
                target="_blank"
              >
                the tractor store 2.0
              </a>
              <br />a{" "}
              <a href="https://neuland-bfi.de" target="_blank">
                neuland
              </a>{" "}
              project
            </p>
          </div>

          <div class={c.credits}>
            {/* replace this details about your implementation and organization */}
            <h4>techstack</h4>
            <p>
              ssr, esi, custom elements, declarative shadow dom, preact,
              css-modules, mpa, no app shell
            </p>
            <p>
              build by{" "}
              <img
                src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
                alt="neuland - Büro für Informatik"
              />{" "}
              <a href="https://neuland-bfi.de" target="_blank">
                neuland
              </a>
              {" / "}
              <a
                href="https://github.com/neuland/tractor-store-preact"
                target="_blank"
              >
                github
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
