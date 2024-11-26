import { css } from "@emotion/react";
import colors from "../../../../styles/colors";

export const PlaceCardWrapper = css`
  display: flex;
  position: absolute;
  bottom: 10%;
  width: 100%;
  z-index: 10;
  height: 20%;
`;

export const PlaceCardContent = css`
  display: flex;
  position: absolute;
  justify-content: space-between;
  bottom: 20%;
  width: 80%;
  height: 80%;
  background-color: ${colors.color.White1};
  border: 1px solid ${colors.color.Gray5};
  border-radius: 15px;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  padding: 5%;
`;

export const PlaceImg = css`
  background-color: ${colors.color.Gray1};
  width: 11vh;
  height: 11vh;
`;

export const PlaceContent = css`
  margin-left: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(10px, 8vw, 10px);
`;

export const PlaceName = css`
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  font-weight: bold;
  color: ${colors.color.Black1};
  flex-grow: 1;
`;

export const PlaceCategory = css`
  font-size: clamp(0.7rem, 3vw, 1rem);
  color: ${colors.color.Gray3};
`;

export const PlaceAddress = css`
  font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  color: ${colors.color.Gray3};
`;

export const PlaceRating = css`
  font-size: clamp(0.8rem, 4vw, 0.8rem);
  display: flex;
  align-items: center;
  color: ${colors.color.Primary};
  white-space: nowrap;
  margin-top: 5px;
`;

export const RatingIcon = css`
  font-size: clamp(0.8rem, 4vw, 0.8rem);
  color: ${colors.color.Gold};
  margin-right: 5px;
`;

export const RatingNumber = css`
  font-size: 1rem;
  color: ${colors.color.Black1};
  margin-right: 5px;
`;

export const ReviewCount = css`
  font-size: 0.9rem;
  color: ${colors.color.Gray3};
`;
