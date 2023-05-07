import { defineStore } from "pinia";
import MessageService from "@/services/messageService";

const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [],
  }),

  actions: {
    async send(data) {
      await MessageService.send(data);
    },

    async list() {
      const res = await MessageService.list();
      this.messages = res.data.data;
    },
  },
});

export default useMessageStore;
