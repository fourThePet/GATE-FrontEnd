import { useState } from "react";
import { typo } from "../../../../styles/typo";
import { BasicInfoContainer } from "../index.styles";
import { Block } from "../../../../components/block/block";
import { Gpt } from "../../../../assets/svg";
import { useGetPlaceReviews } from "../../../../queries/reviews";
import { useGetReviewSummary } from "../../../../queries/reviews";

type ReviewGptProps = {
  placeId: number; // placeId를 props로 받음
};

export const PlaceReviewList = ({ placeId }: { placeId: number }) => {
  const { data, isLoading, error } = useGetPlaceReviews(placeId);

  if (isLoading) return <p>리뷰를 불러오는 중입니다...</p>;
  if (error) return <p>리뷰를 못 가져왔습니다.</p>;

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

export default function ReviewGpt({ placeId }: ReviewGptProps) {
  const [activeTab, setActiveTab] = useState<"high" | "low">("high");
  const handleTabClick = (tab: "high" | "low") => {
    setActiveTab(tab);
  };

  // Fetch review summary based on activeTab
  const {
    data: reviewSummary,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useGetReviewSummary(
    placeId,
    activeTab === "high" ? "POSITIVE" : "NEGATIVE"
  );

  return (
    <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
      {/* 상단 리뷰 제목 및 아이콘 */}
      <div
        css={Block.flexBlock({
          direction: "column",
          border: "1px solid #E0E0E0",
          borderRadius: "20px",
          padding: "20px",
          gap: "20px",
        })}
        style={{ marginTop: "30px" }}
      >
        {/* ChatGPT로 최근 후기를 요약했어요 */}
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "5px",
          })}
          style={{ marginTop: "10px" }}
        >
          <Gpt
            css={{ width: "30px", height: "30px" }}
            style={{ marginRight: "10px" }}
          />
          <span css={typo.Heading4}>ChatGPT로 최근 후기를 요약했어요</span>
        </div>

        {/* 탭 */}
        <div
          css={Block.flexBlock({
            direction: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "20px 0",
            padding: "10px",
            width: "100%",
            border: "1px bottom solid #E0E0E0",
            borderRadius: "10px",
          })}
          style={{ backgroundColor: "#F8F8F8" }}
        >
          <div
            onClick={() => handleTabClick("high")}
            style={{
              cursor: "pointer",
              fontWeight: activeTab === "high" ? "bold" : "normal",
              color: activeTab === "high" ? "#111111" : "#A4A4A4",
            }}
          >
            높은 평점 요약
          </div>
          <div
            onClick={() => handleTabClick("low")}
            style={{
              cursor: "pointer",
              fontWeight: activeTab === "low" ? "bold" : "normal",
              color: activeTab === "low" ? "#111111" : "#A4A4A4",
            }}
          >
            낮은 평점 요약
          </div>
        </div>

        {/* 탭 내용 */}
        <div
          css={Block.flexBlock({
            direction: "column",
            padding: "10px",
            borderRadius: "10px",
          })}
          style={{ marginTop: "-30px" }}
        >
          {isSummaryLoading ? (
            <p css={typo.Body2} style={{ color: "#666666" }}>
              리뷰 요약을 불러오는 중입니다...
            </p>
          ) : summaryError ? (
            <p css={typo.Body2} style={{ color: "#666666" }}>
              리뷰를 못 가져왔습니다.
            </p>
          ) : (
            <p css={typo.Body2} style={{ color: "#666666" }}>
              {reviewSummary?.answer}
            </p>
          )}
        </div>

        {/* 리뷰 정확성 알림 */}
        <div
          css={Block.flexBlock({
            direction: "row",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <p
            css={typo.Body3}
            style={{
              color: "#9A9EA6",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            ※ 리뷰 요약이 정확하지 않거나 표현이 어색할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}
