<template>
  <ul role="list" class="divide-y divide-gray-200 max-h-[400px] h-[400px] overflow-y-scroll px-6 pb-24" ref="list">
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
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import useMessageStore from "@/store/messageStore";
import pusherService from "@/services/pusherService";

const messageStore = useMessageStore();
const list = ref();

const messages = computed(() => {
  return messageStore.messages;
});

const fetchMessages = async () => {
  await messageStore.list();
};

const scrollList = () => {
  list.value.scrollTo({ top: list.value.scrollHeight, behavior: "smooth" });
};

const subscribeToChannel = () => {
  pusherService.subscribe("private-messages").bind("App\\Events\\SendMessageEvent", (event) => {
    messageStore.messages = [...messageStore.messages, event.message];

    scrollList();
  });
};

onMounted(async () => {
  subscribeToChannel();

  await fetchMessages();

  scrollList();
});
</script>
