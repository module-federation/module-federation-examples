import { html } from "../utils.js";

export default () => {
  return html`
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/cdn/img/meta/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/cdn/img/meta/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/cdn/img/meta/favicon-16x16.png"
    />
    <link rel="manifest" href="/cdn/img/meta/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/cdn/img/meta/safari-pinned-tab.svg"
      color="#ff5a55"
    />
    <link rel="shortcut icon" href="/cdn/img/meta/favicon.ico" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta
      name="msapplication-config"
      content="/cdn/img/meta/browserconfig.xml"
    />
    <meta name="theme-color" content="#ffffff" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  `;
};
