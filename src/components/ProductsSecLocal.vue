<template>
    <div>
        <div class="product-page">
            <div class="product-page__filter">
                <label for="category">Бренд : </label>
                <select v-model="selectedCategory" @change="applyFilters">
                    <option class="product-page__filter-item" value="">Всі</option>
                    <option class="product-page__filter-item" v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>

                <label for="sizes">Розмір : </label>
                <select v-model="selectedSizes" @change="applyFilters">
                    <option class="product-page__filter-item" v-for="size in allSizes" :key="size">{{ size }}</option>
                </select>
            </div>
            <ul class="product-page__list">
                <li v-for="product in currentPageProducts" :key="product.id" class="product-page__card">
                    <div class="catalog-content">
                        <div class="product-page__img-wrap" @click="navigateToProduct(product.id)">
                            <img :src="product.images[0]" alt="" class="product-page__img" />
                        </div>
                        <div class="product-page__cart-wrap">
                            <div class="product-page__article">
                                <p class="catalog-subtitle">{{ product.name }}</p>
                                <p class="catalog-price">{{ product.price }}грн</p>
                            </div>
                            <button type="button" class="btn btn__details" @click="navigateToProduct(product.id)">
                                Детальніше
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="filteredProducts.length > itemsPerPage" class="pagination__tabs">
                <button v-if="currentPage > 1" @click="prevPage" class="pagination__button">&lt;</button>
                <div class="pagination__numbers">
                    <button v-for="page in pagesToShow" :key="page" @click="changePage(page)" :class="{ active: page === currentPage }" class="pagination__button">
                        {{ page }}
                    </button>
                </div>
                <button v-if="currentPage < totalPages" @click="nextPage" class="pagination__button">&gt;</button>
            </div>
        </div>
    </div>
</template>

<script>
import { DataService, EventBus } from '@/services/DataService';
import { paginationService } from '@/services/paginationService';
export default {
    data() {
        return {
            localData: [],
            itemsPerPage: 9,
            currentPage: 1,
            selectedCategory: '',
            selectedSizes: [],
        };
    },
    created() {
        this.localData = DataService.data.products;
        EventBus.$on('data-updated', (newData) => {
            this.localData = newData.products;
        });
    },
    computed: {
        totalPages() {
            return paginationService.getTotalPages(this.filteredProducts, this.itemsPerPage);
        },
        currentPageProducts() {
            return paginationService.paginate(this.filteredProducts, this.currentPage, this.itemsPerPage);
        },
        categories() {
            return DataService.data.categories;
        },
        allSizes() {
            // Get all available sizes from products
            return this.localData.reduce((sizes, product) => {
                return sizes.concat(product.sizes);
            }, []).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        filteredProducts() {
            let filtered = this.localData;
            if (this.selectedCategory) {
                filtered = filtered.filter((product) => product.cat === this.selectedCategory);
            }
            if (this.selectedSizes.length > 0) {
                filtered = filtered.filter((product) => {
                    return product.sizes.some((size) => this.selectedSizes.includes(size));
                });
            }
            return filtered;
        },
        pagesToShow() {
            const total = this.totalPages;
            const current = this.currentPage;
            const delta = 2;
            const range = [];
            let rangeWithDots = [];
            let l;

            range.push(1);
            for (let i = current - delta; i <= current + delta; i++) {
                if (i > 1 && i < total) {
                    range.push(i);
                }
            }
            range.push(total);

            range.forEach((i) => {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            });

            return rangeWithDots;
        },
    },
    methods: {
        changePage(page) {
            if (page !== '...') {
                this.currentPage = page;
                this.scrollToProductPage();
            }
        },
        navigateToProduct(productId) {
            this.$router.push({ name: 'ProductPage', params: { productId } });
            document.documentElement.scrollTop = 0;
        },
        scrollToProductPage() {
            const productPage = document.querySelector('.product-page');
            if (productPage) {
                window.scrollTo({
                    top: productPage.offsetTop,
                    behavior: 'smooth', // Optional: for smooth scrolling effect
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
        },
        applyFilters() {
            this.currentPage = 1;
            this.$forceUpdate();
        },
    },
};
</script>
