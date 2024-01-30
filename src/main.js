import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { DataService } from './services/DataService';
const products = require('./json/products.json');
const categories = require('./json/categories.json');

DataService.setData({
  products: products,
  categories: categories
});

Vue.config.productionTip = false;


store.dispatch('cart/initializeCartFromLocalStorage');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
