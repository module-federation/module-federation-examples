import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  hashbang: false,
  mode: "history",
  history: createWebHistory("/"),
  base: "/",
  routes,
});

export default router;
