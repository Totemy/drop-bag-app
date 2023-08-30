<template>
    <div class="offer">
        <div class="row">
            <div class="col">
                <h6>Save 20%</h6>
                <h3> Special offer</h3>
                <button>
                    Shop now
                </button>
            </div>
            <div class="col">
                <h6>Save 20%</h6>
                <h3> Special offer</h3>
                <button>
                    Shop now
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { collection, getFirestore, query, getDocs } from "firebase/firestore";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Offer",
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