<template>
    <div>
        <div class="product-page">
            <ul class="product-page__list">
                <li v-for="product in Products" :key="product.id" class="catalog-item">
                    <div class="catalog-content">
                        <div class="product-page__img-wrap" @click="navigateToProduct(product.id)">
                            <img
                                :src="product.images[0]"
                                alt=""
                                class="product-page__img"
                            />
                        </div>
                        <div class="product-page__cart-wrap">
                            <div class="product-page__article">
                                <p class="catalog-subtitle">{{product.name}}</p>
                                <p class="catalog-price">{{ product.price }}грн</p>
                            </div>
                            <button type="button" class="btn btn__details"
                                    @click="navigateToProduct(product.id)"
                            >
                                Детальніше
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
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