<template>
  <div class="home">
    <Navbar/>
    <CategorySec/>
  </div>
</template>

<script>
// @ is an alias to /src
import CategorySec from "@/components/CategorySec.vue";
//import OfferSec from "@/components/Offer.vue";
import Navbar from "@/components/global/Navbar.vue"
export default {
  name: 'HomeView',
  components: {
    CategorySec,
    Navbar
    //OfferSec
  },
  
}
</script>
