import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: [],
    cart: []
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
    },
    //Does not work for some reason, the wait works but the spinner does not display, just blank page with title for the timeout duration.
    // async fetchProducts({ commit }) {
    //   // api call to get products
    //   await shop.getProducts(products => commit("setProducts", products));
    //   console.log("done");
    // }
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(
          item => item.id === product.id
        );
        if (!cartItem) {
          context.commit("pushProductToCart", product.id);
        } else {
          context.commit("incrementItemQuantity", cartItem);
        }
        context.commit("decrementProductInventory", product);
      }
    }
  },
  mutations: {
    // Setting and updating state
    setProducts(state, products) {
      // update products
      state.products = products;
    },
    pushProductToCart(state, id) {
      state.cart.push({ id: id, quantity: 1 });
    },
    incrementItemQuantity(state, cartItem) {
      //   const existingCartItem = state.cart.find(item => item.id === cartItem.id);
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
      //   const existingProduct = state.products.find(
      //     productToFind => productToFind.id === product.id
      //   );
      //   existingProduct.inventory--;
    }
  }
});
