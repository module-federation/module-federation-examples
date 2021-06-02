import { computed, ref } from "vue";
import ReactDOMServer from "react-dom/server";

async function fetchImport() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = (await import("home/Button")).default;
      resolve(
        ReactDOMServer.renderToString(
          res({
            caption: "React Button in vue",
          })
        )
      );
    } catch (err) {
      reject(err);
    }
  });
}

export default {
  name: "Layout",
  async setup() {
    const data = ref(null);

    data.value = await fetchImport();

    return {
      button: computed(() => {
        return data.value;
      }),
    };
  },
  template: `
    <div class="layout-app">
        <div class="app-label">
        <h1>home App vue based</h1>
        # Hosting App [vue based]
        </div>
        <h1>Layout App react based</h1>
        <div class="remote-component">
        <div class="app-label">
            #remote-component [REMOTE]
        </div>
        </div>  
        <div v-html="button"></div>
  </div>
  `,
};
