import axios from "axios";
const apiAxios = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "/"
      : process.env.REACT_APP_API_URL_PROD,
  withCredentials: true,
});

export { apiAxios };
