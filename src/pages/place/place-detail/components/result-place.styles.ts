import colors from "../../../../styles/colors";
import { css } from "@emotion/react";

export const PlaceList = css`
  margin: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 100px;
  overflow-y: auto;
  background-color: ${colors.color.White};
`;

export const PlaceItem = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.color.Gray6};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  }
`;

export const PlaceImage = css`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

export const PlaceContent = css`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PlaceName = css`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.color.Black};
`;

export const PlaceAddress = css`
  font-size: 14px;
  color: ${colors.color.Gray3};
`;
export const PlaceDistance = css`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;
