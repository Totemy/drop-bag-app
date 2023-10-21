<template>
  <div id="app">
    <Navbar/>
    <Header/>
    <router-view/>
  </div>
</template>
<script>
/* eslint-disable */

import Header from '@/components/global/Header.vue'
import Navbar from '@/components/global/Navbar.vue'
export default {
  name: 'App',
  components:{
    Header,
    Navbar
  }
}
</script>
<style lang="scss">
@import "@/styles/app.scss";
</style>