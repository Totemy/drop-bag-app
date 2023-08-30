<template>
    <div class="cart">
        <div v-if="MyCart.length > 0">
            <div class="cart_head">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qualntity</th>
                    <th>Total</th>
                </tr>
            </div>
            <div>
                <tr v-for="prod in MyCart"
                    :key="prod.id"
                    >
                    <td>
                        <img :src="prod.image" alt="" width="80px" height="60px" />
                        {{ prod.name }}
                    </td>
                    <td>
                        {{ prod.price }}
                    </td>
                    <td>
                        <form>
                            <input id="quantity"  v-model="prod.qte" type="number">
                        </form>
                    </td>
                    <td>
                        {{ prod.price * prod.qte }}
                    </td>
                </tr>
            </div>
        </div>
        <div v-else>
            <p>Your shopping basket is empty.</p>
        </div>
        <div>
            <h5>Cart Summary</h5>
            <div class="">
                <h5>Total:</h5>
                <h5> {{ total }} </h5>
                <button>Proceed To Checkout</button>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "cart",
  //   props: {
  //     cartItems: JSON.parse(route.params.cartItems),
  //   },
  data() {
    return {
      MyCart: JSON.parse(this.$route.params.cartItems),
      totalProd: 0,
      crumbs: [
        { text: "Home", to: { name: "home" } },
        { text: "Products", href: "/#Prod-sec" },
        { text: "Cart", active: true },
      ],
    };
  },
  created() {
    // console.log(this.MyCart);
  },
  methods: {
    removeProduct(index) {
      this.MyCart.splice(index, 1);
    },
  },
  computed: {
    total() {
      let total = 0;
      this.MyCart.forEach((product) => {
        total += product.price * product.qte;
      });
      return total.toFixed(3);
    },
  },
};
</script>