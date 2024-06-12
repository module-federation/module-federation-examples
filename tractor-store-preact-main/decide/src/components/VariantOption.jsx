import { h } from "preact";
import c from "./VariantOption.module.css";

export default ({ id, sku, name, selected, color }) => {
  const link = selected ? null : `/product/${id}?sku=${sku}`;
  return (
    <li class={c.root} style={`--variant-color: ${color}`}>
      <i class={c.color}></i>
      {link ? <a href={link}>{name}</a> : <strong>{name}</strong>}
    </li>
  );
};
