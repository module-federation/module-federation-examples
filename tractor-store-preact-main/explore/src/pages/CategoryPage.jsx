import { h } from "preact";
import Filter from "../components/Filter.jsx";
import Product from "../components/Product.jsx";
import c from "./CategoryPage.module.css";

const CategoryPage = ({ title = "", products = [], filters = [] }) => {
  return (
    <main class={c.page}>
      <h2>{title}</h2>
      <div class={c.subline}>
        <p>{products.length} products</p>
        <Filter filters={filters} />
      </div>
      <ul class={c.list}>{products.map(Product)}</ul>
    </main>
  );
};

CategoryPage.api = "/category";

export default CategoryPage;
