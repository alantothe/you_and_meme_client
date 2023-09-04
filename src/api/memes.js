import api from "./apiConfig.js";

// Meme Selection page
export const getAllTemplates = async () => {
  try {
    const response = await api.get("/memes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create Meme page
export const getTemplateById = async (id) => {
  try {
    const response = await api.get(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
