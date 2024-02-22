import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  //Add potential headers for all calls here...
  headers: {},
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
