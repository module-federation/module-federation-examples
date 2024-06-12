import { h } from "preact";
import c from "./Button.module.css";

export default ({
  href,
  type,
  value,
  disabled,
  rounded,
  extraClass = "",
  children,
  dataId,
  size = "normal",
  variant = "secondary",
  title,
  ...rest
}) => {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      disabled={disabled}
      href={href}
      type={type}
      value={value}
      data-id={dataId}
      title={title}
      class={[
        c.root,
        c[variant],
        extraClass,
        rounded ? c.rounded : "",
        c[size],
      ].join(" ")}
      {...rest}
    >
      <div class={c.inner}>{children}</div>
    </Tag>
  );
};
