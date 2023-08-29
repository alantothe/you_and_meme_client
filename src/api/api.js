import api from "./apiConfig";
import { memes } from "./assets/templates.js";

export const getMemes = async () => {
  try {
    const response = await api.get("/memes");
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

export const deleteMeme = async (id) => {
  try {
    const response = await api.delete(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (memeId) => {
  try {
    const response = await api.get(`/memes/${memeId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
