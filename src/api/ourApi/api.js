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

// getAllPosts - home page

// user can delete their own post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
