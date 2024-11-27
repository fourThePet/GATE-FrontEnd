import {
  PlaceImg,
  PlaceContent,
  PlaceName,
  PlaceCategory,
  PlaceAddress,
  PlaceRating,
  PlaceCardWrapper,
  PlaceCardContent,
  RatingIcon,
  RatingNumber,
  ReviewCount,
} from "./place-card.styles";
export default function PlaceCard() {
  return (
    <div css={PlaceCardWrapper}>
      <div css={PlaceCardContent}>
        <div css={PlaceImg}>이미지영역</div>
        <div css={PlaceContent}>
          <div css={PlaceName}>메리펫카페</div>
          <div css={PlaceCategory}>카페</div>
          <div css={PlaceAddress}>서울시 강남구 테헤란로 123</div>
          <div css={PlaceRating}>
            <span css={RatingIcon}>⭐</span>
            <span css={RatingNumber}>4.1</span>
            <span css={ReviewCount}>(105)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
