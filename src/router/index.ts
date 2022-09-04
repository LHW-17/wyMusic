import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
export default router;
