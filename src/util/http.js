import axios from 'axios';
import store from 'store';

// axios.defaults.withCredentials = true;
const userId = store.get('userId');
console.log(userId);
if (userId) {
  axios.defaults.headers.userid = userId;
}

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/'
    : '/api/';

axios.interceptors.response.use(
  response => response.data,
  err => {
    if (err && err.response) {
      let errorMsg = null;
      switch (err.response.status) {
        case 400:
          errorMsg = '请求错误';
          break;
        case 401:
          errorMsg = '未授权，请登录';
          store.remove('userId');
          location.href = '/login';
          break;
        case 403:
          errorMsg = '拒绝访问';
          break;
        case 404:
          errorMsg = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          errorMsg = '请求超时';
          break;
        case 500:
          errorMsg = '服务器内部错误';
          break;
        case 501:
          errorMsg = '服务未实现';
          break;
        case 502:
          errorMsg = '网关错误';
          break;
        case 503:
          errorMsg = '服务不可用';
          break;
        case 504:
          errorMsg = '网关超时';
          break;
        case 505:
          errorMsg = 'HTTP版本不受支持';
          break;
        default:
      }
      if (err.response.data && err.response.data.errmsg) {
        errorMsg = err.response.data.errmsg;
      }
      window.app.$message.error(errorMsg);
    }
    return Promise.reject(err);
  }
);
