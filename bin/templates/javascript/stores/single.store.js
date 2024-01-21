import { defineStore } from "pinia";
export const [store-name] = defineStore("[store]", {
  state: () => ({
    items: {},
    uiFlags: {
      isLoading: false,
      isSubmitting: false,
    },
  }),
  getters: {
    getData(state) {
      return state.items;
    },
    getUiFlags(state) {
      return state.uiFlags;
    },
  },
  actions: {
   
  },
});
