<template>
    <div class="category-sec">
      <div class="caegory">
        <h3>Категорії</h3>
        <div class="row">
            <div class="col-4"  v-for="cat in Category" :key="cat.id">
                <div class="">
                  <div class="category__card">
                    <p class="category__text">{{ cat.name }}</p>
                    <img class="category__image" :src="cat.image" />
                  </div>
                </div>
            </div>
        </div>
      </div>
        
    </div>
</template>
<script>
import { collection, getFirestore, query, getDocs } from "firebase/firestore";
export default {
  name: "CategSec",
  data() {
    return {
      Category: [],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const db = getFirestore(),
        q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);
      this.Category = [];
      querySnapshot.forEach((doc) => {
        this.Category.push({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
        });
      });
    },
  },
};
</script>