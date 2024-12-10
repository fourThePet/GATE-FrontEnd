import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  PlaceAddress,
  PlaceContent,
  PlaceImage,
  PlaceItem,
  PlaceList,
  PlaceName,
} from "./result-place.styles";
import { getPlacesInfo } from "../../../../api"; // API 가져오기

interface Place {
  id: number;
  name: string;
  roadAddress: string;
  profileUrl: string;
  latitude: number; // 위도
  longitude: number; // 경도
}

export default function ResultPlace({ places }: { places: Place[] }) {
  const navigate = useNavigate();

  const handlePlaceClick = async (place: Place) => {
    try {
      // 장소 ID로 세부 정보 요청
      const placeInfo = await getPlacesInfo(place.id);
      console.log("장소 세부 정보:", placeInfo);

      // 상세 페이지로 이동하며 쿼리스트링에 정보 포함
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
            onClick={() => handlePlaceClick(place)} // 클릭 이벤트
          >
            <img css={PlaceImage} src={place.profileUrl} alt={place.name} />
            <div css={PlaceContent}>
              <div css={PlaceName}>{place.name}</div>
              <div css={PlaceAddress}>{place.roadAddress}</div>
            </div>
          </div>
        ))
      ) : (
        <div>검색된 장소가 없습니다.</div>
      )}
    </div>
  );
}
