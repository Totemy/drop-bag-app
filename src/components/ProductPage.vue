<template>
    <div class="product">
        <div><button @click="goBack()">Go back</button></div>
        <div>
            {{  product.name[0]}}
        </div>
        <div>
            <div>
                <button>Додати до кошика</button>
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
export default {
    data() {
        return {
            Products: [],
            product: null, // Data property to store the found product
            productIdToFind: this.$route.params.productId
        };
    },
    created() {
        this.getProducts()        
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
    },
}
</script>
