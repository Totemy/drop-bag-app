export default {
    namespaced: true,
    state: {
      cartItems: [],
    },
    mutations: {
      addToCart(state, product) {
        state.cartItems.push(product);
      },
    },
  };
  