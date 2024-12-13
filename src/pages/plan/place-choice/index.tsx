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
import { SelectPlaceType } from "../../../interfaces/plans";
import { usePostPlansRoute } from "../../../queries";
import { notify } from "../../../utils/constants";

export default function PlaceChoice() {
  const {
    date,
    cityId,
    dogIds,
    placeIds,
    cityName,
    setPlaceIds,
    setResponse,
    resetPlaceIds,
  } = usePlanStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialSelectItems = state?.selectItems || [];
  const [selectItems, setSelectItems] =
    useState<SelectPlaceType[]>(initialSelectItems);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { mutate: createRecommendPlan } = usePostPlansRoute();

  const handleResetButtonClick = () => {
    resetPlaceIds();
    setSelectItems([]);
  };
  const handleRecommendButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(isDisabled){
      e.preventDefault()
      notify({
        type: "warning",
        text: "장소를 하나 이상 선택해주세요"
      })
      return
    }
    //일정 추천 경로 post api
    const request = {
      date,
      cityId,
      dogIds,
      placeIds,
    };
    createRecommendPlan(request, {
      onSuccess: (response) => {
        setResponse(response);
        navigate("/plan/waiting");
      },
    });
  };

  const handleDeleteIconClick = (id: number) => {
    setSelectItems((prevItems) =>
      prevItems.filter((item) => item.placeId !== id)
    );
    setPlaceIds(id);
  };

  useEffect(() => {
    if (selectItems.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectItems]);

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
            places={selectItems}
            centerLat={selectItems[0]?.latitude || 37.5665}
            centerLng={selectItems[0]?.longitude || 126.978}
          />
        </div>
        <div css={placeWrapper}>
          <div css={actionWrapper}>
            <div css={textWrapper}>
              <Text type="Heading3">장소</Text>
              <Text
                type="Label21"
                color={colors.color.Gray1}
                onClick={handleResetButtonClick}
              >
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
                  onClick={() => handleDeleteIconClick(item.placeId)}
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
            onClick={handleRecommendButtonClick}
            isDisabled={isDisabled}
          >
            추천일정 생성
          </MainPinkButton>
        </div>
      </div>
    </div>
  );
}
