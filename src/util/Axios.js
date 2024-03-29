import axios from "axios";
import {Message} from "element-ui";

const service = axios.create({
  baseURL: process.env.BASE_API
})

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  return config
})

service.interceptors.response.use(response => response.data, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
