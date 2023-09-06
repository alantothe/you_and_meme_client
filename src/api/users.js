import api from "./apiConfig";
import jwtDecode from "jwt-decode";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login/", loginData);
    localStorage.setItem("token", response.data.token);
    const user = jwtDecode(response.data.token);
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");

  // Check if the token is not null
  if (token) {
    try {
      // Decode the token directly
      const user = jwtDecode(token);
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

export const addUserLikedPosts = async (id, likedPosts) => {
  try {
    const response = await api.put(`/users/${id}/add_to_liked_posts/`, {
      likedPosts: [likedPosts],
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeUserLikedPosts = async (id, likedPosts) => {
  try {
    const response = await api.put(`/users/${id}/remove_from_liked_posts/`, {
      likedPosts: likedPosts,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUsername = async (id, username) => {
  try {
    const response = await api.put(`/users/${id}/update_username/`, {
      username: username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (id, password) => {
  try {
    const response = await api.put(`/users/${id}/update_password/`, {
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmail = async (id, email) => {
  try {
    const response = await api.put(`/users/${id}/`, { email: email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
