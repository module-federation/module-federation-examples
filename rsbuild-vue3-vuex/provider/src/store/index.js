import { createStore } from "vuex";

export const remoteStore = {
  state: {
    userData: null,
  },
  mutations: {
    ["setUserData"](state, payload) {
      state.userData = payload;
    },
  },
  actions: {
    ["getUserData"]({ commit }) {
      commit("setUserData", "emad");
    },
  },
};

export default createStore({ ...remoteStore, modules: {} });
