<template>
    <div class="navbar">
        <div class="row">
            <div class="col-3">
                <div class="">
                    <button
                        @click="catOpen = !catOpen"
                        class="btn btn-secondary dropdown-toggle navbar__button-category"
                        type="button"
                    >
                        Category
                    </button>
                    <div class="navbar__dropdown" v-if="catOpen">
                        <div v-for="cat in Category" :key="cat.id">
                            <div class="navbar__dropdown-item">
                                {{ cat.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-auto">
                <div class="navbar__search">
                    <input type="text" />
                </div>
            </div>
            <div class="col-3">
                <button
                    @click="isOpen = !isOpen"
                    class="btn btn-secondary dropdown-toggle navbar__button-login"
                    type="button"
                >
                    My Account
                </button>
                <div class="navbar__login">
                    <ul v-if="isOpen" class="navbar__login-item">
                        <div class="row">
                            <button
                                class="navbar__button-loginpage"
                                to="/login"
                                v-if="user == null"
                            >
                                Sign In
                            </button>
                            <button
                                class="navbar__button-loginpage"
                                v-if="user == null"
                                to="/register"
                            >
                                Sign Up
                            </button>
                            <button
                                class="navbar__button-loginpage"
                                v-if="user"
                                @click="logout()"
                            >
                                Sign Out
                            </button>
                            <button
                                class="navbar__button-loginpage-admin"
                                to="/dash"
                            >
                                Admin
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import router from "../../router";
import {
    getFirestore,
    query,
    getDocs,
    collectionGroup,
    collection
} from "firebase/firestore";
const db = getFirestore();
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "navbar",
    data() {
        return {
            user: null,
            searchProduct: "",
            filteredProducts: [],
            Products: [],
            Category: [],
            isOpen: false,
            catOpen: false
        };
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                this.user = userAuth;
            } else {
                this.user = null;
            }
        });
        this.getProducts();
        this.getCategory();
    },
    methods: {
        logout() {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    localStorage.removeItem("User");
                    router.push({
                        name: "login"
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getCategory() {
            const db = getFirestore(),
                q = query(collection(db, "categories"));

            const querySnapshot = await getDocs(q);
            this.Category = [];
            querySnapshot.forEach((doc) => {
                this.Category.push({
                    id: doc.id,
                    name: doc.data().name,
                    image: doc.data().image
                });
            });
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
        },
        filterItems() {
            this.filteredProducts = this.Products.filter((item) => {
                return item.name
                    .toLowerCase()
                    .includes(this.searchProduct.toLowerCase());
            });
            this.$root.$emit("filtered-Products", this.filteredProducts);
        }
    }
};
</script>
