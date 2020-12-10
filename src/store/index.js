import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: []
  },
  getters: {
    // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  actions: {
    // = methods, meant to expose functionality through the same functions everywhere in the application
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        // api call to get products
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
    //Does not work for some reason, the wait works but the spinner does not display, just blank page with title for the timeout duration.
    // async fetchProducts({ commit }) {
    //   // api call to get products
    //   await shop.getProducts(products => commit("setProducts", products));
    //   console.log("done");
    // }
  },
  mutations: {
    // Setting and updating state
    setProducts(state, products) {
      // update products
      state.products = products;
    }
  }
});
