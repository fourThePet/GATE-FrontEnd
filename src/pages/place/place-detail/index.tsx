import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

export default function PlaceDetail() {
  const navigate = useNavigate();
  const [isButtonVisible, setIsButtonVisible] = useState(false); // 지도보기 버튼 보임 상태
  const howToComeRef = useRef<HTMLDivElement | null>(null); // HowToCome 컴포넌트의 ref

  const placeId = 1; // 임시 placeId
  const { data, isLoading, error } = useGetPlaceReviews(placeId); // 리뷰 데이터 가져오기

  const handleAllReviewButtonClick = () => {
    navigate("/review", { state: { placeId } }); // placeId 전달
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(entry.isIntersecting); // HowToCome이 화면에 보일 때만 버튼 보이게 설정
      },
      { threshold: 0.1 } // 10%가 보이면 화면에 있다고 간주
    );

    if (howToComeRef.current) {
      observer.observe(howToComeRef.current); // HowToCome 컴포넌트를 감시
    }

    return () => {
      if (howToComeRef.current) {
        observer.unobserve(howToComeRef.current); // 컴포넌트 언마운트 시 감시 해제
      }
    };
  }, []);

  if (isLoading) return <div>리뷰를 불러오는 중입니다...</div>;
  if (error || !data) return <div>리뷰 데이터를 가져오는 데 실패했습니다.</div>;

  const { reviewResponseList } = data; // 리뷰 데이터에서 리뷰 리스트 추출

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
      {reviewResponseList.length > 0 && <ReviewGpt placeId={placeId} />}
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
            display: "block", // 버튼을 블록 요소로 설정
            marginLeft: "auto", // 자동 왼쪽 마진
            marginRight: "auto", // 자동 오른쪽 마진 (가운데 정렬)
          }}
          onClick={handleAllReviewButtonClick}
        >
          리뷰 전체보기
        </button>
      )}
      <Divider2 />
      <div ref={howToComeRef}>
        <HowToCome />
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
            // 버튼 클릭 시 동작
          }}
          style={{
            position: "fixed", // 화면에 고정
            bottom: "30px", // 하단에서 30px 위
            left: "50%", // 화면의 가운데 정렬
            transform: "translateX(-50%)", // 가운데 정렬 보정
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
