<template>
    <div>
        <h2>{{ name }}</h2>
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
    collectionGroup,
    doc,
    getDoc
} from "firebase/firestore";
const db = getFirestore();

export default {
    data() {
        return {
            Category: [],
            categoryId: this.$route.params.categoryId
        };
    },
    props: {
        name: String,
        image: String,
        products: Object
    },
    created() {
        this.getCategory();
    },
    methods: {
        async getCategory() {
            const db = getFirestore();
            const categoryRef = doc(db, "categories", this.categoryId);

            const docSnap = await getDoc(categoryRef);

            if (docSnap.exists()) {
                this.Category = {
                    id: docSnap.id,
                    name: docSnap.data().name,
                    image: docSnap.data().image
                };
            } else {
                console.log("Document does not exist.");
            }
        },
        async getProducts() {
            const sousCollectionRef = query(collectionGroup(db, `products`));
            const sousCollectionSnapshot = await getDocs(sousCollectionRef);
            this.Products = [];
            sousCollectionSnapshot.forEach((doc) => {
                this.Products.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    price: doc.data().price,
                    image: doc.data().image
                });
            });
        }
    }
};
</script>
