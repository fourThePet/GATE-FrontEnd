import { Outlet, useNavigate } from "react-router-dom";
import Navigator from "./components/navigator";
import Header from "./components/header/header";
// import { Block } from "./components/block/block";

function App() {
  const navigate = useNavigate();
  const isLoginPage = location.pathname.startsWith("/login");
  const isPlaceDetailPage = location.pathname.startsWith("/place/detail");
  const isReceiptCheckPage = location.pathname.startsWith(
    "/review/receiptcheck"
  );
  const isWriteReviewPage = location.pathname.startsWith("/review/writereview");

  // 뒤로가기 버튼 핸들러
  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <>
      <Header handleBackButtonClick={handleBackButtonClick} />

      <Outlet />

      {/* 하단 네비게이션 */}
      <Navigator
        isLoginPage={isLoginPage}
        isPlaceDetailPage={isPlaceDetailPage}
        isReceiptCheckPage={isReceiptCheckPage}
        isWriteReviewPage={isWriteReviewPage}
      />
    </>
  );
}

export default App;
