import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("accessToken"); // 초기화 시 토큰 검사
  return {
    isLoggedIn: !!token, // 토큰이 있으면 true
    accessToken: token || null,
    login: (token: string) =>
      set(() => ({
        isLoggedIn: true,
        accessToken: token,
      })),
    logout: () =>{
      localStorage.removeItem("accessToken"); // 토큰 삭제
      set(() => ({
        isLoggedIn: false,
        accessToken: null,
      }))
    }
  };
});
