import { h } from "preact";
import Fragment from "../components/Fragment";
import { src, srcset } from "../utils.js";
import c from "./HomePage.module.css";

const HomePage = ({ teaser = [] }) => {
  return (
    <main class={c.page}>
      {teaser.map(({ title, image, url }) => (
        <a class={c.categoryLink} href={url}>
          <img
            src={src(image, 500)}
            srcet={srcset(image, [500, 1000])}
            sizes="100vw, (min-width: 500px) 50vw"
            alt={title}
          />
          {title}
        </a>
      ))}
      <div class={c.recommendations}>
        <Fragment
          team="explore"
          name="recommendations"
          skus="CL-06-MT,AU-02-OG"
        />
      </div>
    </main>
  );
};

HomePage.api = "/home";

export default HomePage;
