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
} from "./result-place.styles";
import { getPlacesInfo } from "../../../../api";
import { Place } from "../../../../interfaces/places";
import { useGetPlacesInfo } from "../../../../queries/places";

export default function ResultPlace({ places }: { places: Place[] }) {
  const navigate = useNavigate();

  const { data } = useGetPlacesInfo(places[0]?.id);

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
    console.log("현재 전달받은 장소 데이터:", places);
  }, [places]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/images/no-image.png";
  };

  return (
    <div css={PlaceList}>
      {places.length > 0 ? (
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
              src={place.profileUrl}
              alt={place.name}
              onError={handleImageError}
            />
          </div>
        ))
      ) : (
        <div>검색된 장소가 없습니다.</div>
      )}
    </div>
  );
}
