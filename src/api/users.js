import api from "./apiConfig";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login/", loginData);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
