// @ts-nocheck
import axios from "axios";
import {API_URL} from "./keys.json";
const apiAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export {apiAxios};
