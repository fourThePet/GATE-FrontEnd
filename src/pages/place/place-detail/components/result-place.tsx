import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  PlaceAddress,
  PlaceContent,
  PlaceDistance,
  PlaceImage,
  PlaceItem,
  PlaceList,
  PlaceName,
  PlaceTags,
  PlaceTextInfo,
  PlaceCategory,
  PlaceTop,
  NoData,
} from "./result-place.styles";
import { getPlacesInfo } from "../../../../api";
import { Place } from "../../../../interfaces/places";
import { useGetPlacesInfo } from "../../../../queries/places";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";

export default function ResultPlace({ places }: { places?: Place[] }) {
  const navigate = useNavigate();

  // places가 undefined 또는 빈 배열일 때 처리
  const placeId = places?.length ? places[0]?.id : undefined;
  const { data } = useGetPlacesInfo(placeId);

  const handlePlaceClick = async (place: Place) => {
    try {
      const placeInfo = await getPlacesInfo(place.id);
      console.log("장소 세부 정보:", placeInfo);

      navigate(
        `/place/detail/${place.id}?latitude=${place.latitude}&longitude=${place.longitude}`,
        {
          replace: false,
          state: { placeId: place.id },
        }
      );
    } catch (error) {
      console.error("장소 세부 정보 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    if (!places || places.length === 0) {
      console.log(0)
    }

    console.log("현재 전달받은 장소 데이터:", places);
  }, [places, navigate]);

  return (
    <div css={PlaceList}>
      {places && places.length > 0 ? (
        places.map((place) => (
          <div
            css={PlaceItem}
            key={place.id}
            onClick={() => handlePlaceClick(place)}
          >
            <div css={PlaceContent}>
              <div css={PlaceTop}>
                <div css={PlaceName}>{place.name}</div>
                <div css={PlaceCategory}>{place.category}</div>
              </div>
              <div css={PlaceAddress}>{place.roadAddress}</div>
              <div css={PlaceTextInfo}>
                <div css={PlaceTags}>
                  {data?.isLeashRequired === "Y" && "목줄 필수 · "}
                  {data?.isMuzzleRequired === "Y" && "입마개 필수 · "}
                  {data?.isCageRequired === "Y" && "케이지 필수 · "}
                  {data?.isVaccinationComplete === "Y" && "접종 완료 · "}
                  {data?.indoorAvailable === "Y" && "실내 가능 · "}
                  {data?.outdoorAvailable === "Y" && "야외 가능 · "}
                  {data?.parkingAvailable === "Y" && "주차 가능"}
                </div>
                <div css={PlaceDistance}>
                  {place.distance < 1
                    ? `${Math.round(place.distance * 1000)} m`
                    : `${place.distance.toFixed(2)} km`}
                </div>
              </div>
            </div>
            <img
              css={PlaceImage}
              src={place.profileUrl || "/images/no-image.png"}
              alt={place.name}
            />
          </div>
        ))
      ) : (
        <div css={PlaceList}>
          <div css={NoData}>
            <Text type="Body2" color={colors.color.Gray1}>검색된 장소가 없습니다.</Text>
          </div>
        </div>
      )}
    </div>
  );
}
