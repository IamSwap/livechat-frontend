import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./style.css";
import "vue-toast-notification/dist/theme-default.css";

import App from "./App.vue";
import router from "./routes/router";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(router).mount("#app");
