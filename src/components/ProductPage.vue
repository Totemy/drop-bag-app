<template>
    <div class="product">
        <div class="row">
            <div class="col-8">
                <div><button @click="goBack()">Go back</button></div>
                <div>
                    <h2>{{  product.name}}</h2>
                </div>
                <h3>Опис : </h3>
                <div v-html="product.description">
                </div>
                <div>
                    <div>
                        <button>Додати до кошика</button>
                    </div>
                </div>
            </div>
            <div class="col-4" @click="addToCart(product)">
                Купити
            </div>
        </div>
        
    </div>
</template>
<script>
import {
    query,
    getDocs,
    collectionGroup,
    getFirestore,
} from 'firebase/firestore'
import { DataService, EventBus } from '../services/DataService';
export default {
    
    data() {
        return {
            Products: [],
            product: null, // Data property to store the found product
            productIdToFind: this.$route.params.productId,
            localData:[],
            localProduct: null
        };
    },
    created() {
        this.getLocalData()
        
        
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
            this.product = this.Products.find(product => product.id === this.productIdToFind);
        },
        async getLocalData(){
            let localData = DataService.data;
                EventBus.$on('data-updated', (newData) => {
                    this.localData = newData;
                });
            
            this.product = localData.find(product => product.id == this.productIdToFind);
        },
        addToCart(product) {
            this.$store.dispatch('cart/addToCart', product);
        },
    },
}
</script>
