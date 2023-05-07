<template>
  <form class="relative flex gap-2 mt-auto m-6" @submit.prevent="sendMessage()" ref="messageform">
    <input type="text" name="text" class="w-full border border-gray-200 rounded" required />
    <button
      type="submit"
      class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <span v-if="!loading">Send</span>
      <Loader v-else />
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import useMessageStore from "@/store/messageStore";
import { useToast } from "vue-toast-notification";
import Loader from "./Loader.vue";

const messageform = ref();
const loading = ref(false);
const messageStore = useMessageStore();
const toast = useToast();

const sendMessage = async () => {
  const formData = new FormData(messageform.value);
  loading.value = true;

  try {
    await messageStore.send(formData);
    messageform.value?.reset();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    toast.error(error?.response?.data?.message ?? "There was error in sending message");
  }
};
</script>
