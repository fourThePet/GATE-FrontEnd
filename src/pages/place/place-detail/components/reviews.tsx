import { useState } from "react";
import { BasicInfoContainer } from "../index.styles";
import { Block } from "../../../../components/block/block";
import { typo } from "../../../../styles/typo";
import { Button } from "../../../../components/button/button";
import { useGetPlaceReviews } from "../../../../queries/reviews";
import { NotFoundIcon } from "../../../../assets/svg";
import { Sdogpink, Mdogpink, Ldogpink } from "../../../../assets/svg";
import formatReviewDate from "../../../review/format-review-date";
import { LoadingBar } from "../../../../components";
import { containerStyle, tooltipStyle } from "../../../review/index.styles";

type ReviewsProps = {
  placeId: number; // placeId를 props로 받음
};
export default function Reviews({ placeId }: ReviewsProps) {
  const { data, isLoading, error } = useGetPlaceReviews(placeId); // useGetPlaceReviews 사용
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});

  if (isLoading) return <LoadingBar />;
  if (error) return <p>리뷰를 가져오는 데 실패했습니다.</p>;

  // 첫 번째 리뷰만 가져오기
  const firstReview = data?.reviewResponseList?.[0];

  if (!firstReview)
    return (
      <div
        css={Block.flexBlock({
          direction: "column",
          alignItems: "center",
          gap: "10px",
        })}
      >
        {" "}
        <NotFoundIcon width={120} />
        <p css={typo.Heading4}>작성된 리뷰가 없습니다.</p>
      </div>
    );

  const toggleExpand = (id: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
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
            src={firstReview.profileUrl}
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
              {firstReview.nickName}
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
                {firstReview.starRate.toFixed(1)}
              </span>
            </div>
          </div>

          {/* 인증 버튼 */}
          {firstReview.receiptCertificate && (
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
            {firstReview.content.length > 100
              ? expandedReviews[firstReview.id]
                ? firstReview.content // 전체 내용 표시
                : `${firstReview.content.slice(0, 100)}...` // 100자까지만 표시
              : firstReview.content}
          </p>
          {firstReview.content.length > 100 &&
            !expandedReviews[firstReview.id] && (
              <span
                css={typo.Body3}
                style={{
                  color: "#F1729B", // 버튼 색상
                  cursor: "pointer", // 마우스 포인터 변경
                  display: "inline-block", // 텍스트 줄바꿈 유지
                  marginTop: "5px", // 간격 추가
                }}
                onClick={() => toggleExpand(firstReview.id)}
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
          {firstReview.size === "SMALL" && (
            <div css={containerStyle}>
              <Sdogpink css={{ width: "45px", height: "45px" }} />
              <span css={tooltipStyle} className="tooltipStyle">
                소형
              </span>
            </div>
          )}

          {firstReview.size === "MEDIUM" && (
            <div css={containerStyle}>
              <Mdogpink css={{ width: "45px", height: "45px" }} />
              <span css={tooltipStyle} className="tooltipStyle">
                중형
              </span>
            </div>
          )}

          {firstReview.size === "LARGE" && (
            <div css={containerStyle}>
              <Ldogpink css={{ width: "45px", height: "45px" }} />
              <span css={tooltipStyle} className="tooltipStyle">
                대형
              </span>
            </div>
          )}
          {firstReview.keywordList.map((keyword: string, index: number) => (
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
        {firstReview.fileUrlList?.length > 0 &&
          firstReview.fileUrlList[0] !== null && (
            <div
              css={{
                overflowX: "auto", // 가로 스크롤 활성화
                whiteSpace: "nowrap", // 줄바꿈 방지
                marginTop: "10px",
              }}
            >
              {firstReview.fileUrlList.map(
                (fileUrl: string | null, index: number) => {
                  if (!fileUrl) return null; // fileUrl이 null인 경우 렌더링하지 않음

                  // 비디오인지 확인 (확장자를 기반으로 체크)
                  const isVideo = /\.(mp4|mov|avi|webm|ogg)$/i.test(fileUrl);

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
          {formatReviewDate(firstReview.createAt)}
        </div>
      </div>
    </>
  );
}
