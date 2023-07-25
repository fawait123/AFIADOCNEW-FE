import axios from "axios";
import { notification } from "antd";
import { BASE_URL } from "@/utils/base_url";
import { useRouter } from "next/navigation";

const handleNotification = (type, title, text) => {
  notification[type]({
    message: title,
    description: text,
  });
};

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

API.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer " + window.localStorage.getItem("token");
  return config;
});

API.interceptors.response.use(
  function (response) {
    handleNotification("success", "Success", "");
    return response;
  },
  function (error) {
    handleNotification("error", "Error", "terjadi kesalahan");
    if (error.data.response.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
