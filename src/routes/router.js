import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "../store/authStore";

const routes = [
  { path: "/", name: "login", component: () => import("@/pages/LoginPage.vue") },
  { path: "/register", name: "register", component: () => import("@/pages/RegisterPage.vue") },
  { path: "/livechat", name: "livechat", component: () => import("@/pages/LiveChatPage.vue") },
  { path: "/:pathMatch(.*)*", component: () => import("@/pages/404.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    if (to.name === "login" || to.name === "register") {
      return true;
    }

    return { name: "login" };
  }

  if (authStore.token && (to.name === "login" || to.name === "register")) {
    return { name: "livechat" };
  }
});

export default router;
