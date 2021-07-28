import axios from "axios";

// 创建axios实例，赋值变量service
const service = axios.create();

const BASE_URL = process.env.NODE_ENV === "production" ? "" : "/devApi";

// 创建实例后修改默认值
service.defaults.baseURL = BASE_URL;
// service.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// 在 node.js 用GET请求获取远程图片
// service
//   .request({
//     method: "get",
//     url: "http://bit.ly/2mTM3nY",
//     responseType: "stream",
//   })
//   .then(function (response) {
//     response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
//   });

export default service;
