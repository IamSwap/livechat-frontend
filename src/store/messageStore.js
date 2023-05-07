import { defineStore } from "pinia";
import AuthService from "@/services/authService";

const useAuthStore = defineStore("message", {
  state: () => ({
    messages: "",
  }),

  actions: {
    async send(data) {
      try {
        const res = await AuthService.login(data);
        this.token = res.data.token;

        await this.fetchUser();
      } catch (error) {
        return error;
      }
    },

    async index(data) {
      try {
        const res = await AuthService.login(data);
        this.token = res.data.token;

        await this.fetchUser();
      } catch (error) {
        return error;
      }
    },
  },
});

export default useAuthStore;
