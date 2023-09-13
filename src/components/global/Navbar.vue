<template>
    <div class="topbar">
        <div class="row">
            <div class="col">
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="">Help</a>
                <a href="">FAQs</a>
            </div>
            <div class="col">
                <div class="dropdown">
                    <button @click="isOpen = !isOpen" class="btn btn-secondary dropdown-toggle" type="button">
                        My Account
                    </button>
                    <ul  v-if="isOpen">
                        <router-link to="/login"><button  v-if="user == null">Sign In</button></router-link>
                        <router-link to="/register"><button v-if="user == null">Sign Up</button></router-link>
                        <button  v-if="user" @click="logout()">Sign Out</button>
                        <router-link to="/dash">Admin</router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import router from "../../router";
import {
  getFirestore,
  query,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "navbar",
  data() {
    return {
      user: null,
      searchProduct: "",
      filteredProducts: [],
      Products: [],
      isOpen: false
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        this.user = userAuth;
      } else {
        this.user = null;
      }
    });
    this.getProducts();
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("User");
          router.push({
            name: "login",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getProducts() {
      const sousCollectionRef = query(collectionGroup(db, `products`));
      const sousCollectionSnapshot = await getDocs(sousCollectionRef);
      this.Products = [];
      sousCollectionSnapshot.forEach((doc) => {
        this.Products.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
        });
      });
    },
    filterItems() {
      this.filteredProducts = this.Products.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(this.searchProduct.toLowerCase());
      });
      this.$root.$emit("filtered-Products", this.filteredProducts);
    },
  },
};
</script>