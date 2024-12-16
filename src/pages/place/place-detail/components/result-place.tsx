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
} from "./result-place.styles";
import { getPlacesInfo } from "../../../../api";

export interface Place {
  id: number;
  name: string;
  roadAddress: string;
  profileUrl: string;
  latitude: number;
  longitude: number;
}

export default function ResultPlace({
  places,
  userLatitude,
  userLongitude,
}: {
  places: Place[];
  userLatitude: number; // 내 위치 위도
  userLongitude: number; // 내 위치 경도
}) {
  const navigate = useNavigate();

  const getDistanceText = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const distanceInKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return distanceInKm < 1
      ? `${Math.round(distanceInKm * 1000)} m`
      : `${distanceInKm.toFixed(2)} km`;
  };

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

  return (
    <div css={PlaceList}>
      {places.length > 0 ? (
        places.map((place) => (
          <div
            css={PlaceItem}
            key={place.id}
            onClick={() => handlePlaceClick(place)}
          >
            <img css={PlaceImage} src={place.profileUrl} alt={place.name} />
            <div css={PlaceContent}>
              <div css={PlaceName}>{place.name}</div>
              <div css={PlaceAddress}>{place.roadAddress}</div>
              <div css={PlaceDistance}>
                {getDistanceText(
                  userLatitude,
                  userLongitude,
                  place.latitude,
                  place.longitude
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>검색된 장소가 없습니다.</div>
      )}
    </div>
  );
}
