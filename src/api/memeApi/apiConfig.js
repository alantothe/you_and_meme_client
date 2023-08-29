import axios from "axios";

let baseURL = "api.imgflip.com/";

const api = axios.create({
  baseURL,
});

export default api;
