<template>
    <div>
        <div class="product__footer">
            <div class="product__footer-article">
                <h3 >Також вам може сподобатись</h3>
            </div>
            <div class="row">
                <div class="product__footer-cart col-2" v-for="cart in getRandomCartItems" :key="cart">
                    <img class="product__side-img" :src="cart.images" alt="" @click="navigateToProduct(cart.id)"/>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { DataService, EventBus } from '@/services/DataService'

export default {
    data(){
        return{
            cartitems:[]
        }
    },
    created(){
      this.getLocalData()
    },
    computed: {
        getRandomCartItems() {
            const originalCartItems = [...this.cartitems];
            const shuffledCartItems = this.shuffleArray(originalCartItems);
            return shuffledCartItems.slice(0, 5);
        },
    },
    methods:{
        async getLocalData() {
            let localData = DataService.data
            EventBus.$on('data-updated', (newData) => {
                this.localData = newData
            })
            this.cartitems = localData;
        },
        navigateToProduct(productId) {
            this.$router.push({ name: 'ProductPage', params: { productId } });
            location.reload()
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
    }
}
</script>