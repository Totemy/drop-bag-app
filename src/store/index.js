import Vue from "vue";
import Vuex from "vuex";
import cartModule from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {cart: cartModule,},
});
