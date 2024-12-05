import {
  wrapperStyle,
  barContainerStyle,
  progressBarContainerStyle,
  progressStyle,
  percentageStyle,
} from "../index.styles";
import { typo } from "../../../../styles/typo";
import { useGetPlaceReviews } from "../../../../queries/reviews"; // useGetPlaceReviews import

type ReviewPercentProps = {
  placeId: number; // placeId를 props로 받음
};

export default function ReviewPercent({ placeId }: ReviewPercentProps) {
  // 장소 리뷰 데이터 가져오기
  const { data, isLoading, error } = useGetPlaceReviews(placeId);

  if (isLoading) return <div>리뷰 데이터를 불러오는 중입니다...</div>;
  if (error) return <div>리뷰 데이터를 가져오는 데 실패했습니다.</div>;

  // keywordResponseList에서 label과 value로 변환
  const reviewData =
    data?.keywordResponseList.map((keyword: any) => ({
      label: keyword.content, // content를 label로
      value: keyword.keywordCount, // keywordCount를 value로
    })) || [];

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
