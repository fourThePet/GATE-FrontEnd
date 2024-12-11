import { SparklingHeart } from "../../../assets/svg";
import { MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { PlanListCard } from "../components";
import {
  bottomButtonStyle,
  contentWrapper,
  infoWrapper,
  listWrapper,
  mapWrapper,
  PlanRegisterWrapper,
  recommendText,
  wrapper,
} from "./index.styles";

export default function PlanRecommend() {
  const place = {
    name: "멍멍",
    category: "카페",
  };

  return (
    <div css={contentWrapper}>
      <div css={wrapper}>
        <div css={infoWrapper}>
          <Text type="Heading2">가평</Text>
          <Text type="Heading2">
            <Text type="Heading2" color={colors.color.MainColor}>
              추천일정
            </Text>
            입니다.
          </Text>
          <Text type="Label21" color={colors.color.Gray1}>
            GATE가 알려준 맞춤일정으로 데이트를 즐겨보세요
          </Text>
        </div>
        <div css={mapWrapper}>지도</div>
        <div css={listWrapper}>
          <PlanListCard sequence={1} place={place} />
          <PlanListCard sequence={1} place={place} />
          <PlanListCard sequence={1} place={place} />
          <PlanListCard sequence={1} place={place} />
          <PlanListCard sequence={1} place={place} />
          <div css={PlanRegisterWrapper}>
            <SparklingHeart width={48} />
            <div css={recommendText}>
              <Text type="Heading3">추천일정이 마음에 드세요?</Text>
              <Text type="Label21" color={colors.color.Gray1}>
                추천받은 일정을 내 일정으로 담으면 언제든 확인하고 편집할 수
                있어요!
              </Text>
            </div>
          </div>
          <div css={bottomButtonStyle}>
            <MainPinkButton
              title="내 일정으로 담기"
              width="30%"
              height="36px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
