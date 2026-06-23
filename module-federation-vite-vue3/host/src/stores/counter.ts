import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({ count: 0 }),
  getters: {
    getCount(): number {
      return this.count;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

declare global {
  interface Window {
    useStore: typeof useStore;
  }
}
window.useStore = useStore;
