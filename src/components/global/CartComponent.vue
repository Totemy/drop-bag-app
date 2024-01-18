<template>
    <div class="cart-count">
        <div class="cart-count__content">
            <div class="cart-count__article">
                <div class="cart-count__header">
                    <h3>Корзина</h3>
                    <h5>Кількість : {{countItems}}</h5>
                </div>
                <div class="cart-count__list">
                    <tr>
                        <th></th>
                        <th>Назва</th>
                        <th>Розмір</th>
                        <th>Ціна</th>
                    </tr>
                    <tr v-for="(item, index) in cartItems" :key="index">
                        <td>
                            <img class="cart-count__image" :src=item.images[0] >
                        </td>
                        <td>{{ item.name }}
                           </td>
                        <td> {{item.size}} </td>
                        <td> {{item.price}} </td>
                        <td> <button
                            class="btn__delete"
                            @click="removeFromCart(index)"
                        >
                            Вилучити
                        </button></td>
                    </tr>
                    <div class="cart-count__footer">
                        <span style="font-weight: normal">Всього</span> : {{sum}} грн
                    </div>
                </div>

            </div>
            <div class="cart-count__buttons">
                <button class="btn btn__close" @click="closeCart">
                    Закрити
                </button>
                <button class="btn btn__clear" @click="clearCart">
                    Очистити корзину
                </button>
                <router-link to="/checkout"
                    ><button class="btn btn__offer" @click="closeCart">
                        Оформити замовлення
                    </button></router-link
                >
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            sum: null,
            countItems:null
        }
    },
    computed: {
        ...mapGetters('cart', ['cartItems']),
        cartItems() {
            return this.$store.state.cart.cartItems

        },
    },
    mounted() {
        this.sumOfProducts()
    },
    watch: {
        cartItems: {
            handler: 'sumOfProducts',
            deep: true,
        },
    },
    methods: {
        closeCart() {
            this.$emit('close')
        },
        clearCart() {
            this.$store.commit('cart/clearCart')
        },
        removeFromCart(index) {
            this.$store.commit('cart/removeFromCart', index)
        },
        sumOfProducts(){
            this.sum = this.cartItems.reduce((total, item) => {
                const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                return total + price;
            }, 0);
            this.countItems = this.cartItems.length;
        }
    },
}
</script>
