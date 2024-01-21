import { defineStore } from "pinia";
import [api-class] from "[api-path]";
import { toRaw } from "vue";
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
    async get(filter = {}) {
      let options = {};
      if (Object.keys(filter).length) {
        options = {
          params: {
            ...filter,
          },
        };
      }
      this.uiFlags.isLoading = true;
      try {
        const response = await [api-class].get(options, "list");
        this.items = response.data.data;
      } catch (e) {
        throw new Error(e);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    async delete(id) {
      const options = {
        id,
      };
      try {
        await [api-class].create(options, "delete");
        const filteredData = toRaw(this.items).data.filter((el) => {
          return el.id != id;
        });
        this.items.data = [...filteredData];
      } catch (e) {
        throw new Error(e);
      } finally {
        this.uiFlags.isLoading = false;
      }
    },
    async add(data) {
      try {
        this.uiFlags.isSubmitting = true;
        console.log("adding...");
        await [api-class].post(data, "add");
      } catch (e) {
        throw new Error(e);
      } finally {
        this.uiFlags.isSubmitting = false;
      }
    },
    async update(data) {
      try {
        this.uiFlags.isSubmitting = true;
        await [api-class].post(data, "update");
      } catch (e) {
        throw new Error(e);
      } finally {
        this.uiFlags.isSubmitting = false;
      }
    },
  },
});
