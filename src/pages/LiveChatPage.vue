<script setup>
import { ref, onMounted, reactive } from "vue";
import useAuthStore from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const messages = ref([]);
const messagesdiv = ref(null);

const form = reactive({
  text: "",
});

onMounted(() => {
  // Echo.private(`messages`).listen("SendMessageEvent", (e) => {
  //   messages.value = [...messages.value, e.message];
  //   messagesdiv.value.scrollTo({ top: messagesdiv.value.scrollHeight, behavior: "smooth" });
  // });
});

const sendMessage = () => {
  try {
    router.post("/messages", form, {
      preserveScroll: (page) => Object.keys(page.props.errors).length,
    });
    form.text = "";
  } catch (e) {
    console.log(e);
  }
};

const logout = () => {
  authStore.token = "";
  authStore.user = {};

  router.push("/");
};
</script>

<template>
  <div class="my-12 text-center">
    <h1 class="text-center text-3xl font-bold mb-6">Live Chat Demo</h1>
    <p>Welcome {{ authStore.user.name }}</p>
    <div>
      <a class="text-indigo-600" href="#" @click.prevent="logout()">Logout</a>
    </div>
  </div>

  <div class="flex bg-white flex-col border h-[500px] w-[400px] mx-auto relative shadow sm:rounded-lg">
    <ul
      role="list"
      class="divide-y divide-gray-200 max-h-[400px] h-[400px] overflow-y-scroll px-6 pb-24"
      ref="messagesdiv"
    >
      <li class="py-4" v-for="message in messages">
        <div class="flex space-x-3">
          <img class="h-6 w-6 rounded-full" :src="`https://ui-avatars.com/api/?name=${message.user.name}`" alt="" />
          <div class="flex-1 space-y-1">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium">{{ message.user.name }}</h3>
              <p class="text-sm text-gray-500">{{ message.sent_at }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ message.text }}</p>
          </div>
        </div>
      </li>
    </ul>
    <form class="relative flex gap-2 mt-auto m-6" @submit.prevent="sendMessage()">
      <input type="text" name="text" v-model="form.text" class="w-full border border-gray-200 rounded" />
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send
      </button>
    </form>
  </div>
</template>
