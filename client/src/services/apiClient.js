import axios from "axios";

//Axios instance configuration
const apiClient = axios.create({
  baseURL: `${
    import.meta.env.VITE_REACT_APP_WORKING_ENVIRONMENT !== "development"
      ? import.meta.env.VITE_API_BASE_URL_PRPODUCTION
      : import.meta.env.VITE_API_BASE_URL_DEVELOPMENT
  }`,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
