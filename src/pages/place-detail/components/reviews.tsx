import { useState } from "react";
import { BasicInfoContainer } from "../index.styles";
import { ProfileDog, Reviewimg1, Reviewimg2 } from "../../../assets/svg";
import { Block } from "../../../components/block/block";
import { typo } from "../../../styles/typo";
import { Button } from "../../../components/button/button";

export default function Reviews() {
  const [isExpanded, setIsExpanded] = useState(false); // "더보기" 상태를 관리

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
          <ProfileDog
            css={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
          {/* 이름과 별점 */}
          <div>
            <div css={typo.Heading3} style={{ marginBottom: "-5px" }}>
              뽀삐
            </div>
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
                4.0
              </span>
            </div>
          </div>
          {/* 인증 버튼 */}
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
        </div>

        {/* 리뷰 텍스트 */}
        <div style={{ marginTop: "10px" }}>
          <p css={typo.Body2} style={{ lineHeight: "1.5" }}>
            {isExpanded
              ? `다른 어떤 애견동반 카페보다 좋았어요!! 친절하신 사장님 진짜 너무
                감동이었구요 ㅠㅠㅠ! 우리 멍멍이 한마리가 너무 예민해서 강아지
                운동장을 못 가는데 여기는 그런 아이 케어까지 완벽하게 해주셔서
                너무 좋았습니다! 다음에도 꼭 방문할 예정이에요.`
              : `다른 어떤 애견동반 카페보다 좋았어요!! 친절하신 사장님 진짜 너무
                감동이었구요 ㅠㅠㅠ!
                우리 멍멍이 한마리가 너무 예민해서 강아지 운동장을 못 가는데 여기는
                그런 아이 케어…`}
          </p>
          {!isExpanded && (
            <span
              css={typo.Body3}
              style={{ color: "#F1729B", cursor: "pointer" }}
              onClick={handleToggle}
            >
              더보기
            </span>
          )}
        </div>

        {/* 리뷰 이미지 */}
        <div
          css={Block.flexBlock({
            direction: "row",
            gap: "10px",
          })}
          style={{ marginTop: "10px" }}
        >
          <Reviewimg1
            css={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
          <Reviewimg2
            css={{
              width: "100px",
              height: "100px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>
        <button
          css={Button.pinkBorderButton({
            width: "550px",
            height: "50px",
          })}
          onClick={() => {
            // 리뷰 전체보기 버튼 동작
          }}
          style={{ marginTop: "40px" }}
        >
          리뷰 전체보기
        </button>
      </div>
    </>
  );
}
