<template>
  <ul role="list" class="divide-y divide-gray-200 max-h-[400px] h-[400px] overflow-y-scroll px-6 pb-24" ref="list">
    <li class="py-4" v-for="message in messages">
      <div class="flex space-x-3">
        <div class="h-6 w-6 relative">
          <img class="h-6 w-6 rounded-full" :src="`https://ui-avatars.com/api/?name=${message.user.name}`" alt="" />
          <span
            class="w-2 h-2 rounded-full block absolute right-0 bottom-0"
            :class="{ 'bg-green-500': isOnline(message.user), 'bg-grey-500': !isOnline(message.user) }"
          ></span>
        </div>
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

  <div class="py-2 px-6">
    <span v-if="typingUsers.length" class="text-sm text-gray-500">
      {{ typingUsers.map((u) => u.name).toString() }}
      <span v-if="typingUsers.length > 1">are</span>
      <span v-else>is</span>
      typing...
    </span>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import useMessageStore from "@/store/messageStore";
import pusherService from "@/services/pusherService";
import { useToast } from "vue-toast-notification";

const messageStore = useMessageStore();
const list = ref();
const toast = useToast();
const typingUsers = ref([]);
const onlineUsersIds = ref([]);

const messages = computed(() => {
  return messageStore.messages;
});

const fetchMessages = async () => {
  await messageStore.list();
};

const scrollList = () => {
  list.value.scrollTo({ top: list.value.scrollHeight, behavior: "smooth" });
};

const isOnline = (user) => {
  return onlineUsersIds.value.includes(user.id);
};

const addMemberToOnlineUserList = (memberId) => {
  if (!onlineUsersIds.value.includes(memberId)) {
    onlineUsersIds.value = [...onlineUsersIds.value, memberId];
  }
};

const removeMemberFromOnlineUserList = (memberId) => {
  const index = onlineUsersIds.value.indexOf(memberId);

  const copyArray = [...onlineUsersIds.value];
  copyArray.splice(index, 1);
  onlineUsersIds.value = copyArray;
};

const subscribeToChannel = () => {
  const channel = pusherService.subscribe("presence-messages");

  channel
    .bind("pusher:subscription_succeeded", () => {
      console.log(channel.members);
      channel.members.each((member) => addMemberToOnlineUserList(Number(member.id)));
    })
    .bind("pusher:member_added", (event) => {
      addMemberToOnlineUserList(Number(event.info.id));
      toast.info(`${event.info.name} joined the chat!`);
    })
    .bind("pusher:member_removed", (event) => {
      removeMemberFromOnlineUserList(Number(event.info.id));
      toast.warning(`${event.info.name} left the chat!`);
    })
    .bind("App\\Events\\SendMessageEvent", (event) => {
      messageStore.messages = [...messageStore.messages, event.message];
      scrollList();
    })
    .bind("client-typing", (user) => {
      if (!typingUsers.value.some((u) => u.id === user.id)) {
        typingUsers.value = [...typingUsers.value, user];
      }
    });
};

onMounted(async () => {
  subscribeToChannel();

  await fetchMessages();

  scrollList();

  // Reset Typing users value after 2 seconds
  setInterval(() => {
    typingUsers.value = [];
  }, 2000);
});
</script>
