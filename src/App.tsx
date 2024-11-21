import { Outlet, useNavigate } from "react-router-dom";
import Navigator from "./components/navigator";
import Header from "./components/header/header";
// import { Block } from "./components/block/block";
// import { Layout } from "./components";
function App() {
  const navigate = useNavigate();

  // 뒤로가기 버튼 핸들러
  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 알림 버튼 핸들러
  const handleBellButtonClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <>
      {/* 헤더 */}
      <Header
        handleBackButtonClick={handleBackButtonClick}
        handleBellButtonClick={handleBellButtonClick}
      />

      {/* 라우터에 따른 페이지 렌더링 */}
      <Outlet />

      {/* 하단 네비게이션 */}
      <Navigator />
    </>
  );
}

export default App;
