import axios from "axios";

// 1️⃣ 创建 axios 实例（相当于一个“定制版请求工具”）
const request = axios.create({
  baseURL: "http://localhost:3000", // 后端地址
  timeout: 5000,
});

// 2️⃣ 请求拦截器（发送请求之前）
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 取 token
    const token = localStorage.getItem("token");

    if (token) {
      // 自动加到请求头
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3️⃣ 响应拦截器（服务器返回之后）
request.interceptors.response.use(
  (response) => {
    return response.data; // 直接返回数据
  },
  (error) => {
    // 如果 token 过期 / 未授权
    if (error.response && error.response.status === 401) {
      alert("登录过期，请重新登录");

      // 清除 token
      localStorage.removeItem("token");

      // 跳转登录页
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// 4️⃣ 导出
export default request;