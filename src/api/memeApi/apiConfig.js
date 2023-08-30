import axios from "axios";

let baseURL = "http://localhost:8000/";

const api = axios.create({
  baseURL,
});

export default api;
