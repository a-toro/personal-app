import axios from "axios";

const BASE_URL_API = "http://localhost:9000/api";

export default axios.create({
  baseURL: BASE_URL_API,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
