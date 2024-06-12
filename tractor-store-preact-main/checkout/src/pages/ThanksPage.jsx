import { h } from "preact";
import c from "./ThanksPage.module.css";
import Button from "../components/Button";

const ThanksPage = () => {
  return (
    <main class={c.root}>
      <h2 class={c.title}>Thanks for your order!</h2>
      <p class={c.text}>We'll notify you, when its ready for pickup.</p>
      <Button href="/" variant="secondary">
        Continue Shopping
      </Button>
    </main>
  );
};

ThanksPage.api = null;

export default ThanksPage;
