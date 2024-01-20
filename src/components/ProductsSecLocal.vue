<template>
    <div>
        <div class="product-page">
                <ul class="product-page__list">
                    <li v-for="product in localData" :key="product.id" class="catalog-item">
                        <div class="catalog-content">
                            <div class="product-page__img-wrap" @click="navigateToProduct(product.id)">
                                <img
                                    :src="product.images[0]"
                                    alt=""
                                    class="product-page__img"
                                />
                            </div>
                            <div class="product-page__cart-wrap">
                                <div class="product-page__article">
                                    <p class="catalog-subtitle">{{product.name}}</p>
                                    <p class="catalog-price">{{ product.price }}грн</p>
                                </div>
                                <button type="button" class="btn btn__details"
                                        @click="navigateToProduct(product.id)"
                                >
                                    Детальніше
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
    </div>
</template>
<script>
import { DataService, EventBus } from '@/services/DataService';
import MainPage from '@/components/global/MainPage.vue'
export default {
    data(){
        return{
            localData:[]
        }
    },
    components(){
        MainPage
    },
    created(){
        this.localData = DataService.data;
        EventBus.$on('data-updated', (newData) => {
            this.localData = newData;
        });
    },
    methods:{
        navigateToProduct(productId){
            this.$router.push({ name: 'ProductPage', params: { productId } });
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>