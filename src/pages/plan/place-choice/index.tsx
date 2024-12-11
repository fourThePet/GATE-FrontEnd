import { useLocation, useNavigate } from "react-router-dom";
import { GrayCalender } from "../../../assets/svg";
import { MainPinkButton, Text } from "../../../components";
import colors from "../../../styles/colors";
import { PlaceAddButton, SelectionPlaceList } from "../components";
import {
  actionWrapper,
  bottomButtonStyle,
  contentWrapper,
  dateWrapper,
  listWrapper,
  mapWrapper,
  placeWrapper,
  textWrapper,
  titleWrapper,
  wrapper,
} from "./index.styles";
import MapComponent from "../components/maps";

export default function PlaceChoice() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectItems = state?.selectItems || [];

  const places = sampleSelectItems.map((item, index) => ({
    placeName: item.placeName,
    roadAddress: item.roadAddress,
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  return (
    <div css={contentWrapper}>
      <div css={wrapper}>
        <div css={titleWrapper}>
          <Text type="Heading3">가평</Text>
          <div css={dateWrapper}>
            <Text type="Body2" color={colors.color.Gray1}>
              2024-11-29
            </Text>
            <GrayCalender width={16} />
          </div>
        </div>
        <div css={mapWrapper}>
          <MapComponent
            places={places}
            centerLat={selectItems[0]?.latitude || 37.5665}
            centerLng={selectItems[0]?.longitude || 126.978}
          />
        </div>
        <div css={placeWrapper}>
          <div css={actionWrapper}>
            <div css={textWrapper}>
              <Text type="Heading3">장소</Text>
              <Text type="Label21" color={colors.color.Gray1}>
                초기화
              </Text>
            </div>
            <PlaceAddButton
              onClick={() =>
                navigate("/plan/create/place-add", { state: { selectItems } })
              }
            />
          </div>
          <div css={listWrapper(selectItems?.length > 0)}>
            {selectItems?.length > 0 ? (
              selectItems?.map((item, index) => (
                <SelectionPlaceList
                  key={index}
                  placeName={item.placeName}
                  roadAddress={item.roadAddress}
                />
              ))
            ) : (
              <Text type="Body2" color={colors.color.Gray1}>
                선택된 장소가 없어요
              </Text>
            )}
          </div>
        </div>
        <div css={bottomButtonStyle}>
          <MainPinkButton
            title="다음"
            onClick={() => navigate("/plan/recommend")}
          />
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
  {
    placeName: "장소 9",
    roadAddress: "서울특별시 종로구 경운동",
    latitude: 37.574,
    longitude: 126.9785,
  },
  {
    placeName: "장소 10",
    roadAddress: "서울특별시 종로구 삼청동",
    latitude: 37.5765,
    longitude: 126.981,
  },
];
