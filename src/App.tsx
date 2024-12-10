import { Outlet, useNavigate } from "react-router-dom";
import Navigator from "./components/navigator";
import Header from "./components/header/header";
// import { Block } from "./components/block/block";

function App() {
  const navigate = useNavigate();
  const isLoginPage = location.pathname.startsWith("/login");
  const isPlaceDetailPage = location.pathname.startsWith("/place/detail");
  const isReceiptCheckPage = location.pathname.startsWith("/review");
  const isWriteReviewPage = location.pathname.startsWith("/review/write");
  const isPlanCreatePage = location.pathname.startsWith("/plan/create");

  const isOnboardingPage =
    location.pathname.startsWith("/onboarding") ||
    location.pathname.startsWith("/mypage/pet-register");

  // 뒤로가기 버튼 핸들러
  const handleBackButtonClick = () => {
    if(location.pathname.startsWith("/plan/recommend")){ //추천일정 경로에서 닫기 버튼 누르면 일정으로 돌아가기
      navigate('/plan')
    }else{ //그 외 다른 경로
      navigate(-1); // 이전 페이지로 이동
    }
  };

  return (
    <>
      {/* 헤더 */}
      <Header handleBackButtonClick={handleBackButtonClick} />

      <Outlet />

      {/* 하단 네비게이션 */}
      <Navigator
        isLoginPage={isLoginPage}
        isPlaceDetailPage={isPlaceDetailPage}
        isReceiptCheckPage={isReceiptCheckPage}
        isWriteReviewPage={isWriteReviewPage}
        isOnboardingPage={isOnboardingPage}
        isPlanCreatePage={isPlanCreatePage}
      />
    </>
  );
}

export default App;
