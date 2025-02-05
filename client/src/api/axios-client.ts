import axios from "axios";
import { AxiosAdapter, HttpClient } from "./http-adapter";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const api = axios.create(options);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }
    return Promise.reject({
      ...data,
    });
  }
);

const requester = AxiosAdapter.create(api);
const API = new HttpClient(requester);

export { API };
