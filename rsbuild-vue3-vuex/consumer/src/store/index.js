import { createStore } from "vuex";
import { remoteStore } from "@remote/store";

const searchInput = {
  state: {
    queryData: null,
  },
  mutations: {},
};

export default (app) =>
  createStore({
    ...remoteStore,
  });
