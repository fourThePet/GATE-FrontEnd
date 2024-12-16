import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { PageWrapper } from "../../../styles/ui";
import StoreInfo from "./components/store-info"; // StoreInfo 컴포넌트 import
import { Divider2 } from "../../../styles/ui";
import ReviewGpt from "./components/review-gpt";
import Reviews from "./components/reviews";
import HowToCome from "./components/how-to-come";
import { Button } from "../../../components/button/button";
import { Block } from "../../../components/block/block";
import { typo } from "../../../styles/typo";
import { Mapicon } from "../../../assets/svg";
import ReviewPercent from "./components/review-percent";
import { useGetPlaceReviews } from "../../../queries/reviews"; // 리뷰 데이터 가져오기 훅
import { Writereview } from "../../../assets/svg";
import { useAuthStore } from "../../../stores/useAuthStore";
import { BasicInfoContainer } from "./index.styles";
import { useLocation } from "react-router-dom";
import { LoadingBar } from "../../../components";

export const PlaceReviewList = ({ placeId }: { placeId: number }) => {
  const { data, isLoading, error } = useGetPlaceReviews(placeId);

  if (isLoading) return <LoadingBar />;
  if (error) return <p>리뷰를 가져오는 데 실패했습니다.</p>;

  return (
    <div
      css={Block.flexBlock({
        direction: "row",
        alignItems: "center",
        gap: "5px",
      })}
      style={{ marginTop: "-15px" }}
    >
      <span css={typo.Body1} style={{ color: "#F1729B" }}>
        ★
      </span>
      <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
        {data?.starRateAvg} ({data?.reviewCount})
      </span>
    </div>
  );
};

export default function PlaceDetail() {
  const navigate = useNavigate();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const howToComeRef = useRef<HTMLDivElement | null>(null); // HowToCome 컴포넌트의 ref
  const { isLoggedIn } = useAuthStore();
  const location = useLocation(); // `state`로 전달된 데이터 접근
  const placeId = location.state?.placeId; // state에서 placeId 가져오기
  const queryParams = new URLSearchParams(location.search);
  const latitude = parseFloat(queryParams.get("latitude") || "0");
  const longitude = parseFloat(queryParams.get("longitude") || "0");

  // const placeId = 1; // 임시 placeId
  const { data, isLoading, error } = useGetPlaceReviews(placeId); // 리뷰 데이터 가져오기

  const handleAllReviewButtonClick = () => {
    navigate(`/review/${placeId}`, { state: { placeId } });
  };

  // Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (howToComeRef.current) {
      observer.observe(howToComeRef.current);
    }

    return () => {
      if (howToComeRef.current) {
        observer.unobserve(howToComeRef.current);
      }
    };
  }, [howToComeRef.current]); // `

  if (isLoading) return <LoadingBar />;
  if (error || !data) return <div>리뷰 데이터를 가져오는 데 실패했습니다.</div>;

  const { reviewResponseList } = data; // 리뷰 데이터에서 리뷰 리스트 추출

  const handleReviewButtonClick = () => {
    navigate(`/review/receipt-check/${placeId}`, { state: { placeId } }); // placeId를 동적으로 포함
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
        position: "relative", // 상대 위치 지정
      }}
    >
      <style>
        {`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
          }
        `}
      </style>
      <StoreInfo placeId={placeId} />
      <Divider2 />
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          })}
        >
          <h1 css={typo.Heading3}>리뷰</h1>
          {/* 리뷰작성 */}
          <Writereview
            css={{ width: "70px", height: "70px", cursor: "pointer" }}
            onClick={() => {
              if (!isLoggedIn) {
                alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
                navigate("/login");
              } else {
                handleReviewButtonClick();
              }
            }}
          />
        </div>
        {/* 평점 표시 */}
        <PlaceReviewList placeId={placeId} />{" "}
        {/* `placeId`를 실제 데이터로 전달 */}
        {reviewResponseList.length > 0 && <ReviewGpt placeId={placeId} />}
      </div>
      {/* <ReviewGpt placeId={placeId} /> */}
      <ReviewPercent placeId={placeId} />
      <Reviews placeId={placeId} />
      {/* 리뷰 전체보기 버튼 */}
      {reviewResponseList.length > 0 && (
        <button
          css={Button.pinkBorderButton({
            width: "90%",
            height: "50px",
          })}
          style={{
            marginTop: "20px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleAllReviewButtonClick}
        >
          리뷰 전체보기
        </button>
      )}
      <Divider2 />
      <div ref={howToComeRef}>
        <HowToCome latitude={latitude} longitude={longitude} />
      </div>
      <div style={{ marginBottom: "60px" }} />
      {/* 지도보기 버튼 */}
      {isButtonVisible && (
        <button
          css={Button.mainPinkButton({
            isDisabled: false,
            width: "150px",
            height: "50px",
          })}
          onClick={() => {
            navigate(`/place?latitude=${latitude}&longitude=${longitude}`, {
              replace: true, // URL을 변경하면서 히스토리 기록 최소화
            });
          }}
          style={{
            position: "fixed", // 화면에 고정
            bottom: "30px", // 하단에서 30px 위
            left: "50%", // 화면의 가운데 정렬
            transform: "translateX(-50%)", // 가운데 정렬 보정
            zIndex: 1000, // 오버레이가 항상 최상위에 위치하도록 설정
          }}
        >
          <div
            css={Block.flexBlock({
              direction: "row",
              alignItems: "center",
              gap: "5px",
            })}
          >
            <Mapicon
              css={{ width: "30px", height: "30px" }}
              style={{ marginLeft: "35px" }}
            />
            <span css={typo.Label3}>지도보기</span>
          </div>
        </button>
      )}
    </div>
  );
}
