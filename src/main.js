import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { DataService } from './services/DataService';
const jsonData = require('./json/products.json');

DataService.setData(jsonData);
// import "bootstrap";

import firebase from "@/firebase";
import "firebase/firestore";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  firebase,
  render: (h) => h(App),
}).$mount("#app");
