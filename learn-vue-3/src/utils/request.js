import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
});

//request 拦截器
service.interceptors.request.use(config =>
{
  console.log(config);
  return config;
}, error =>
{
  console.error(error);
  Promise.reject(error);
});

service.interceptors.response.use(res =>
{
  console.log(res);
  return Promise.resolve(res.data);
}, error =>
{
  console.error(error);
  return Promise.reject(error);
});

export default service;
