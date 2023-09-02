import api from "./apiConfig.js";

// getAllPosts - home page
export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePostByLikes = async (id, likesData) => {
  try {
    const response = await api.put(`/posts/${id}/`, {
      likes: likesData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMeme = async (postData) => {
  try {
    const response = await api.post("/posts/", postData);
    return response.data;
  } catch (err) {
    throw err;
  }
};
