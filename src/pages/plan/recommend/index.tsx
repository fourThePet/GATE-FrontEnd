import { useLocation } from "react-router-dom";
import { SparklingHeart } from "../../../assets/svg";
import { MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { PlanListCard } from "../components";
import LineMapComponent from "../components/maps/lineMap";
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

  const { state } = useLocation();
  const selectItems = state?.selectItems || [];

  const places = sampleSelectItems.map((item) => ({
    placeName: item.placeName,
    roadAddress: item.roadAddress,
    latitude: item.latitude,
    longitude: item.longitude,
  }));

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
        <div css={mapWrapper}>
          <LineMapComponent
            places={places}
            centerLat={selectItems[0]?.latitude || 37.5665}
            centerLng={selectItems[0]?.longitude || 126.978}
          />
        </div>
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
            >내 일정으로 담기</MainPinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const sampleSelectItems = [
  {
    placeName: "장소 1",
    roadAddress: "서울특별시 종로구 종로1가",
    latitude: 37.5704,
    longitude: 126.9768,
  },
  {
    placeName: "장소 2",
    roadAddress: "서울특별시 종로구 종로2가",
    latitude: 37.571,
    longitude: 126.9775,
  },
  {
    placeName: "장소 3",
    roadAddress: "서울특별시 종로구 종로3가",
    latitude: 37.572,
    longitude: 126.9782,
  },
  {
    placeName: "장소 4",
    roadAddress: "서울특별시 종로구 관철동",
    latitude: 37.5708,
    longitude: 126.9804,
  },
  {
    placeName: "장소 5",
    roadAddress: "서울특별시 종로구 청진동",
    latitude: 37.5716,
    longitude: 126.9798,
  },
  {
    placeName: "장소 6",
    roadAddress: "서울특별시 종로구 서린동",
    latitude: 37.5722,
    longitude: 126.9779,
  },
  {
    placeName: "장소 7",
    roadAddress: "서울특별시 종로구 인사동",
    latitude: 37.5729,
    longitude: 126.9791,
  },
  {
    placeName: "장소 8",
    roadAddress: "서울특별시 종로구 낙원동",
    latitude: 37.5735,
    longitude: 126.9812,
  },
];
