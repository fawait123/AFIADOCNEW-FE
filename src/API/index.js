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
    if (response.config.method !== "get") {
      if (response.data.message) {
        handleNotification("success", "Success", response.data.message);
      }
    }
    return response;
  },
  function (error) {
    if (!error.response) {
      handleNotification(
        "error",
        "Error",
        "Server sedang sibuk, menunggu response dari server! Silahkan reload aplikasi anda"
      );
    }
    if (error?.response?.data?.message) {
      handleNotification("error", "Error", error.response.data.message);
    }
    // console.log(error?.response?.status, "err");
    if (error?.response?.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error?.response?.status === 403) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;
