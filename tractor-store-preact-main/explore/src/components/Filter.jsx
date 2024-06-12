import { h } from "preact";
import c from "./Filter.module.css";

export default ({ filters }) => {
  return (
    <div class={c.filter}>
      Filter:
      <ul>
        {filters.map((f) =>
          f.active ? (
            <li class={c.active}>{f.name}</li>
          ) : (
            <li>
              <a href={f.url}>{f.name}</a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
