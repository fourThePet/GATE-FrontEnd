import { useNavigate } from "react-router-dom";
import {
  cardWrapper,
  cardContent,
  imageStyle,
  titleStyle,
  categoryStyle,
  addressStyle,
  ratingWrapper,
  starStyle,
  ratingStyle,
  reviewCountStyle,
  reviewWrapper,
  profileImageStyle,
  reviewTextStyle,
  favoriteIconStyle,
} from "./place-card.styles";

const PlaceCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/place/detail");
  };

  return (
    <div css={cardWrapper}>
      <img
        src="https://via.placeholder.com/80"
        alt="장소 이미지"
        css={imageStyle}
      />
      <div css={cardContent} onClick={handleCardClick}>
        <h3 css={titleStyle}>매리펫카페</h3>
        <p css={categoryStyle}>애견 카페</p>
        <p css={addressStyle}>대치4동 916-38</p>
        <div css={ratingWrapper}>
          <span css={starStyle}>⭐</span>
          <span css={ratingStyle}>4.1</span>
          <span css={reviewCountStyle}>(105)</span>
        </div>
        <div css={reviewWrapper}>
          <img
            src="https://via.placeholder.com/24"
            alt="프로필"
            css={profileImageStyle}
          />
          <p css={reviewTextStyle}>정말 쾌적하고 넓어요!</p>
        </div>
      </div>
      <span css={favoriteIconStyle}>♡</span>
    </div>
  );
};

export default PlaceCard;
