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
import usePlanStore from "../../../stores/usePlanStore";
import { useEffect, useState } from "react";

export default function PlaceChoice() {
  const { date, cityId, dogIds, placeIds, cityName, setPlaceIds } = usePlanStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialSelectItems = state?.selectItems || [];
  const [selectItems, setSelectItems] = useState(initialSelectItems);

  const places = sampleSelectItems.map((item) => ({
    placeName: item.placeName,
    roadAddress: item.roadAddress,
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  const handleNextButtonClick = () => {
    console.log(date, cityId, dogIds, placeIds)
    navigate("/plan/waiting")
  }

  const handleDeleteIconClick = (id : number) => {
    setSelectItems((prevItems) =>
      prevItems.filter((item) => item.placeId !== id)
    );
  }

  useEffect(() => {
    const placeIds = selectItems.map((item) => item.placeId); // Extract place IDs
    setPlaceIds(placeIds); // Update Zustand state
  }, [selectItems,setPlaceIds]);

  return (
    <div css={contentWrapper}>
      <div css={wrapper}>
        <div css={titleWrapper}>
          <Text type="Heading3">{cityName}</Text>
          <div css={dateWrapper}>
            <Text type="Body2" color={colors.color.Gray1}>
              {date}
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
                  photoUrl={item.photoUrl}
                  onClick={()=>handleDeleteIconClick(item.placeId)}
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
            onClick={handleNextButtonClick}
          >다음</MainPinkButton>
        </div>
      </div>
    </div>
  );
}

const sampleSelectItems = [
  {
    placeName: "장소 1",
    roadAddress: "경상남도 창원시 성산구 상남동",
    latitude: 35.2271,
    longitude: 128.6812,
  },
  {
    placeName: "장소 2",
    roadAddress: "경상북도 포항시 북구 장성동",
    latitude: 36.0615,
    longitude: 129.3817,
  },
  {
    placeName: "장소 3",
    roadAddress: "경상남도 거제시 고현동",
    latitude: 34.8818,
    longitude: 128.6216,
  },
  {
    placeName: "장소 4",
    roadAddress: "경상북도 안동시 운흥동",
    latitude: 36.5684,
    longitude: 128.7295,
  },
  {
    placeName: "장소 5",
    roadAddress: "경상북도 울진군 후포면",
    latitude: 36.9989,
    longitude: 129.4043,
  },
];
