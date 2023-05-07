<template>
  <form class="space-y-6" @submit.prevent="register()" ref="registerform" method="POST">
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
      <div class="mt-2">
        <input
          id="name"
          name="name"
          type="text"
          autocomplete="name"
          required
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
      <div class="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
      <div class="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center"
      >
        Register
        <Loader v-if="loading" class="ml-2" />
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import useAuthStore from "@/store/authStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import Loader from "./Loader.vue";

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const registerform = ref();
const toast = useToast();

const register = async () => {
  const formData = new FormData(registerform.value);
  loading.value = true;

  try {
    await authStore.register(formData);
    loading.value = false;
    router.push("/livechat");
  } catch (error) {
    loading.value = false;
    toast.error(error.response?.data?.message ?? "There was error in register");
  }
};
</script>
