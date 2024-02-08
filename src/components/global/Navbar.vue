<template>
    <div class="header">
        <div class="header__parent" :class="{'scrolled': isScrolled}">
            <div class="header__burger-menu"  @click="openBar = !openBar">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <div class="header__mob-list" v-if="openBar">
                <div @click="routeToMainPage()">Головна</div>
                <div> <router-link to="/about-us">Про нас</router-link> </div>
                <div @click="toggleCart">Кошик</div>
                <cart v-if="$store.state.cart.isOpen" @close="toggleCart"></cart>
            </div>
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
                        <div v-for="locCat in localDataCat" :key="locCat.id">
                            <div
                                class="header__category-item"
                                @click="navigateToCategory(locCat.id)"
                            >
                                {{ locCat.name }}
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
                     <router-link to="/about-us">Про нас</router-link>
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
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import router from '../../router'
import { mapState, mapMutations } from 'vuex';
import Cart from '@/components/global/CartComponent.vue'
import {
    getFirestore,
    query,
    getDocs,
    collection,
} from 'firebase/firestore'
import { DataService, EventBus } from '@/services/DataService'
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
            localDataCat: [],
            //isOpen: false,
            catOpen: false,
            isAdmin: false,
            isScrolled: false,
            openBar: false
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
        this.getLocalData();
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
        getLocalData(){
            this.localDataCat = DataService.data.categories;
            EventBus.$on('data-updated', (newData) => {
                this.localDataCat = newData.categories;
            });
        },
        navigateToCategory(categoryId) {
            this.$router.push({ name: 'CategoryPage', params: { categoryId } })
            this.catOpen = false

        },
        routeToMainPage() {
            if (this.$route.path !== '/') {
                this.$router.replace('/')
            }
            this.openBar = false;
        },
        routeToAboutUs() {
            this.$route.push({})
            this.openBar = false;
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 0;
        },
        toggleCartMobile() {
            this.$store.commit('cart/toggleCart');
            this.openBar = false;
        },
    },
}
</script>
