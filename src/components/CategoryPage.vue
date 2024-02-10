<template>
    <div>
        <div class="product-page">
            <div class="product-page__header">
                <h1>{{ category.name }}</h1>
            </div>

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
import { DataService, EventBus } from '@/services/DataService'

export default {
    data(){
        return{
            category:[],
            localData: [],
            categoryIdToFind: this.$route.params.categoryId,
        }
    },
    created() {
        this.getLocalData()
        this.getProducts()
    },
    methods:{
        async getLocalData() {
            let localData = DataService.data.categories
            EventBus.$on('data-updated', (newData) => {
                this.localData = newData
            })
            this.category = localData.find(
                (category) => category.id == this.categoryIdToFind
            )
        },
        async getProducts() {
            let localData = DataService.data.products;
            let categoryId = this.$route.params.categoryId; // Assuming categoryId is passed via route params
            if (Array.isArray(localData)) {
                this.localData = localData.filter(product => product.cat === categoryId);
            } else {
                console.error('Local data is not an array:', localData);
            }
            EventBus.$on('data-updated', (newData) => {
                localData = newData.products; // Assuming newData is an object with a 'products' key
                if (Array.isArray(localData)) {
                    this.localData = localData.filter(product => product.cat === categoryId);
                } else {
                    console.error('New data is not an array:', localData);
                }
            });
        },
        navigateToProduct(productId){
            this.$router.push({ name: 'ProductPage', params: { productId } });
            document.documentElement.scrollTop = 0;
        },
    }
}
</script>