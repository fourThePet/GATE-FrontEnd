import colors from "../../../../styles/colors";
import { css } from "@emotion/react";

export const PlaceList = css`
  margin: 10px 30px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: ${colors.color.White};
  padding-bottom: 180px;
`;

export const PlaceItem = css`
  display: flex;
  padding: 16px;
  gap: 12px;
  border-bottom: 1px solid ${colors.color.Gray6};
`;

export const PlaceImage = css`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
`;

export const PlaceContent = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PlaceName = css`
  font-size: 14px;
  color: ${colors.color.Black};
`;

export const PlaceAddress = css`
  font-size: 12px;
  color: ${colors.color.Gray2};
`;
