import { typo } from "../../../styles/typo";
import { BasicInfoContainer } from "../index.styles";
export default function BasicInfo() {
  return (
    <>
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>기본 정보</h2>
        <ul style={{ marginLeft: "20px" }}>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            {" "}
            - 반려견 무게 제한 없음
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 바비큐
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 주방/식당
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 취식 가능
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 내부 화장실
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 실내 절대 금연
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 주차 가능
          </li>
        </ul>
      </div>
    </>
  );
}
