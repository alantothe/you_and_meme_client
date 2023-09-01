import api from "./apiConfig";

export const createComment = async (inputData) => {
  try {
    const response = await api.post("/comments/", inputData);
    return response;
  } catch (err) {
    throw err;
  }
};
