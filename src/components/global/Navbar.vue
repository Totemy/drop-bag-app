<template>
    <div class="header">
        <div class="header__category">
            <button
                @click="catOpen = !catOpen"
                class="header__category-btn btn btn-secondary dropdown-toggle navbar__button-login"
                type="button"
            >
                Категорії
            </button>
            <div class="header__category-dropdown" v-if="catOpen">
                <div v-for="cat in Category" :key="cat.id">
                    <div class="header__category-item" @click="navigateToProfile(cat.id)">
                        {{ cat.name }}
                    </div>
                </div>
            </div>
        </div>

        <div class="header__search">
            <input type="text" class="header__search-input" placeholder="Я хочу знайти ..." />
        </div>

        <div class="header__trash-con">
            <div class="header__trash-btn"></div>
        </div>

        <div class="header__account">
            <button
                @click="isOpen = !isOpen"
                class="header__account-btn btn btn-secondary dropdown-toggle navbar__button-login"
                type="button"
            >
                My Account
            </button>
            <ul v-if="isOpen" class="header__account-dropdown">
                <button
                    class="header__account-loginpage"
                    to="/login"
                    v-if="user == null"
                >
                    Sign In
                </button>
                <button
                    class="header__account-loginpage"
                    v-if="user == null"
                    to="/register"
                >
                    Sign Up
                </button>
                <button
                    class="header__account-loginpage"
                    v-if="user"
                    @click="logout()"
                >
                    Sign Out
                </button>
                <button class="header__account-loginpage" to="/dash">
                    Admin
                </button>
            </ul>
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
        },
        navigateToProfile(categoryId) {
            this.$router.push({ name: 'CategoryPage', params: { categoryId } });
            location.reload();
        },
    }
};
</script>
