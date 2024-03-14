// 在 '/@/utils/requestdb' 文件中定义网络请求工具 requestdb

import axios from 'axios';

// 创建 Axios 实例
const requestdb = axios.create({
  baseURL: 'http://localhost::8089/api', // 根据实际情况修改 baseURL
  timeout: 10000, // 请求超时时间设置为 10 秒
});

// 请求拦截器
requestdb.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加 token、设置请求头等
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
requestdb.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么，比如统一处理错误信息等
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default requestdb;
