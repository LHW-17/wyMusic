import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store } from "@/store";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/itemmusic",
    name: "itemMusic",
    component: () => import("@/views/ItemMusic.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next("/userinfo");
      } else {
        next();
      }
    },
  },
  {
    path: "/userinfo",
    name: "userInfo",
    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next();
      } else {
        next("/login");
      }
    },
    component: () => import("@/views/UserInfo.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savaPosition) => {
    return {
      top: 0,
    };
  },
  routes: routes,
});
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    store.commit("updateShowFooter", false);
  } else {
    store.commit("updateShowFooter", true);
  }
  next();
});
export default router;
