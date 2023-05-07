<template>
  <div class="my-12 text-center">
    <h1 class="text-center text-3xl font-bold mb-6">Live Chat Demo</h1>
    <p>Welcome {{ authStore.user.name }}</p>
    <div>
      <a class="text-indigo-600" href="#" @click.prevent="logout()">Logout</a>
    </div>
  </div>

  <div class="flex bg-white flex-col border h-[500px] w-[400px] mx-auto relative shadow sm:rounded-lg">
    <MessageList />
    <MessageForm />
  </div>
</template>

<script setup>
import useAuthStore from "../store/authStore";
import { useRouter } from "vue-router";
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.token = "";
  authStore.user = {};

  router.push("/");
};
</script>
