<template>
  <div class=" cart-count ">
    <div class="cart-count__article">
      <h3>Ваші покупки</h3>
      <div class="cart-count__list" >
        <ul v-for="(item, index) in cartItems" :key="index">
          <li>
            {{ index + 1 }} - {{ item.name }}
            <button>X</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-count__buttons">
      <button class="btn btn__close" @click="closeCart">Закрити</button>
      <button class="btn btn__clear" @click="clearCart">Очистити корзину</button>
      <router-link to="/checkout"><button class="btn btn__offer">Оформити замовлення</button></router-link>
      
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
  computed: {
    ...mapGetters('cart', ['cartItems']),
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
  },
  methods: {
    closeCart() {
      this.$emit('close');
    },
    clearCart(){
      this.$store.commit('cart/clearCart');
    }
  },
}
</script>