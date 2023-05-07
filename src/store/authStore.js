import { defineStore } from "pinia";
import AuthService from "@/services/authService";

const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: {},
  }),

  actions: {
    async register(data) {
      const res = await AuthService.register(data);
      this.token = res.data.token;

      await this.fetchUser();
    },

    async login(data) {
      const res = await AuthService.login(data);
      this.token = res.data.token;

      await this.fetchUser();
    },

    async fetchUser() {
      const res = await AuthService.getUser();
      this.user = res.data.data;
    },
  },

  persist: true,
});

export default useAuthStore;
