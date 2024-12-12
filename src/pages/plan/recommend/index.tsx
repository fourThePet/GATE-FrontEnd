import { useLocation, useNavigate } from "react-router-dom";
import { PostPlanIcon, SparklingHeart } from "../../../assets/svg";
import { MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { PlanListCard } from "../components";
import LineMapComponent from "../components/maps/lineMap";
import {
  bottomButtonStyle,
  contentWrapper,
  imageStyle,
  imageWrapper,
  infoWrapper,
  listWrapper,
  mapWrapper,
  PlanRegisterWrapper,
  recommendText,
  wrapper,
} from "./index.styles";
import { usePostPlans } from "../../../queries";
import usePlanStore from "../../../stores/usePlanStore";

export default function PlanRecommend() {
  const { mutate: createMyPlan } = usePostPlans();
  const navigate = useNavigate();
  const { response, dogIds } = usePlanStore();
  console.log(response);

  const places =
    response?.planPlaces?.map((planPlace) => ({
      placeName: planPlace.place.name,
      latitude: planPlace.place.latitude,
      longitude: planPlace.place.longitude,
    })) || [];

  const handleMyPlanButtonClick = () => {
    const placeIds = response.planPlaces.map((planPlace) => planPlace.place.id);
    const request = {
      date: response.date,
      cityId: response.city.id,
      dogIds,
      placeIds: placeIds,
    };
    createMyPlan(request, {
      onSuccess: () => {
        navigate("/plan", { replace: true });
      },
    });
  };

  return (
    <div css={contentWrapper}>
      <div css={wrapper}>
        <div css={infoWrapper}>
          <div css={imageWrapper}>
            <img
              src={response.city.photoUrl || "/images/default_city.png"}
              css={imageStyle}
            />
          </div>
          <Text type="Heading2">{response.city.cityName}</Text>
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
            places={places} // 플랜에서 생성한 places 전달
            centerLat={places[0]?.latitude || 37.5665}
            centerLng={places[0]?.longitude || 126.978}
          />
        </div>
        <div css={listWrapper}>
          {response?.planPlaces.map((place, index) => (
            <PlanListCard
              key={index}
              sequence={place.sequence}
              place={place.place}
            />
          ))}
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
              onClick={handleMyPlanButtonClick}
            >
              <PostPlanIcon width={20} />내 일정으로 담기
            </MainPinkButton>
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
