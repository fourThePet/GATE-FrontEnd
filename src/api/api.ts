import axios from "axios";

export const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type':'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const formAPI = axios.create({
  baseURL : import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 만료 시 재발급 처리
api.interceptors.response.use(
  (response) => response, // 응답이 성공하면 그대로 반환
  async (error) => {
    if (error.response?.status === 401 && error.response?.data?.message === "TokenExpired") {
      // 액세스 토큰 만료: 리프레시 토큰으로 재발급 요청
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await axios.post("/members/reissue", { refreshToken });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken); // 새 리프레시 토큰 저장
        // 원래 요청 다시 시도
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api.request(error.config);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        // 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error); // 기타 에러는 그대로 반환
  }
);