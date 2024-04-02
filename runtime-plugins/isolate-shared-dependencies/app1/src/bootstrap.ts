import("./index").then(({ mount }) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  mount({ parentContainer: container });
});
