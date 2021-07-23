import { createApp } from "vue";
import ElementUI from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(ElementUI).use(store).use(router).mount("#app");
