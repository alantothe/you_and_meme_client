import api from "./apiConfig";

// FUNCTIONS FROM MEME API
// make sure the endpoints are correct
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMeme = async (id) => {
  try {
    const response = await api.get(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMeme = async (meme) => {
  try {
    const response = await api.post("/memes", meme);
    return response.data;
  } catch (error) {
    throw error;
  }
};
