import ScrollContainer from "react-indiana-drag-scroll";
import { useGetPopularPlaces } from "../../../queries";
import { typo } from "../../../styles/typo";
import {
  wrapperStyle,
  scrollContainerStyle,
  contentContainerStyle,
  imageContainerStyle,
  overlayStyle,
} from "../index.styles";

export default function Best10() {
  const { data: popularPlaces, isLoading, error } = useGetPopularPlaces(10); // 인기 장소 10개 가져오기

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <div css={wrapperStyle}>
      <h2 css={typo.Heading3}>인기 급상승 🔥</h2>
      <h3 css={typo.Heading4} style={{ color: " #888" }}>
        국내 장소 Best 10
      </h3>
      <ScrollContainer css={scrollContainerStyle} horizontal vertical={false}>
        <div css={contentContainerStyle}>
          {popularPlaces.map((place, index) => (
            <div key={index} css={imageContainerStyle}>
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
