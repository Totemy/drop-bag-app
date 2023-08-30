<template>
  <div class="container">
    <Header/>
    <nav>
      <router-link to="/">Home</router-link> |
    </nav>
    <router-view/>
  </div>
</template>
<script>
import Header from '@/components/global/Header.vue'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>
<style lang="scss">
@import "@/styles/app.scss";
</style>