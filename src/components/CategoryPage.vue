<template>
    <div>
        <h2>{{ name }}</h2>
        <img class="category__image" :src="Category.image" />
        <div>
            {{ Category.name }}
        </div>
    </div>
</template>
<script>
import {
    getFirestore,
    query,
    getDocs,
    collection,
    doc,
    getDoc,
} from 'firebase/firestore'

export default {
    data() {
        return {
            Category: [],
            Products: [],
            categoryId: this.$route.params.categoryId,
        }
    },
    props: {
        name: String,
        image: String,
        products: Object,
    },
    created() {
        this.getCategory()
        this.getProducts()
    },
    methods: {
        async getCategory() {
            const db = getFirestore()
            const categoryRef = doc(db, 'categories', this.categoryId)

            const docSnap = await getDoc(categoryRef)

            if (docSnap.exists()) {
                this.Category = {
                    id: docSnap.id,
                    name: docSnap.data().name,
                    image: docSnap.data().image,
                }
            } else {
                console.log('Document does not exist.')
            }
        },
        async getProducts() {
            const db = getFirestore()
            this.Products = []

            const categoryRef = collection(
                db,
                'categories',
                this.categoryId,
                'products'
            )
            const productsQuery = query(categoryRef)

            const productsSnapshot = await getDocs(productsQuery)

            productsSnapshot.forEach((doc) => {
                this.Products.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    price: doc.data().price,
                    picture: doc.data().picture,
                    url: doc.data().url
                })
            })
        },
    },
}
</script>
