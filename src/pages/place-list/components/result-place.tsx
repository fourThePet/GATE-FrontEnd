import {
  PlaceAddress,
  PlaceContent,
  PlaceImage,
  PlaceItem,
  PlaceList,
  PlaceName,
} from "./result-place.styles";

interface PlaceData {
  name: string;
  address: string;
  imageUrl: string;
}

export default function ResultPlaceList() {
  const places: PlaceData[] = [
    {
      name: "더월즈 애견카페(K-PET cafe the wal2)",
      address: "서울특별시 강남구 역삼동 123",
      imageUrl: "/images/cafe.jpg",
    },
    {
      name: "메리멍카페",
      address: "서울특별시 강남구 역삼동 456",
      imageUrl: "/images/cafe.jpg",
    },
    {
      name: "더월즈 애견카페(K-PET cafe the wal2)",
      address: "서울특별시 강남구 역삼동 789",
      imageUrl: "/images/cafe.jpg",
    },
  ];

  return (
    <div css={PlaceList}>
      {places.map((place, index) => (
        <div css={PlaceItem} key={index}>
          <img css={PlaceImage} src={place.imageUrl} alt={place.name} />
          <div css={PlaceContent}>
            <div css={PlaceName}>{place.name}</div>
            <div css={PlaceAddress}>{place.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
