<template>
    <div class="category-sec">
      <div class="caegory">
        <h3>Categories</h3>
        <div class="row">
            <div class="col-2"  v-for="cat in Category" :key="cat.id">
                <div class="">
                  <div class="category__card">
                    <p>{{ cat.name }}</p>
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
        });
      });
    },
  },
};
</script>