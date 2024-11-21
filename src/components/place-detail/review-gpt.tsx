import { typo } from "../../styles/typo";
import { BasicInfoContainer } from "../../pages/place-detail/index.styles";
import { Block } from "../block/block";
import { Writereview } from "../../assets/svg";
export default function ReviewGpt() {
  return (
    <>
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <div
          css={Block.flexBlock({
            direction: "row", // 가로 방향 배치
            alignItems: "center", // 세로 정렬
            justifyContent: "space-between", // 양쪽 정렬
            width: "100%", // 부모 컨테이너 너비에 맞춤
          })}
        >
          <h1 css={typo.Heading3}>리뷰</h1>
          <Writereview css={{ width: "70px", height: "70px" }} />{" "}
        </div>
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "5px",
          })}
          style={{ marginTop: "-15px" }}
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
