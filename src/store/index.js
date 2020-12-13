import Vuex from "vuex";
import Vue from "vue";
import cart from "./modules/cart";
import products from "./modules/products";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    products
  },
  // state === data
  state: {},
  // getters === computed properties
  getters: {},
  // actions === methods, meant to expose functionality through the same functions everywhere in the application
  actions: {},
  mutations: {}
});
