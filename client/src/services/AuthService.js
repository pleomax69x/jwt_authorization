import axios from "axios";
import api from "../http";

const API_URL = "http://localhost:4000/api";

// export default class AuthService {
//   static async login(email, password) {
//     return api.post("/login", { email, password });
//   }
//   static async registration(email, password) {
//     return api.post("/registration", { email, password });
//   }
//   static async logout() {
//     return api.post("/logout");
//   }
// }

const login = async (email, password) => {
  try {
    const res = await api.post("/login", { email, password });
    console.log(res.data);
    return res.data;
  } catch (error) {}
};
const registration = async (email, password) => {
  try {
    const res = await api.post("/registration", { email, password });
    console.log(res.data);
    return res.data;
  } catch (error) {}
};
const logout = async () => {
  try {
    const res = await api.post("/logout");
    return res;
  } catch (error) {}
};

const checkAuth = async () => {
  try {
    const res = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {}
};

const AuthService = {
  login,
  registration,
  logout,
  checkAuth,
};

export default AuthService;
