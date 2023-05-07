<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <LoginForm />
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ " " }}
        <router-link to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Register</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/components/LoginForm.vue";
</script>
