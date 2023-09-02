import api from "./apiConfig.js";

// Profile Page
export const getPostsByUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Profile Page
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Home Page
export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create Meme Page
export const postMeme = async (postData) => {
  try {
    const response = await api.post("/posts/", postData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Meme Selection Page
export const getAllTemplates = async () => {
  try {
    const response = await api.get("/memes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// detail page
// export const getCommentsByPost = async (memeId) => {
//   try {
//     const response = await api.get(`/posts/${memeId}/comments`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
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

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
