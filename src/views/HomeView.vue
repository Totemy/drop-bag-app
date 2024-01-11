<template>
  <div class="home">
    <div>
        <MainPage/>
      <ProductsSecLocal/>

    </div>
    <div>
      <FooterPage/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import CategorySec from "@/components/CategorySec.vue";
import FooterPage from "@/components/global/FooterPage.vue";
import ProductsSecLocal from "@/components/local/ProductsSecLocal.vue";
import MainPage from '@/components/global/MainPage.vue'
//import OfferSec from "@/components/Offer.vue";

export default {
  name: 'HomeView',
  components: {
    //CategorySec,
    ProductsSecLocal,
      MainPage,
      FooterPage
  },
  
}
</script>
