import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const login = useAuthStore((state)=> state.login)

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");
    const status = queryParams.get("status");
    const targetPath = localStorage.getItem("pathname") || '/'
    
    if (accessToken && refreshToken && status) {
      // 토큰 저장
      login(accessToken)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 상태에 따른 페이지 이동
      if (status === "ACTIVE") {
        
        navigate(targetPath, {replace: true}); // 메인 페이지로 이동
        localStorage.removeItem("pathname")
      } else if (status === "NONACTIVE") {
        navigate("/onboarding/user"); // 회원가입 페이지로 이동
      } else {
        console.log("알 수 없는 상태입니다:", status);
      }
    } 
  }, [login,navigate]);

  return <></>;
};


