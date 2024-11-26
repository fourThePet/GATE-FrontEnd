import {
  wrapperStyle,
  barContainerStyle,
  progressBarContainerStyle,
  progressStyle,
  percentageStyle,
} from "../index.styles";
import { typo } from "../../../../styles/typo";
export default function ReviewPercent() {
  // 샘플 데이터
  const reviewData = [
    { label: "입마개는 필수예요 🐾", value: 339 },
    { label: "기저귀를 착용해요 ☁️", value: 129 },
    { label: "케이지를 사용했어요 🙏", value: 88 },
    { label: "입마개는 필수예요 🐾", value: 259 },
  ];

  const totalValue = reviewData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div css={wrapperStyle}>
      {reviewData.map((item, index) => (
        <div css={barContainerStyle} key={index}>
          {/* 레이블 */}
          <div css={typo.Body2}>{item.label}</div>

          {/* 커스텀 Progress Bar */}
          <div css={progressBarContainerStyle}>
            <div css={progressStyle((item.value / totalValue) * 100)} />
          </div>

          {/* 퍼센티지 값 */}
          <div css={percentageStyle}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
