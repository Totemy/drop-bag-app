<template>
  <div class="home">
    <FeaturesComponent/>
    <CategorySec/>
    <ProductSec />

  </div>
</template>

<script>
// @ is an alias to /src
import FeaturesComponent from "@/components/FeaturesComponent.vue";
import CategorySec from "@/components/CategorySec.vue";
import ProductSec from "@/components/ProductsSec.vue";
//import OfferSec from "@/components/Offer.vue";

export default {
  name: 'HomeView',
  components: {
    FeaturesComponent,
    CategorySec,
    ProductSec,
    //OfferSec
  },
  
}
</script>
