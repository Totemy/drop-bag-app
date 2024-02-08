import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from '../components/HomeView.vue'
import { getAuth } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/navbar",
    name: "navbar",
    component: () => import("../components/global/Navbar.vue"),
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryPage',
    component: () => import ("../components/CategoryPage.vue")
  },
  {
    path: '/product/:productId',
    name: 'ProductPage',
    component: () => import ("../components/ProductPage.vue"),

  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: ()=>import ("../components/CheckoutPage.vue"),
  },
  {
    path: '/about-us',
    name: 'AboutPage',
    component: ()=>import ("../components/AboutUsPage.vue"),
  },
  {
    path: "/Dash",
    name: "Dash",
    component: () => import("@/components/admin/Dashboard.vue"),
    children: [
      {
        path: "/sidebar",
        name: "sidebar",
        component: () => import("../components/global/SidebarSettings.vue"),
        // meta: { requiresAuth: true },
        children: [
          {
            path: "category",
            component: () => import("@/components/admin/CategoryList.vue"),
            // meta: { requiresAuth: true },
          },
          {
            path: "products",
            // name: "AllProd",
            component: () => import("@/components/admin/ProductsList.vue"),
            // meta: { requiresAuth: true },
          },
          {
            path: "profile",
            // name: "profile",
            component: () => import("../components/Profile.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "import-product",
            component: () => import("@/components/admin/ImportProduct.vue"),
          },
          {
            path: "import-category",
            component: () => import("@/components/admin/ImportCategory.vue"),
          }
        ],
      },
    ],
  },
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
  if (to.name === 'CategoryPage' && from.name === 'CategoryPage' && to.params.categoryId !== from.params.categoryId) {
    window.location.reload();
  } else {
    next();
  }
});

export default router
