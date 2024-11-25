import { css } from "@emotion/react";
import colors from "../../../../styles/colors";

export const cardWrapper = css`
  display: flex;
  align-items: flex-start;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 200px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${colors.color.White};
  z-index: 999;
  margin: auto;
`;

export const imageStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

export const cardContent = css`
  flex: 1;
  margin-left: 12px;
`;

export const titleStyle = css`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const categoryStyle = css`
  margin: 4px 0;
  font-size: 14px;
  color: #888;
`;

export const addressStyle = css`
  margin: 0;
  font-size: 14px;
  color: #888;
`;

export const ratingWrapper = css`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const starStyle = css`
  color: #ffa500;
  font-size: 16px;
`;

export const ratingStyle = css`
  font-size: 14px;
  font-weight: bold;
  margin-left: 4px;
`;

export const reviewCountStyle = css`
  font-size: 12px;
  color: #888;
  margin-left: 4px;
`;

export const reviewWrapper = css`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const profileImageStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const reviewTextStyle = css`
  margin-left: 8px;
  font-size: 14px;
  color: #555;
`;

export const favoriteIconStyle = css`
  font-size: 20px;
  color: #ff5252;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;
