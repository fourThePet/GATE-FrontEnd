import { css } from "@emotion/react";
import colors from "../../../styles/colors";

export const fixedHeaderStyle = css`
    display: flex;
    flex-direction: column;
    background-color: ${colors.color.MainColor};
    color: ${colors.color.White1};
    z-index: 10;
    padding: 30px;
    text-align: left;
    margin-top: 75px;
    gap: 12px;
`;
export const titleWrapper = css`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

export const pageWrapperStyle = css`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
  padding: 0 30px;
`;

export const cityListWrapperStyle = css`
  padding:0 0 80px 0;
`;

export const cityItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;