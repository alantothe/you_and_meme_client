import api from "./apiConfig";
// FUNCTIONS FROM OUR API

// detail page
export const getCommentsByPost = async (memeId) => {
  try {
    const response = await api.get(`/posts/${memeId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// getPostByUser - profile page
export const getPostsByUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// getAllPosts - home page
export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// user can delete their own post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMeme = async (memeUrl) => {
  try {
    const response = await api.post("/posts/", memeUrl);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createOrder = async (orderData) => {
  try {
    const resp = await api.post("/order", orderData);
    const order = resp.data;
    return order;
  } catch (error) {
    throw error;
  }
};
