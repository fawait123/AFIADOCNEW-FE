import axios from "axios";
import { notification } from "antd";
import { BASE_URL } from "@/utils/base_url";

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
    // Do something before request is sent
    // handleNotification("success", "Success2", "succes3");
    return config;
  },
  function (error) {
    // Do something with request error
    // handleNotification("error", "error2", "error3");
    return Promise.reject(error);
  }
);

API.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer " + window.localStorage.getItem("token");
  return config;
});

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    handleNotification("success", "Success", "");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    handleNotification("error", "Error", "terjadi kesalahan");
    // console.log(error.response.data.message, "err");
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default API;
