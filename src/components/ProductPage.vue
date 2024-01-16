<template>
    <div class="product container">
        <div class="row">
            <div class="product__sidebar">
                <div  v-for="image in product.images" :key="image" >
                    <img class="product__side-img" :src="image" alt="">
                </div>
            </div>
            <div class="col-6">
                <div class="product__carousel">
                    <carousel
                        :images="product.images"
                        :currentIndex="currentImageIndex"
                        @nextImage="nextImage"
                        @prevImage="prevImage"
                    />
                </div>
            </div>
            <div class="col-4">
                <div class="product__buy-section">
                    <div class="product__main">
                        <h2>{{ product.name }}</h2>
                        <h3>{{product.price}} грн</h3>
                    </div>
                        <div class="col">
                            <div class="product__size">
                                <h5>Виберіть розмір</h5>
                                <label v-for="size in product.sizes" :key="size" class="product__size-label">
                                    <input type="radio" :value="size" v-model="selectedSize" class="product__size-input">
                                    <div class="product__size-circlce">
                                        {{size}}
                                    </div>
                                </label>
                            </div>
                            
                        </div>
                        <div>
                            <div>
                                <button
                                    class="btn btn__addtocart"
                                    @click="addToCart(product)"
                                >
                                    Додати до кошика
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div>
            <div class="product__bottom-section">
                <div class="product__bottom-content">
                    <h3>Опис</h3>
                    <p>{{product.description}}</p>
                </div>
            </div>
        </div>
        <div>
            <Proposal></Proposal>
        </div>
    </div>
</template>
<script>
import Carousel from '@/components/CarouselPage.vue'
import Proposal from '@/components/ProposalPage.vue'
import { getProducts } from '@/services/FirebaseDataService.js';
import { DataService, EventBus } from '../services/DataService'
import { mapGetters } from 'vuex'
export default {
    components: {
        Carousel,
        Proposal,
    },
    data() {
        return {
            Products: [],
            product: null,
            productIdToFind: this.$route.params.productId,
            localData: [],
            localProduct: null,
            currentImageIndex: 0,
            selectedSize: null,
            selectedColor: null,
            cartitems: [],
        }
    },
    created() {
        this.getLocalData()
        //this.loadProduct()
    },
    computed: {
        ...mapGetters('cart', ['cartItems']),
        productImages() {
            return this.product.images || []
        },
        sizeValues() {
            return this.product.sizes.map(size => String(size));
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        async loadProduct() {
            this.product = await getProducts(this.productIdToFind);
        },
        async getLocalData() {
            let localData = DataService.data
            EventBus.$on('data-updated', (newData) => {
                this.localData = newData
            })
            this.product = localData.find(
                (product) => product.id == this.productIdToFind
            )
        },
        addToCart(product) {
            this.$store.dispatch('cart/addToCart',  {name: product.name, size: this.selectedSize, color: this.selectedColor, price: product.price, images: product.images } );
        },
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
        },
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
        },
        
    },
}
</script>
