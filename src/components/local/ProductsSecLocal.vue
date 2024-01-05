<template>
    <div>
        <div class="catalog">
            <div class="">
                <ul class="catalog-list">
                    <li v-for="product in localData" :key="product.id" class="catalog-item">
                        <div class="catalog-content">
                            <div class="catalog-img-wrap" @click="navigateToProduct(product.id)">
                                <img
                                    :src="product.images[0]"
                                    alt=""
                                    class="catalog-img"
                                    height="549"
                                    width="412"
                                />
                            </div>
                            <div class="catalog-info">
                                <p class="catalog-subtitle">{{product.name}}</p>
                                <p class="catalog-text">{{ product.description }}</p>
                                <p class="catalog-price">{{ product.price }}</p>
                            </div>
                            <button type="button" class="catalog-btn" 
                            @click="navigateToProduct(product.id)"
                            >
                                Детальніше
                            </button>
                        </div>
                    </li>
                    
                </ul>
            </div>
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
        }
    }
}
</script>