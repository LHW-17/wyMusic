import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import { store } from "@/store";
const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.mount("#app");
