import { html } from "../utils.js";

export default ({
  href,
  type,
  value,
  disabled,
  rounded,
  className,
  children,
  dataId,
  variant = "secondary",
}) => {
  const tag = href ? "a" : "button";
  return html` <${tag}
    ${disabled ? "disabled" : ""}
    ${href ? `href="${href}"` : ""}
    ${type ? `type="${type}"` : ""}
    ${value ? `value="${value}"` : ""}
    ${dataId ? `data-id="${dataId}"` : ""}
    class="e_Button e_Button--${variant} ${className} ${rounded ? "e_Button--rounded" : ""}"
    ontouchstart
  >
    <div class="e_Button__inner">${children}</div>
  </${tag}>`;
};
