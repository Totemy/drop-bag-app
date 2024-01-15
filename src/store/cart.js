// store/cart.js

export default {
    namespaced: true,
    state: {
        isOpen: false,
        cartItems: [],
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            console.log('Added to cart:', product);
        },
        toggleCart(state) {
            state.isOpen = !state.isOpen;
        },
        addToCart(state, item) {
            state.cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            console.log('Added to cart:', item);
        },
        clearCart(state) {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
            console.log('Cleared cart');
        },
        removeFromCart(state, index) {
            state.cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            console.log('Removed from cart at index:', index);
        },
        SET_CART_ITEMS(state, items) {
            state.cartItems = items;
        },
    },
    getters: {
        cartItems: state => state.cartItems,
    },
    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        initializeCartFromLocalStorage({ commit }) {
            const storedCartItems = localStorage.getItem('cartItems');
            console.log(JSON.parse(storedCartItems));
            if (storedCartItems) {
                // Set the state directly to avoid cascade effect
                commit('SET_CART_ITEMS', JSON.parse(storedCartItems));
                console.log('Initialized cart from localStorage:', JSON.parse(storedCartItems));
            } else {
                console.log('No stored cart items found in localStorage');
            }
        },
    },
};
