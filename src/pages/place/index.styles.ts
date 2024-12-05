import { css } from "@emotion/react";
import colors from "../../styles/colors";

export const containerStyle = css`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const resultsListStyle = css`
  list-style: none;
  padding: 0;
  margin: 16px;
`;

export const resultItemStyle = css`
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const buttonContainer = css`
  z-index: 10000;
  position: fixed;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
`;

export const mapLocBtn = css`
  display: flex;
  flex-direction: column;
  z-index: 10;
  margin: 20px;
  cursor: pointer;
`;

export const modalOverlay = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  /* top: 0; */
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 87%;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const modalContent = css`
  position: sticky;
  background-color: ${colors.color.White1};
  width: 100%;
  max-height: 80vh;
  height: 100%;
  padding-top: 2%;
  max-width: 600px;
  overflow-y: scroll;
`;

export const noticeStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 8%;
`;
