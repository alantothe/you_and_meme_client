import api from "./apiConfig";
import jwtDecode from "jwt-decode";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login/", loginData);
    localStorage.setItem("token", response.data.token);
    const user = jwtDecode(response.data.token);
    // console.log(user);
    return user;
  } catch (err) {
    throw err;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");

  // Check if the token is not null
  if (token) {
    try {
      // Decode the token directly
      const user = jwtDecode(token);
      console.log(user);
      return user;
    } catch (err) {
      console.error("Error during token verification:", err);
      return false;
    }
  }
  return console.log("No token found");
};

export const registerUser = async (registerData) => {
  try {
    const response = await api.post("/user/signup/", registerData);
    // localStorage.setItem("token", response.data.token);
    // const user = jwtDecode(response.data.token);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsByUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserLikedPosts = async (id, likedPosts) => {
  try {
    const response = await api.put(`/users/${id}/add_to_liked_posts/`, {
      likedPosts: [likedPosts],
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
