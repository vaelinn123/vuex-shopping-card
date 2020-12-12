import shop from "@/api/shop";

export default {
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
};
