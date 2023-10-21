<template>
    <div>
        <h2>{{ name }}</h2>
        <img class="category__image" :src="Category.image" />
        <div>
            {{ Category.name }}
        </div>
        <div>
            <div class="row">
                <div class="col-4" v-for="prod in Products" :key="prod.id">
                    <div class="card"></div>
                    <img class="card__img" :src="prod.picture[0]" />
                    <div class="card__details">
                        <button
                            @click="
                                addToCart({
                                    id: prod.id,
                                    name: prod.name,
                                    price: prod.price,
                                    picture: prod.picture,
                                    qte: qte,
                                })
                            "
                        >
                            До кошика
                        </button>
                        <button
                            :to="{
                                name: 'Product',
                                params: {
                                    id: prod.id,
                                    name: prod.name,
                                    picture: prod.picture,
                                    price: prod.price,
                                    desc: prod.description,
                                },
                            }"
                        >
                            Відкрити
                        </button>
                        <div>
                            <div>
                                {{ prod.name }}
                            </div>
                            <div>{{ prod.price }} hrn</div>
                        </div>
                    </div>
                </div>
            </div>
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
    mounted() {
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
                    url: doc.data().url,
                })
            })
        },
    },
}
</script>
