export default {
    namespaced: true,
    state: {
      isOpen: false,
      cartItems: [],
    },
    mutations: {
      ADD_TO_CART(state, product) {
        state.cartItems.push(product);
      },
      toggleCart(state) {
        state.isOpen = !state.isOpen;
      },
      addToCart(state, item) {
        state.cartItems.push(item);
      },
      clearCart(state) {
        state.cartItems = [];
      },
      removeFromCart(state, index) {
        state.cartItems.splice(index, 1);
      },
    },
    getters: {
      cartItems: state => state.cartItems,
    },
    actions: {
      addToCart({ commit }, product) {
        commit('ADD_TO_CART', product);
      },
    }
  };
  