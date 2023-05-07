import api from "@/api/api";

class AuthService {
  login(data) {
    return api.post("/api/login", data);
  }

  register(data) {
    return api.post("/api/register", data);
  }

  getUser() {
    return api.get("/api/user");
  }
}

export default new AuthService();
