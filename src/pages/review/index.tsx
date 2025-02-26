import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useGetPlaceReviews } from "../../queries/reviews";
import { PageWrapper } from "../../styles/ui";
import { Block } from "../../components/block/block";
import { typo } from "../../styles/typo";
import { Divider } from "../../styles/ui";
import { Button } from "../../components/button/button";
import { BasicInfoContainer } from "../place/place-detail/index.styles";
import { Sdogpink, Mdogpink, Ldogpink } from "../../assets/svg";
import formatReviewDate from "./format-review-date";
import { LoadingBar } from "../../components";
import { containerStyle, tooltipStyle } from "./index.styles";
export default function Review() {
  const location = useLocation();
  const placeId = location.state?.placeId; // 전달받은 placeId

  const { data, isLoading, error } = useGetPlaceReviews(placeId);
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});

  if (isLoading) return <LoadingBar />;
  if (error || !data) return <div>리뷰를 가져오는 데 실패했습니다.</div>;

  const { starRateAvg = "0", reviewCount = 0, reviewResponseList = [] } = data;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        // 완전히 채워진 별
        stars.push(
          <span
            key={i}
            style={{
              color: "#F1729B",
              fontSize: "24px",
            }}
          >
            ★
          </span>
        );
      } else if (i < Math.ceil(rating)) {
        // 반만 채워진 별
        stars.push(
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              fontSize: "24px",
              width: "12px", // 별의 절반만 채움
              overflow: "hidden",
              color: "#F1729B",
              top: "6px",
            }}
          >
            ★
          </span>
        );
        stars.push(
          <span
            key={`${i}-empty`}
            style={{
              fontSize: "24px",
              color: "#E0E0E0",
              marginLeft: "-12px",
            }}
          >
            ★
          </span>
        );
      } else {
        // 빈 별
        stars.push(
          <span
            key={i}
            style={{
              color: "#E0E0E0",
              fontSize: "24px",
            }}
          >
            ★
          </span>
        );
      }
    }
    return stars;
  };
  const toggleExpand = (id: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <div>
            <span css={typo.Heading1} style={{ color: "#000000" }}>
              {typeof starRateAvg === "string"
                ? parseFloat(starRateAvg).toFixed(1) // 문자열인 경우 숫자로 변환
                : starRateAvg.toFixed(1)}{" "}
            </span>
          </div>
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
          <div>
            {renderStars(
              typeof starRateAvg === "string"
                ? parseFloat(starRateAvg)
                : starRateAvg
            )}
          </div>
        </div>
      </div>
      <Divider style={{ marginLeft: "30px", width: "90%", height: "2px" }} />

      {/* 리뷰 리스트 */}
      {reviewResponseList.map((review, index) => (
        <div key={review.id}>
          <div css={BasicInfoContainer}>
            {/* 프로필과 별점 */}
            <div
              css={Block.flexBlock({
                direction: "row",
                alignItems: "center",
                gap: "10px",
              })}
            >
              {/* 프로필 이미지 */}
              <img
                src={review.profileUrl}
                alt="프로필 이미지"
                css={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "100%",
                  objectFit: "cover",
                  border: "2px solid #ffffff",
                }}
              />

              {/* 이름과 별점 */}
              <div>
                <div css={typo.Heading3} style={{ marginBottom: "-5px" }}>
                  {review.nickName}
                </div>
                <div
                  css={Block.flexBlock({
                    direction: "row",
                    alignItems: "center",
                    gap: "5px",
                  })}
                >
                  <span css={typo.Body1} style={{ color: "#F1729B" }}>
                    ★
                  </span>
                  <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
                    {review.starRate.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* 인증 버튼 */}
              {review.receiptCertificate && (
                <div
                  css={{
                    marginLeft: "auto",
                    padding: "5px 10px",
                    border: "1px solid #5B96F6",
                    borderRadius: "20px",
                    color: "#5B96F6",
                    fontSize: "12px",
                  }}
                >
                  인증
                </div>
              )}
            </div>

            {/* 리뷰 텍스트 */}
            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
              <p
                css={typo.Body2}
                style={{
                  lineHeight: "1.5", // 줄 간격
                  color: "#66707A", // 텍스트 색상
                  wordWrap: "break-word", // 단어 단위로 줄바꿈
                  whiteSpace: "pre-wrap", // 줄바꿈 및 공백 유지
                }}
              >
                {review.content.length > 100
                  ? expandedReviews[review.id]
                    ? review.content // 전체 내용 표시
                    : `${review.content.slice(0, 100)}...` // 100자까지만 표시
                  : review.content}
              </p>
              {review.content.length > 100 && !expandedReviews[review.id] && (
                <span
                  css={typo.Body3}
                  style={{
                    color: "#F1729B", // 버튼 색상
                    cursor: "pointer", // 마우스 포인터 변경
                    display: "inline-block", // 텍스트 줄바꿈 유지
                  }}
                  onClick={() => toggleExpand(review.id)}
                >
                  더보기
                </span>
              )}
            </div>

            {/* 조건 태그 */}
            <div
              css={Block.flexBlock({
                direction: "row",
                gap: "10px",
              })}
              style={{ marginBottom: "20px" }}
            >
              {/* 크기 아이콘 표시 */}
              {review.size === "SMALL" && (
                <div css={containerStyle}>
                  <Sdogpink css={{ width: "45px", height: "45px" }} />
                  <span css={tooltipStyle} className="tooltipStyle">
                    소형
                  </span>
                </div>
              )}

              {review.size === "MEDIUM" && (
                <div css={containerStyle}>
                  <Mdogpink css={{ width: "45px", height: "45px" }} />
                  <span css={tooltipStyle} className="tooltipStyle">
                    중형
                  </span>
                </div>
              )}

              {review.size === "LARGE" && (
                <div css={containerStyle}>
                  <Ldogpink css={{ width: "45px", height: "45px" }} />
                  <span css={tooltipStyle} className="tooltipStyle">
                    대형
                  </span>
                </div>
              )}
              {review.keywordList.map((keyword: string, index: number) => (
                <button
                  key={index}
                  css={Button.tagPinkButton({
                    isDisabled: false,
                    width: "120px",
                    height: "40px",
                  })}
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {keyword}
                </button>
              ))}
            </div>

            {/* 리뷰 이미지 */}
            {review.fileUrlList?.length > 0 &&
              review.fileUrlList[0] !== null && (
                <div
                  css={{
                    overflowX: "auto", // 가로 스크롤 활성화
                    whiteSpace: "nowrap", // 줄바꿈 방지
                    marginTop: "10px",
                  }}
                >
                  {review.fileUrlList.map(
                    (fileUrl: string | null, index: number) => {
                      if (!fileUrl) return null; // fileUrl이 null인 경우 렌더링하지 않음

                      // 비디오인지 확인 (확장자를 기반으로 체크)
                      const isVideo = /\.(mp4|mov|avi|webm|ogg)$/i.test(
                        fileUrl
                      );

                      return isVideo ? (
                        <div
                          key={index}
                          style={{
                            flex: "0 0 auto",
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px",
                            position: "relative",
                            display: "inline-block", // 가로 배치
                            marginRight: "5px",
                          }}
                        >
                          <video
                            src={fileUrl}
                            controls
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                              objectFit: "cover",
                              display: "inline-block", // 가로 배치
                            }}
                          ></video>
                        </div>
                      ) : (
                        <div
                          key={index}
                          style={{
                            flex: "0 0 auto",
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px",
                            position: "relative",
                            display: "inline-block", // 가로 배치
                            marginRight: "5px",
                          }}
                        >
                          <img
                            src={fileUrl}
                            alt={`리뷰 이미지 ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                              objectFit: "cover",
                              display: "inline-block", // 가로 배치
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            {/* 날짜 */}
            <div
              css={typo.Body3}
              style={{
                color: "#9A9EA6",
                textAlign: "right",
                marginTop: "10px",
              }}
            >
              {formatReviewDate(review.createAt)}
            </div>
          </div>
          {index !== reviewResponseList.length - 1 && (
            <Divider style={{ width: "100%", height: "7px" }} />
          )}{" "}
        </div>
      ))}
    </div>
  );
}
