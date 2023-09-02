import api from "./apiConfig";

export const createComment = async (inputData) => {
  try {
    const response = await api.post("/comments/", inputData);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/comments/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
