import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const $api = axios.create({
  baseURL: `${API_URL}`,
});

$api.interceptors.request.use(
  (config) => {
    const TOKEN = JSON.parse(localStorage.getItem("token"));
    if (TOKEN) {
      config.headers = { Authorization: `JWT ${TOKEN}` };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default $api;
