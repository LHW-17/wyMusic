import axios from "axios";
declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      alert(res.message || "error");
      return Promise.reject(new Error(res.message || "error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default service;
