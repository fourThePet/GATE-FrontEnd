import ScrollContainer from "react-indiana-drag-scroll";
import { useGetPopularPlaces, useGetPlacesInfo } from "../../../queries";
import { typo } from "../../../styles/typo";
import {
  wrapperStyle,
  scrollContainerStyle,
  contentContainerStyle,
  imageContainerStyle,
  overlayStyle,
} from "../index.styles";
import { LoadingBar } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Best10() {
  const { data: popularPlaces, isLoading, error } = useGetPopularPlaces(10); // 인기 장소 10개 가져오기
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const { data: placeInfo, isFetching: isFetchingPlaceInfo } =
    useGetPlacesInfo(selectedPlaceId);
  const navigate = useNavigate();

  const handlePlaceClick = (placeId: number) => {
    setSelectedPlaceId(placeId); // 선택된 placeId를 설정
  };

  if (isFetchingPlaceInfo)
    return (
      <div css={wrapperStyle}>
        <h2 css={typo.Heading3}>인기 급상승 🔥</h2>
        <h3 css={typo.Heading4} style={{ color: " #888" }}>
          국내 장소 Best 10
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingBar />
        </div>
      </div>
    );
  if (isLoading)
    return (
      <div css={wrapperStyle}>
        <h2 css={typo.Heading3}>인기 급상승 🔥</h2>
        <h3 css={typo.Heading4} style={{ color: " #888" }}>
          국내 장소 Best 10
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingBar />
        </div>
      </div>
    );
  if (error) return <p>현재 인기 리스트가 없습니다.</p>;

  // placeInfo가 존재하면 페이지 이동
  if (placeInfo && selectedPlaceId) {
    navigate(
      `/place/detail/${selectedPlaceId}?latitude=${placeInfo.latitude}&longitude=${placeInfo.longitude}`,
      {
        replace: false,
        state: { placeId: selectedPlaceId, placeInfo },
      }
    );
    setSelectedPlaceId(null); // 초기화
  }

  return (
    <div css={wrapperStyle}>
      <h2 css={typo.Heading3}>인기 급상승 🔥</h2>
      <h3 css={typo.Heading4} style={{ color: " #888" }}>
        국내 장소 Best 10
      </h3>
      <ScrollContainer css={scrollContainerStyle} horizontal vertical={false}>
        <div css={contentContainerStyle}>
          {popularPlaces.map((place, index) => (
            <div
              key={index}
              css={imageContainerStyle}
              onClick={() => handlePlaceClick(place.placeId)} // 클릭 시 placeId 설정
            >
              <img
                src={place.photoUrl}
                alt={place.placeName}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "600px",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
              <div css={overlayStyle}>
                <span css={typo.Body2}>{index + 1}</span>
                <span css={typo.Body2}>{place.placeName}</span>
                <span css={typo.Body2}>{place.cityName}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
}
