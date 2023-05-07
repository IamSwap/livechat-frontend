<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <RegisterForm />
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have account?
        {{ " " }}
        <router-link to="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import RegisterForm from "@/components/RegisterForm.vue";
</script>
