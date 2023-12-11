<template>
  <div class="cart_count">
    
    <div class="cart-count__article">
      <h3>Ваші покупки</h3>
      <div class="cart-count__list" >
        <ul v-for="(item, index) in cartItems" :key="index">
          <li>
            {{ index + 1 }} - {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
  },
}
</script>