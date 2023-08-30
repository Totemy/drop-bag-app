<template>
    <div class="category-sec">
        <h3>Categories</h3>
        <div class="row">
            <div class="col"  v-for="cat in Category" :key="cat.id">
                <div class="col">
                    <p>{{ cat.name }}</p>
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