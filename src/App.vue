<template>
  <div id="app">

    <Header/>
    <router-view/>
  </div>
</template>
<script>
/* eslint-disable */

import Header from '@/components/global/Header.vue'
export default {
  name: 'App',
  components:{
    Header,

  }
}
</script>
<style lang="scss">
@import "@/styles/app.scss";
</style>