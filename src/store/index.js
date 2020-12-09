import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

new Vuex.Store({
  state: {
    // = data
    products: []
  },
  getters: {
    // = computed properties
    productsCount() {
      //length of products array
    }
  },
  actions: {
    // = methods
    fetchProducts() {
      // api call to get products
    }
  },
  mutations: {
    // Setting and updating state
    setProducts() {
      // update products
    }
  }
});
