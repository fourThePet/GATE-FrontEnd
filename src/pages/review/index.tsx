import { PageWrapper } from "../../styles/ui";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Divider } from "../../styles/ui";
import Reviews from "../place/place-detail/components/reviews";

export default function Review() {
  const averageRating = 4.9; // 평균 평점
  const reviewCount = 12; // 리뷰 개수

  // 별점 렌더링 함수
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i < Math.floor(rating) ? "#F1729B" : "#E0E0E0", // 활성화/비활성화된 별 색상
            fontSize: "24px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      css={PageWrapper}
      style={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        position: "relative",
      }}
    >
      {/* 스크롤바 숨기기 스타일 */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {/* 리뷰 상단 */}
      <div
        css={Block.flexBlock({
          direction: "row",
          alignItems: "center",
          gap: "20px",
        })}
        style={{ marginTop: "100px", marginLeft: "30px" }}
      >
        {/* 평균 평점 */}
        <div>
          <span css={typo.Heading1} style={{ color: "#000000" }}>
            {averageRating.toFixed(1)}
          </span>
        </div>

        {/* 후기 및 별점 */}
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "flex-start",
            gap: "5px",
          })}
        >
          <span css={typo.Body2} style={{ color: "#000000" }}>
            후기 {reviewCount}개
          </span>
          {/* 별점 */}
          <div>{renderStars(averageRating)}</div>
        </div>
      </div>
      <Divider
        style={{
          marginLeft: "30px",
          width: "90%",
        }}
      />
      <Reviews />
      <Divider
        style={{
          marginLeft: "30px",
          width: "90%",
        }}
      />
      <Reviews />
    </div>
  );
}
