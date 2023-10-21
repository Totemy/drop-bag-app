import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from '../views/HomeView.vue'
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
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/navbar",
    name: "navbar",
    component: () => import("../components/global/Navbar.vue"),
  },
  {
    path: "/category/:categoryId",
    name: "CategoryPage",
    component: () => import ("../components/CategoryPage.vue")
  },
  {
    path: "/Dash",
    name: "Dash",
    component: () => import("../views/admin/Dashboard.vue"),
    children: [
      {
        path: "/sidebar",
        name: "sidebar",
        component: () => import("../components/global/SidebarSettings.vue"),
        // meta: { requiresAuth: true },
        children: [
          {
            path: "category",
            component: () => import("../views/admin/CategoryList.vue"),
            // meta: { requiresAuth: true },
          },
          {
            path: "products",
            // name: "AllProd",
            component: () => import("../views/admin/ProductsList.vue"),
            // meta: { requiresAuth: true },
          },
          {
            path: "profile",
            // name: "profile",
            component: () => import("../views/Profile.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: "import-product",
            component: () => import("../views/admin/ImportProduct.vue"),
          },
          {
            path: "import-category",
            component: () => import("../views/admin/ImportCategory.vue"),
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
});

export default router
