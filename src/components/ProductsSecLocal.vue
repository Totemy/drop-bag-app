<template>
    <div>
        <div class="product-page">
                <ul class="product-page__list">
                    <li v-for="product in currentPageProducts" :key="product.id" class="catalog-item">
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
            <div class="pagination__tabs">
                <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                        :class="{ active: page === currentPage }"
                class="pagination__button">
                    {{ page }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { DataService, EventBus } from '@/services/DataService';
import MainPage from '@/components/global/MainPage.vue'
import { paginationService } from '@/services/paginationService'
export default {
    data(){
        return{
            localData:[],
            itemsPerPage:9,
            currentPage:1
        }
    },
    components(){
        MainPage
    },
    created(){
        this.localData = DataService.data.products;
        EventBus.$on('data-updated', (newData) => {
            this.localData = newData.products;
        });
    },
    computed:{
        totalPages() {
            return paginationService.getTotalPages(this.localData, this.itemsPerPage);
        },
        currentPageProducts() {
            return paginationService.paginate(this.localData, this.currentPage, this.itemsPerPage);
        }
    },
    methods:{
        changePage(page) {
            this.currentPage = page;
            document.documentElement.scrollTop = 0; //todo go to start products
        },
        navigateToProduct(productId){
            this.$router.push({ name: 'ProductPage', params: { productId } });
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>