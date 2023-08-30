// FUNCTIONS FROM OUR API

// detail page
export const getCommentsByPost = async (memeId) => {
  try {
    const response = await api.get(`/memes/${memeId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// getPostByUser - profile page
export const getPostsByUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/memes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// getAllPosts - home page
export const getAllPosts = async () => {
  try {
    const response = await api.get("/memes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// user can delete their own post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
