import { css } from "@emotion/react";
import colors from "../../../styles/colors";

export const filterContainer = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  padding: 5%;
  background-color: ${colors.color.White1};
  gap: 50px;
`;

export const sizeFilter = css`
  display: flex;
  flex-direction: row;
  gap: 5%;
`;

export const dogSize = css`
  display: flex;
  flex-direction: column;
`;

export const conditionStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 2vh;
  grid-column-gap: 1vw;
`;
export const placeStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 2vh;
  grid-column-gap: 1vw;
`;
