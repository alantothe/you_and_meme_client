import api from "./apiConfig";
import jwtDecode from "jwt-decode";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login/", loginData);
    localStorage.setItem("token", response.data.token);
    const user = jwtDecode(response.data.token);
    return user;
  } catch (err) {
    throw err;
  }
};
