import { PageWrapper } from "../../styles/ui";
import { Block } from "../../components/block/block";
import { Logowithshadow } from "../../assets/svg";
import { typo } from "../../styles/typo";
import StarRatingComponent from "react-star-rating-component";
import { useState } from "react";
import { starStyles } from "./index.styles";
import { Button } from "../../components/button/button";
import {
  Sdogwhite,
  Sdogpink,
  Mdogwhite,
  Mdogpink,
  Ldogwhite,
  Ldogpink,
} from "../../assets/svg";
import { Pinkpencil } from "../../assets/svg";
export default function WriteReview() {
  const [rating, setRating] = useState(0); // 별점 상태 관리
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]); // 선택된 조건 상태 관리

  const [selectedDogSize, setSelectedDogSize] = useState<
    "small" | "medium" | "large" | null
  >(null); // 아이 크기 상태 관리

  const handleConditionClick = (condition: string) => {
    // 조건을 선택/해제하는 로직
    setSelectedConditions(
      (prev) =>
        prev.includes(condition)
          ? prev.filter((c) => c !== condition) // 이미 선택된 경우 제거
          : [...prev, condition] // 선택되지 않은 경우 추가
    );
  };

  const onStarClick = (nextValue: number) => {
    setRating(nextValue); // 별점 업데이트
  };

  const handleDogSizeClick = (size: "small" | "medium" | "large") => {
    setSelectedDogSize(size);
  };

  return (
    <>
      <div
        css={PageWrapper}
        style={{
          height: "100vh", // 부모 요소 높이를 100vh로 고정
          overflowY: "scroll", // 스크롤 활성화
          overflowX: "hidden", // 가로 스크롤 제거
          scrollbarWidth: "none", // Firefox에서 스크롤바 숨김
          msOverflowStyle: "none", // IE/Edge에서 스크롤바 숨김
          position: "relative", // 상대 위치 지정
        }}
      >
        <style>
          {`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge에서 스크롤바 숨기기 */
          }
        `}
        </style>{" "}
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "40px",
          })}
          style={{ marginTop: "100px", marginLeft: "60px" }}
        >
          <Logowithshadow css={{ width: "180px", height: "180px" }} />
          <span css={typo.Heading2} style={{ fontSize: "25px" }}>
            다녀온 곳의 리뷰를
            <br /> 써보세요 !
          </span>
        </div>
        {/* 별점 */}
        <div
          css={Block.flexBlock({
            direction: "column",
            alignItems: "center",
            gap: "20px",
          })}
          style={{ marginTop: "20px" }}
        >
          <div css={starStyles}>
            <StarRatingComponent
              name="rate"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
              starColor="#F1729B" // 활성화된 별 색상
              emptyStarColor="#E0E0E0" // 비활성화된 별 색상
            />
          </div>
          {/* <span css={typo.Body1}>{rating}점</span> */}
        </div>
        {/* 다녀온 아이는 어땠나요? */}
        <div
          css={Block.flexBlock({
            direction: "column",
            gap: "20px",
            margin: "25px",
          })}
        >
          <span css={typo.Heading4}>다녀온 아이는 어땠나요?</span>
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "space-between",
              gap: "20px",
              width: "60%",
            })}
          >
            {/* 소형 아이 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "16px",
              })}
              onClick={() => handleDogSizeClick("small")}
            >
              {selectedDogSize === "small" ? (
                <Sdogpink css={{ width: "90px", height: "90px" }} />
              ) : (
                <Sdogwhite css={{ width: "90px", height: "90px" }} />
              )}
              <span
                css={typo.Body2}
                style={{
                  color: selectedDogSize === "small" ? "#000000" : "#8E8E93",
                  cursor: "pointer",
                }}
              >
                소형
              </span>
            </div>

            {/* 중형 아이 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
              })}
              onClick={() => handleDogSizeClick("medium")}
            >
              {selectedDogSize === "medium" ? (
                <Mdogpink css={{ width: "90px", height: "90px" }} />
              ) : (
                <Mdogwhite css={{ width: "90px", height: "90px" }} />
              )}
              <span
                css={typo.Body2}
                style={{
                  color: selectedDogSize === "medium" ? "#000000" : "#8E8E93",
                  cursor: "pointer",
                }}
              >
                중형
              </span>
            </div>

            {/* 대형 아이 */}
            <div
              css={Block.flexBlock({
                direction: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
              })}
              onClick={() => handleDogSizeClick("large")}
            >
              {selectedDogSize === "large" ? (
                <Ldogpink css={{ width: "90px", height: "90px" }} />
              ) : (
                <Ldogwhite css={{ width: "90px", height: "90px" }} />
              )}
              <span
                css={typo.Body2}
                style={{
                  color: selectedDogSize === "large" ? "#000000" : "#8E8E93",
                  cursor: "pointer",
                }}
              >
                대형
              </span>
            </div>
          </div>
        </div>
        {/* 입장조건이 무엇인가요? */}
        <div
          css={Block.flexBlock({
            direction: "column",
            gap: "20px",
            margin: "30px 25px",
          })}
        >
          <span css={typo.Heading4}>입장조건이 무엇인가요? </span>
          <div
            css={Block.flexBlock({
              direction: "row",
              justifyContent: "space-between",
              gap: "20px",
              width: "90%",
            })}
            style={{
              flexWrap: "wrap", //크기 맞춤
            }}
          >
            {[
              "입마개는 필수예요 🐾",
              "케이지를 사용했어요 🙏",
              "기저귀를 착용해요 ☁️",
              "리드줄을 착용했어요 〰️",
              "실내 동반이 가능해요 🛋️",
              "테라스 이용만 가능해요 🏕️",
            ].map((condition, index) => (
              <button
                key={index}
                css={
                  selectedConditions.includes(condition)
                    ? Button.mainPinkButton({
                        isDisabled: false, // 추가
                        width: "260px",
                        height: "50px",
                      })
                    : Button.grayBorderButton({
                        width: "260px",
                        height: "50px",
                      })
                }
                onClick={() => handleConditionClick(condition)}
              >
                {condition}
              </button>
            ))}
          </div>
          {/* 사진/영상을 추가해 주세요ㅛ */}
          <div
            css={Block.flexBlock({
              direction: "column",
              border: "1px solid #F3F4F6",
              alignItems: "center",
              padding: "20px",
              gap: "20px",
              width: "90%",
              borderRadius: "20px",
            })}
            style={{ marginTop: "30px", flexWrap: "wrap" }}
          >
            <span css={typo.Heading3}>사진/영상을 추가해 주세요</span>
            <button
              css={Button.mainPinkButton({
                width: "40px",
                height: "40px",
                isDisabled: false,
              })}
            >
              <span style={{ fontSize: "30px", marginTop: "-5px" }}>+</span>
            </button>
          </div>
          <div
            css={Block.flexBlock({
              direction: "column",
              border: "1px solid #F3F4F6",
              alignItems: "center",
              padding: "20px",
              gap: "20px",
              width: "90%",
              borderRadius: "20px",
            })}
            style={{ marginTop: "30px", flexWrap: "wrap" }}
          >
            <div
              css={Block.flexBlock({
                direction: "row",
                alignItems: "center",
                gap: "5px",
              })}
            >
              <Pinkpencil css={{ width: "24px", height: "24px" }} />
              <span css={typo.Body2} style={{ color: "#888888" }}>
                리뷰를 작성해 주세요
              </span>
            </div>
            <textarea
              style={{ width: "100%", height: "150px" }}
              placeholder="리뷰 작성 시 욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
            ></textarea>
          </div>
          <div
            css={Block.flexBlock({
              direction: "row",
              gap: "12px",
            })}
          >
            <button
              css={Button.pinkBorderButton({
                width: "260px",
                height: "50px",
              })}
            >
              취소
            </button>
            <button
              css={Button.mainPinkButton({
                isDisabled: false,
                width: "260px",
                height: "50px",
              })}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
