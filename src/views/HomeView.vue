<template>
  <div class="home">

    <div class="container">
    <CategorySec/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import CategorySec from "@/components/CategorySec.vue";
//import OfferSec from "@/components/Offer.vue";

export default {
  name: 'HomeView',
  components: {
    CategorySec,

    //OfferSec
  },
  
}
</script>
