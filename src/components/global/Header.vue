<template>
    <div>
        
    </div>
</template>
<script>
import db from "@/firebase.js";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      showCart: false,
      cartItems: [],
      total: 0,
      cat: {
        name: "",
      },
      Category: [],
      DataCatID: {
        name: "",
        id: "",
      },
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    this.$root.$on("addToCart", (product) => {
      const res = this.cartItems.find((item) => item.id === product.id);
      if (res) {
        res.qte++;
      } else {
        this.cartItems.push(product);
      }
    });
  },
  methods: {
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    calculerTotal() {
      this.total = 0;
      this.cartItems.forEach((prod) => {
        this.total += prod.price * prod.qte;
      });
      return this.total;
    },
    AddCat() {
      const db = getFirestore();
      addDoc(
        collection(db, "categories"),
        {
          name: this.cat.name,
          //  uid : this.prod.uid,
        },
        location.reload()
      );
    },
    GetOneCategory(id, name) {
      this.DataCatID.name = name;
      this.DataCatID.id = id;
    },
    async EditCategory() {
      const washingtonRef = doc(db, "categories", this.DataCatID.id);
      await updateDoc(washingtonRef, {
        name: this.DataCatID.name,
      })
        .then(() => {
          console.log("updated");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async DeleteCat(id) {
      const db = getFirestore();
      await deleteDoc(doc(db, "categories", id))
        .then(() => {
          console.log("deleted");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCategory() {
      const db = getFirestore(),
        q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);
      this.Category = [];
      querySnapshot.forEach((doc) => {
        this.Category.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    },
  },
  watch: {
    cartItems: {
      handler() {
        this.calculerTotal();
      },
      deep: true,
    },
  },
};
</script>