import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {
    // = computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        );
        console.log("product : ", product);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    productIsInStock(state) {
      return product => product.inventory > 0;
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
    addProductToCart({ commit, getters, state }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", cartItem);
        }
        commit("decrementProductInventory", product);
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "fail");
        }
      );
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
    },
    emptyCart(state) {
      state.cart = [];
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  }
});
