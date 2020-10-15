//loading homePage from app4 statically
import { App4HomePage } from "app4/home";

export function App3Homepage() {
  return (
    <div>
      <p>App3 home page</p>
      <App4HomePage />
    </div>
  );
}
