import axios from "axios";

let apiUrl;

const apiUrls = {
  production: "",
  development: "https://you-and-meme-backend-6abb25257062.herokuapp.com/",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
