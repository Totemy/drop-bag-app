<template>
    <div class="product container">
        <div class="row">
            <div class="col-8">
                <div>
                    <button class="btn btn__back" @click="goBack()">
                        Go back
                    </button>
                </div>
                <div>
                    <h2>{{ product.name }}</h2>
                </div>
                <div class="product__carousel">
                    <carousel
                        :images="product.images"
                        :currentIndex="currentImageIndex"
                        @nextImage="nextImage"
                        @prevImage="prevImage"
                    />
                </div>
                <h3>Опис :</h3>
                <div
                    class="product__description"
                    v-html="product.description"
                ></div>
            </div>
            <div class="col-4">
                <div class="product__buy-section">
                    <h4>Купити</h4>
                    <div class="row">
                        <div class="col">
                            {{ product.colors }}
                        </div>
                        <div class="col">
                            {{ product.sizes }}
                        </div>
                        <div class="col">
                            {{ product.price }}
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
        </div>
    </div>
</template>
<script>
import Carousel from '@/components/CarouselPage.vue'
import {
    query,
    getDocs,
    collectionGroup,
    getFirestore,
} from 'firebase/firestore'
import { DataService, EventBus } from '../services/DataService'
import { mapGetters } from 'vuex'
export default {
    components: {
        Carousel,
    },
    data() {
        return {
            Products: [],
            product: null, // Data property to store the found product
            productIdToFind: this.$route.params.productId,
            localData: [],
            localProduct: null,
            currentImageIndex: 0,
        }
    },
    created() {
        this.getLocalData()
    },
    computed: {
        ...mapGetters('cart', ['cartItems']),
        productImages() {
            return this.product.images || []
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        async getProducts() {
            const db = getFirestore()
            const sousCollectionRef = query(collectionGroup(db, `products`))
            const sousCollectionSnapshot = await getDocs(sousCollectionRef)
            this.Products = []
            sousCollectionSnapshot.forEach((doc) => {
                this.Products.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    price: doc.data().price,
                    image: doc.data().image,
                })
            })
            this.product = this.Products.find(
                (product) => product.id === this.productIdToFind
            )
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
            this.$store.dispatch('cart/addToCart', product)
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
