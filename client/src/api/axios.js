import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  withCredentials: true, // HttpOnly 쿠키 자동 전송
});

let refreshing = null;

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    const original = err.config;
    if (status !== 401 || original?._retry) throw err;

    if (!refreshing) {
      refreshing = (async () => {
        try {
          await Axios.post(
            `${axios.defaults.baseURL}/api/auth/refresh`,
            {},
            { withCredentials: true }
          );
        } finally {
          refreshing = null;
        }
      })();
    }

    await refreshing;
    original._retry = true;
    return axios(original);
  }
);

export default axios;