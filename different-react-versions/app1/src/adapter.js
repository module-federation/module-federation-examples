const adapt = async (remoteImport) => {
  await __webpack_init_sharing__("modern");

  const container = window["app2"]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  console.log(__webpack_share_scopes__);
  await container.init(__webpack_share_scopes__.modern);
};

export default adapt;
