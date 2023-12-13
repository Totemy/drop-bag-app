export default {
    namespaced: true,
    state: {
      isOpen: false,
      cartItems: [],
    },
    mutations: {
      ADD_TO_CART(state, product) {
        // Modify the state to add the product to the cart
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
    },
    getters: {
      cartItems: state => state.cartItems,
    },
    actions: {
      addToCart({ commit }, product) {
        // Perform necessary actions, e.g., committing a mutation
        commit('ADD_TO_CART', product);
      },
    }
  };
  