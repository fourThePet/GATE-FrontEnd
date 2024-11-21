import { Outlet, useNavigate } from "react-router-dom";
import Navigator from "./components/navigator";
import Header from "./components/header/header";
// import { Block } from "./components/block/block";
function App() {
  const navigate = useNavigate();
  const isLoginPage = location.pathname.startsWith("/login");
  const isPlaceDetailPage = location.pathname.startsWith("/placedetail");

  // 뒤로가기 버튼 핸들러
  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <>
      {/* 헤더 */}
      <Header handleBackButtonClick={handleBackButtonClick} />

      {/* 라우터에 따른 페이지 렌더링 */}
      <Outlet />

      {/* 하단 네비게이션 */}
      <Navigator isLoginPage={isLoginPage} />
      <Navigator isPlaceDetailPage={isPlaceDetailPage} />
    </>
  );
}

export default App;
