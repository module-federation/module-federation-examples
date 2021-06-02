import { onErrorCaptured, ref } from "vue";

export default {
  name: "SuspenseWithErrors",
  setup() {
    const error = ref(null);

    onErrorCaptured((err) => (error.value = err));

    return {
      error,
    };
  },
  template: `
    <slot name="error" :error="error" v-if="error" />
    <Suspense v-else>
      <template #default>
        <slot name="default" />
      </template>
      <template #fallback>
        <slot name="fallback" />
      </template>
    </Suspense>
  `,
};
