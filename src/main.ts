import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import { store } from "@/store";
import VueLazyLoad from "vue-lazyload";
import nomusic from "@/assets/nomusic.png";

const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.use(VueLazyLoad, {
  loading: nomusic,
});
vue.mount("#app");
