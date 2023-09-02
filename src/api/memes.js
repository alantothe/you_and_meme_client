import api from "./apiConfig.js";

// getAllTemplates - Selection page
export const getAllTemplates = async () => {
  try {
    const response = await api.get("/memes");
    return response.data;
  } catch (error) {
    throw error;
  }
};
