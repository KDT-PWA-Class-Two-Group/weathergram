import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  withCredentials: true, // HttpOnly 쿠키 자동 전송
});

// 요청 인터셉터: 모든 요청 전에 실행
axios.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem('token');
    // 토큰이 있으면 Authorization 헤더에 추가합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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