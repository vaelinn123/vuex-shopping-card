import shop from "@/api/shop";
export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter(product => product.inventory > 0);
    },
    productIsInStock(state) {
      return product => product.inventory > 0;
    }
  },
  mutations: {
    // Setting and updating state
    setProducts(state, products) {
      // update products
      state.items = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
      //   const existingProduct = state.items.find(
      //     productToFind => productToFind.id === product.id
      //   );
      //   existingProduct.inventory--;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        // api call to get products
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
  }
};
