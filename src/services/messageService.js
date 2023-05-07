import api from "@/api/api";

class MessageService {
  list() {
    return api.get("/api/messages");
  }

  send(data) {
    return api.post("/api/messages", data);
  }
}

export default new MessageService();
