import Pusher from "pusher-js";
import useAuthStore from "../store/authStore";

const authStore = useAuthStore();

// Custom websocket server
const pusherService = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  channelAuthorization: {
    endpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  },
});

// Pusher config
// const pusherService = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   channelAuthorization: {
//     endpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
//     headers: {
//       Authorization: `Bearer ${authStore.token}`,
//     },
//   },
// });

export default pusherService;
