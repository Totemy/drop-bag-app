<template>
      <div class="category">
        <h3>Категорії</h3>
        <div class="row">
            <div class="col-4"  v-for="cat in Category" :key="cat.id">
                <div class="" >
                  <div class="category__card" @click="navigateToCategory(cat.id)">
                    <p class="category__text">{{ cat.name }}</p>
                    <img class="category__image" :src="cat.image" />
                  </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4"  v-for="local in localData" :key="local.id">
                <div class="" >
                  <div class="category__card" @click="navigateToCategory(local.id)">
                    <p class="category__text">{{ local.name }}</p>
                    <img class="category__image" :src="local.image" />
                  </div>
                </div>
            </div>
        </div>
      </div>
</template>
<script>
import { getCategory } from '@/services/FirebaseDataService'
import { DataService, EventBus } from '@/services/DataService';

export default {
  name: "CategSec",
  data() {
    return {
      Category: [],
        localData:[]
    };
  },
  created() {
    this.getCategory();
    this.getLocalData();
  },
  methods: {
    async getCategory() {
      this.Category = await getCategory()
    },
      getLocalData(){
          this.localData = DataService.data.categories;
          EventBus.$on('data-updated', (newData) => {
              this.localData = newData.categories;
          });
      },
    navigateToCategory(categoryId) {
      this.$router.push({ name: 'CategoryPage', params: { categoryId } });
      this.catOpen = false; 
      },
  },
};
</script>