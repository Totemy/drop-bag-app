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
                <button v-if="currentPage > 1" @click="prevPage" class="pagination__button">&lt;</button>
                <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                        :class="{ active: page === currentPage }"
                class="pagination__button">
                    {{ page }}
                </button>
                <button v-if="currentPage < totalPages" @click="nextPage" class="pagination__button"> &gt;</button>
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
            this.scrollToProductPage();
        },
        navigateToProduct(productId){
            this.$router.push({ name: 'ProductPage', params: { productId } });
            document.documentElement.scrollTop = 0;
        },
        scrollToProductPage() {
            const productPage = document.querySelector('.product-page');
            if (productPage) {
                window.scrollTo({
                    top: productPage.offsetTop,
                    behavior: 'smooth' // Optional: for smooth scrolling effect
                });
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.scrollToProductPage();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.scrollToProductPage();
            }
        }
    }
}
</script>