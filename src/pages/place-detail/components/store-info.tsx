import { Block } from "../../../components/block/block";
import { Pagedetaileximg } from "../../../assets/svg";
import { Heart, HeartFill } from "../../../assets/svg";
import { typo } from "../../../styles/typo";
import { ContentContainer } from "../index.styles";
import { useState } from "react";

export default function StoreInfo() {
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리

  const toggleHeart = () => {
    setIsLiked(!isLiked); // 클릭 시 상태 토글
  };

  return (
    <>
      {/* 이미지 */}
      <div
        css={Block.flexBlock({
          direction: "column",
          width: "100%",
        })}
      >
        <Pagedetaileximg
          css={Block.flexBlock({
            width: "100%",
            height: "auto",
          })}
        />
      </div>

      {/* 콘텐츠 */}
      <div css={ContentContainer}>
        <span css={typo.Body3} style={{ color: "#9A9EA6" }}>
          강남 | 애견카페
        </span>
        <div
          css={Block.flexBlock({
            direction: "row", // 가로 방향 배치
            alignItems: "center", // 세로 정렬
            justifyContent: "space-between", // 양쪽 정렬
            width: "100%", // 부모 컨테이너 너비에 맞춤
          })}
        >
          <h1
            css={typo.Heading1}
            style={{ marginTop: "20px", marginBottom: "-5px" }}
          >
            더왈츠 애견카페
          </h1>
          <div
            onClick={toggleHeart} // 클릭 이벤트 추가
            style={{ marginTop: "20px", cursor: "pointer" }} // 클릭 가능하도록 커서 스타일 추가
          >
            {isLiked ? (
              <HeartFill css={{ width: "24px", height: "24px" }} />
            ) : (
              <Heart
                css={{ width: "24px", height: "24px", color: "#9A9EA6" }}
              />
            )}
          </div>
        </div>
        <p css={typo.Body2} style={{ marginBottom: "20px", color: "#9A9EA6" }}>
          아담한 커피 바, 반려견용 액세서리 판매 코너가 있는 쾌적한 반려견
          카페입니다.
        </p>
        <p css={typo.Body2} style={{ marginBottom: "-5px", color: "#9A9EA6" }}>
          서울특별시 강남구 대치4동 916-38
        </p>
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "5px",
          })}
        >
          <span css={typo.Body1} style={{ color: "#FFAB2E" }}>
            ★
          </span>
          <span css={typo.Body2} style={{ color: "#9A9EA6" }}>
            4.1 (105)
          </span>
        </div>
      </div>
    </>
  );
}
