import axios from "axios";
import { message } from "ant-design-vue";

import { getToken, removeToken } from "@/utils/cookie";

const errorParser = async (response) => {
  // const t = i18n.global.t;
  let error = null;
  if (response.status < 300) {
    return response;
  } else if (response.status === 401) {
    message.error("请先登录！");
    removeToken();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    error = new Error(response.data.msg || response.data);
  }
  // message.error(error.message)
  return Promise.reject(error);
};

export const createInstance = (baseUrl, authenticated) => {
  const timeout = 5000000;
  const headers = {};
  if (authenticated) {
    headers["x-auth-key"] = `Bearer ${getToken()}`;
  }
  const instance = axios.create({
    baseURL: baseUrl,
    timeout,
    headers,
    validateStatus: () => true,
  });
  instance.interceptors.response.use(errorParser);
  return instance;
};

export const createAuthInstance = (baseUrl) => createInstance(baseUrl, true);
