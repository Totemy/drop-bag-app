<template>
    <div class="header">
        <div class="header__parent" :class="{'scrolled': isScrolled}">
            <div class="header__navbar">
                <div>
                    <button
                        @click="routeToMainPage()"
                        class="btn btn__navbar"
                        type="button"
                    >
                        Головна
                    </button>
                </div>
                <div>
                    <button
                        @click="catOpen = !catOpen"
                        class="btn btn__navbar dropdown-toggle "
                        type="button"
                        ref="categoryDropdown"
                    >
                        Категорії
                    </button>
                    <div class="header__category-dropdown" v-if="catOpen">
                        <div v-for="cat in Category" :key="cat.id">
                            <div
                                class="header__category-item"
                                @click="navigateToCategory(cat.id)"
                            >
                                {{ cat.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        @click="routeToMainPage()"
                        class="btn btn__navbar"
                        type="button"
                    >
                        Про нас
                    </button>
                </div>
                <div >
                    <button class="btn btn__navbar" @click="toggleCart" >
                        Кошик
                    </button>
                </div>
                <cart v-if="$store.state.cart.isOpen" @close="toggleCart"></cart>

            </div>

        </div>

    </div>
</template>
<script>
import CategoryPage from '@/components/CategoryPage.vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import router from '../../router'
import { mapState, mapMutations } from 'vuex';
import Cart from '../../views/CartComponent.vue'
import {
    getFirestore,
    query,
    getDocs,
    collectionGroup,
    collection,
} from 'firebase/firestore'
const db = getFirestore()
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'navbar',
    components: {
        Cart,
    },
    data() {
        return {
            user: null,
            searchProduct: '',
            filteredProducts: [],
            Products: [],
            Category: [],
            //isOpen: false,
            catOpen: false,
            isAdmin: false,
            isScrolled: false,
        }
    },
    computed: {
    ...mapState('cart', ['cartItems', 'isOpen']),
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    created() {
        const auth = getAuth()
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                this.user = userAuth
                if (
                    userAuth.customClaims &&
                    userAuth.customClaims.isAdmin === true
                ) {
                    this.isAdmin = true
                } else {
                    this.isAdmin = false
                }
            } else {
                this.user = null
                this.isAdmin = false
            }
        })
        this.getProducts()
        this.getCategory()

        this.Category.forEach((Category) => {
            this.$router.addRoute({
                path: `/category/${Category.id}`,
                name: 'CategoryPage',
                component: CategoryPage,
                meta: { categoryId: Category.id },
            })
        })
    },
    methods: {
        ...mapMutations('cart', ['toggleCart']),
        logout() {
            this.isAdmin = false;
            console.log(this.isAdmin)
            const auth = getAuth()
            signOut(auth)
                .then(() => {
                    localStorage.removeItem('User')
                    router.push({
                        name: 'login',
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async getCategory() {
            const db = getFirestore(),
                q = query(collection(db, 'categories'))

            const querySnapshot = await getDocs(q)
            this.Category = []
            querySnapshot.forEach((doc) => {
                this.Category.push({
                    id: doc.id,
                    name: doc.data().name,
                    image: doc.data().image,
                })
            })
        },
        async getProducts() {
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
        },
        filterItems() {
            this.filteredProducts = this.Products.filter((item) => {
                return item.name
                    .toLowerCase()
                    .includes(this.searchProduct.toLowerCase())
            })
            this.$root.$emit('filtered-Products', this.filteredProducts)
        },
        navigateToCategory(categoryId) {
            this.$router.push({ name: 'CategoryPage', params: { categoryId } })
            this.catOpen = false
        },
        routeToMainPage() {
            if (this.$route.path !== '/') {
                this.$router.replace('/')
            }
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 0;
        },
    },
}
</script>
