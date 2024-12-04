import {
  PlaceAddress,
  PlaceContent,
  PlaceImage,
  PlaceItem,
  PlaceList,
  PlaceName,
} from "./result-place.styles";

interface Place {
  id: number;
  name: string;
  roadAddress: string;
  profileUrl: string;
}

export default function ResultPlace({ places }: { places: Place[] }) {
  return (
    <div css={PlaceList}>
      {places.length > 0 ? (
        places.map((place, index) => (
          <div css={PlaceItem} key={index}>
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
