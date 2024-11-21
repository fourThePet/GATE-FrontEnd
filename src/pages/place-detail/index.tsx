import { useNavigate } from "react-router-dom";
import BackTitleHeader from "../../components/header/back-title";
import { HeaderContainer } from "./index.styles";
import { PageWrapper } from "../../styles/ui";
import StoreInfo from "../../components/place-detail/store-info"; // StoreInfo 컴포넌트 import
import { Divider2 } from "../../styles/ui";
import BasicInfo from "../../components/place-detail/basic-info";
import ReviewGpt from "../../components/place-detail/review-gpt";
export default function PlaceDetail() {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div
      css={PageWrapper}
      style={{
        height: "100vh", // 부모 요소 높이를 100vh로 고정
        overflowY: "scroll", // 스크롤 활성화
        overflowX: "hidden", // 가로 스크롤 제거
        scrollbarWidth: "none", // Firefox에서 스크롤바 숨김
        msOverflowStyle: "none", // IE/Edge에서 스크롤바 숨김
        marginTop: "79px",
      }}
    >
      <style>
        {`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
          }
        `}
      </style>

      {/* 헤더 */}
      <div css={HeaderContainer}>
        <BackTitleHeader
          title="더왈츠 애견카페"
          handleBackButtonClick={handleBackButtonClick}
        />
      </div>
      <StoreInfo />
      <Divider2 />
      <BasicInfo />
      <Divider2 />
      <ReviewGpt />
    </div>
  );
}
