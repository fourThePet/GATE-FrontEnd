import { useState } from "react";
import { BasicInfoContainer } from "../index.styles";
import { Block } from "../../../../components/block/block";
import { typo } from "../../../../styles/typo";
import { Button } from "../../../../components/button/button";
import { useGetPlaceReviews } from "../../../../queries/reviews";
import { NotFoundIcon } from "../../../../assets/svg";
import { Sdogpink, Mdogpink, Ldogpink } from "../../../../assets/svg";
type ReviewsProps = {
  placeId: number; // placeId를 props로 받음
};
export default function Reviews({ placeId }: ReviewsProps) {
  const [isExpanded, setIsExpanded] = useState(false); // "더보기" 상태를 관리
  const { data, isLoading, error } = useGetPlaceReviews(placeId); // useGetPlaceReviews 사용

  if (isLoading) return <p>리뷰를 불러오는 중입니다...</p>;
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

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // 버튼 클릭 시 상태 변경
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
          <p css={typo.Body2} style={{ lineHeight: "1.5", color: "#66707A" }}>
            {firstReview.content.length > 100
              ? isExpanded
                ? firstReview.content
                : `${firstReview.content.slice(0, 100)}...`
              : firstReview.content}
          </p>
          {firstReview.content.length > 100 && !isExpanded && (
            <span
              css={typo.Body3}
              style={{ color: "#F1729B", cursor: "pointer" }}
              onClick={handleToggle}
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
            <Sdogpink
              css={{
                width: "40px",
                height: "40px",
              }}
            />
          )}
          {firstReview.size === "MEDIUM" && (
            <Mdogpink
              css={{
                width: "45px",
                height: "45px",
              }}
            />
          )}
          {firstReview.size === "LARGE" && (
            <Ldogpink
              css={{
                width: "50px",
                height: "50px",
              }}
            />
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
        {firstReview.fileUrlList?.length > 0 && (
          <div
            css={Block.flexBlock({
              direction: "row",
              gap: "10px",
            })}
            style={{ marginTop: "10px" }}
          >
            {firstReview.fileUrlList.map((fileUrl: string, index: number) => (
              <img
                key={index}
                src={fileUrl}
                alt={`리뷰 이미지 ${index + 1}`}
                css={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        )}

        {/* 날짜 */}
        <div
          css={typo.Body3}
          style={{ color: "#9A9EA6", textAlign: "right", marginTop: "10px" }}
        >
          {new Date(firstReview.createAt).toLocaleDateString("ko-KR")}
        </div>
      </div>
    </>
  );
}
