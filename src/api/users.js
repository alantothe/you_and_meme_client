import api from "./apiConfig";
import jwtDecode from "jwt-decode";

const getToken = () => {
  return new Promise((resolve) => {
    resolve(`Bearer ${localStorage.getItem("token") || null}`);
  });
};

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

export const verifyUser = async () => {
  try {
    const token = await getToken();
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      return user;
    }
    return false;
  } catch (err) {
    throw err;
  }
};
