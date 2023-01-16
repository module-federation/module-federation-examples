import { initFederation } from "@softarc/native-federation";

(async () => {
  await initFederation({
    remote: "http://localhost:4174/remoteEntry.json",
  });

  await import("./bootstrap");
})();
