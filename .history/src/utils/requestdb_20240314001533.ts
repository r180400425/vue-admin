// 在 '/@/utils/request.js' 文件中定义网络请求工具

import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: 'http://local.com', // 设置基础URL
  timeout: 10000, // 设置请求超时时间（单位：毫秒）
  headers: {
    'Content-Type': 'application/json', // 设置请求头部信息
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加 token 等操作
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 封装网络请求函数
export const request = {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, data);
  },
  put(url, data) {
    return instance.put(url, data);
  },
  delete(url) {
    return instance.delete(url);
  },
};

export default request;
