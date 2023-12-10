<template>
    <div class="products">
        <h3>Товари</h3>
        <div class="row">
            <div class="col-4" v-for="prod in Products" :key="prod.id">
              <div class="card">

              </div>
                <img class="card__img" :src="prod.image" >
                <div class="card__details">
                    <button @click="
                addToCart({
                  id: prod.id,
                  name: prod.name,
                  price: prod.price,
                  image: prod.image,
                  qte: qte,
                })
              ">До кошика</button>
              <button :to="{
                name: 'Product',
                params: {
                  id: prod.id,
                  name: prod.name,
                  image: prod.image,
                  price: prod.price,
                  desc: prod.description,
                },
              }">
                Відsssкрити
              </button>
              <div >
                <div>
                    {{ prod.name }}
                </div>
                <div>
                    {{ prod.price }} hrn
                </div>
              </div>
                </div>
            </div>
        </div>
        <div class="row" ref="resultsSection" v-if="filteredProducts.length > 0">
            <div class="col"  v-for="item in filteredProducts"
        :key="item.id">
                <img :src="item.image">
                <button @click="
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  qte: qte,
                })
              ">
                    fill
                </button>
                <button 
                    :to="{
                    name: item.name,
                    params: {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    desc: item.description,
                    },
                }">

                </button>
                <div>
                    <h4>{{ item.name }}</h4>
                    <h5>{{ item.price }} hrn</h5>
                </div>
            </div>
        </div>
        <div class="row" v-else ref="resultsSection">

        </div>
    </div>
</template>
<script>
import {
  getFirestore,
  query,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Products",
  data() {
    return {
      qte: 1,
      Products: [],
      filteredProducts: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
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
          image: doc.data().picture[0],
        });
      });
    },
    addToCart(product) {
      this.$root.$emit("addToCart", product);
    },
    onFilteredProds(Products) {
      this.filteredProducts = Products;
      this.scrollToResults();
    },
    scrollToResults() {
      const resultsSection = this.$refs.resultsSection;
      resultsSection.scrollIntoView({ behavior: "smooth" });
    },
  },
  mounted() {
    this.$root.$on("filtered-Products", this.onFilteredProds);
  },
  beforeUnmount() {
    this.$root.$off("filtered-Products", this.onFilteredProds);
  },
};
</script>