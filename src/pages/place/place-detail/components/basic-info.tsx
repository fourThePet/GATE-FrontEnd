import { typo } from "../../../../styles/typo";
import { BasicInfoContainer } from "../index.styles";
import { Divider2 } from "../../../../styles/ui";
export default function BasicInfo() {
  return (
    <>
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>기본 정보</h2>
        <ul style={{ marginLeft: "20px" }}>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            {" "}
            - 홈페이지 url
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 휴무일: 매주 일요일
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 운영 시간: 월~금 10:00~18:00, 토 10:00~14:00
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 주차가능
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 데이터 마지막 수정일: 2022-02-10
          </li>
        </ul>
      </div>
      <Divider2 />
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>제한 사항</h2>
        <ul style={{ marginLeft: "20px" }}>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            {" "}
            - 애견 동반시 추가요금: 10000원
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 야외테라스만 동반가능
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 입장 가능 크기: 대형견
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 목줄 필수
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 입마개 필수
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 케이지 필수
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 접종 완료
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 실내 이용 가능
          </li>
          <li css={typo.Body2} style={{ color: "#888888" }}>
            - 실외 이용 가능
          </li>
        </ul>
      </div>
    </>
  );
}
