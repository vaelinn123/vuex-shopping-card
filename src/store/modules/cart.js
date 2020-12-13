import shop from "@/api/shop";

export default {
  state: {
    items: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(
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
    }
  },
  actions: {
    //Leaving rootState in my destructure as a reminder that is how to access it for actions.
    addProductToCart({ commit, getters, state, rootState }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", cartItem);
        }
        commit("decrementProductInventory", product);
      }
    },
    checkout({ state, commit, rootState }) {
      shop.buyProducts(
        state.items,
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
    pushProductToCart(state, id) {
      state.items.push({ id: id, quantity: 1 });
    },
    incrementItemQuantity(state, cartItem) {
      //   const existingCartItem = state.items.find(item => item.id === cartItem.id);
      cartItem.quantity++;
    },
    emptyCart(state) {
      state.items = [];
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  }
};
