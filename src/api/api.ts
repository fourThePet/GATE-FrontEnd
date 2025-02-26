import axios from "axios";
import * as Sentry from "@sentry/react"; // Sentry 모듈 가져오기

import { useAuthStore } from "../stores/useAuthStore";
import { notify } from "../utils/constants";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // Zustand에서 토큰 가져오기
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
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

formAPI.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken; // Zustand에서 토큰 가져오기
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
    if (error.response?.status === 401) {
      // 액세스 토큰 만료: 리프레시 토큰으로 재발급 요청

      const refreshToken = localStorage.getItem("refreshToken");
      localStorage.removeItem("accessToken");
      const login = useAuthStore.getState().login; // Zustand의 login 메서드
      const logout = useAuthStore.getState().logout; // Zustand의 logout 메서드
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/members/reissue`,
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // 헤더에 토큰 포함
            },
          }
        );

        login(data?.result.accessToken);
        localStorage.setItem("accessToken", data?.result.accessToken);
        // 원래 요청 다시 시도
        error.config.headers.Authorization = `Bearer ${data?.result.accessToken}`;
        return api.request(error.config);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        // 로그아웃 처리
        notify({
          type : "warning",
          text : "세션이 만료되었어요. 다시 로그인해주세요",
          onClose : () =>{
            logout();
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";

          }
        })
      }
    }
    if (!error.response) {
      const requestUrl = error.config?.url || "URL 정보 없음";
      Sentry.withScope((scope) => {
        scope.setLevel("error");
        scope.setTag("error type", "Network Error");
        Sentry.captureMessage(
          `[Network Error] ${requestUrl} \n${error.message ?? `네트워크 오류`}`
        );
      });
    }
    if (
      error.response?.status >= 400 &&
      ![401, 403, 409].includes(error.response?.status)
    ) {
      const isServerError = error.response?.status >= 500;
      const errorType = isServerError ? "Server Error" : "Api Error";
      Sentry.withScope((scope) => {
        scope.setLevel("error");
        scope.setTag("error type", errorType);
        Sentry.captureMessage(
          `[${errorType}] ${error.config.url} \n${error.message}`
        );
      });
    }
    return Promise.reject(error); // 기타 에러는 그대로 반환
  }
);
